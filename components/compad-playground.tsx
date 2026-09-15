"use client";

import Image from "next/image";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent,
  type PointerEvent,
} from "react";
import { Redo2, RotateCcw, Undo2 } from "lucide-react";
import { useReducedMotion } from "framer-motion";
import { CompadInspector } from "@/components/compad-inspector";
import { posterDesigns } from "@/src/data/compad-designs";
import {
  movePosterLayer,
  posterHistory,
  type HistoryAction,
  type PosterHistory,
  type PosterLayer,
} from "@/src/lib/compad-editor";
import { withBasePath } from "@/src/lib/site-config";

const rotationDuration = 4500;

export function CompadPlayground() {
  const root = useRef<HTMLDivElement>(null);
  const progress = useRef<HTMLSpanElement>(null);
  const toggle = useRef<HTMLButtonElement>(null);
  const remaining = useRef(rotationDuration);
  const resetRequested = useRef(false);
  const [playing, setPlaying] = useState(true);
  const [hovered, setHovered] = useState(false);
  const reduceMotion = useReducedMotion();
  const paper = useRef<HTMLDivElement>(null);
  const drag = useRef<{
    layer: PosterLayer;
    pointer: number;
    x: number;
    y: number;
    group: string;
  } | null>(null);
  const [designId, setDesignId] = useState(posterDesigns[0].id);
  const [histories, setHistories] = useState<Record<string, PosterHistory>>(
    () =>
      Object.fromEntries(
        posterDesigns.map((design) => [
          design.id,
          { present: design.poster, past: [], future: [] },
        ]),
      ),
  );
  const design = posterDesigns.find((item) => item.id === designId)!;
  const history = histories[designId];
  const [selectedId, setSelectedId] = useState<string | null>("headline");
  const [interactive, setInteractive] = useState(false);
  const poster = history.present;
  const selected =
    poster.layers.find((layer) => layer.id === selectedId) ?? null;
  const selectedIndex = poster.layers.findIndex(
    (layer) => layer.id === selectedId,
  );

  useEffect(() => setInteractive(true), []);

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  useEffect(() => {
    const element = root.current;
    const indicator = progress.current;
    if (!element || !indicator) return;
    if (resetRequested.current) {
      remaining.current = rotationDuration;
      resetRequested.current = false;
    }
    let timer = 0;
    let startedAt = 0;
    let visible = false;
    let animation: Animation | null = null;
    const stop = () => {
      if (timer) {
        window.clearTimeout(timer);
        timer = 0;
        remaining.current = Math.max(
          0,
          remaining.current - (performance.now() - startedAt),
        );
      }
      animation?.cancel();
      animation = null;
      indicator.style.transform = `scaleX(${1 - remaining.current / rotationDuration})`;
    };
    const schedule = () => {
      stop();
      if (!playing || hovered || !visible || document.hidden) return;
      if (!reduceMotion) {
        animation = indicator.animate(
          [
            {
              transform: `scaleX(${1 - remaining.current / rotationDuration})`,
            },
            { transform: "scaleX(1)" },
          ],
          { duration: remaining.current, easing: "linear", fill: "forwards" },
        );
      }
      startedAt = performance.now();
      timer = window.setTimeout(() => {
        timer = 0;
        remaining.current = rotationDuration;
        setDesignId(
          (current) =>
            posterDesigns[
              (posterDesigns.findIndex((item) => item.id === current) + 1) %
                posterDesigns.length
            ].id,
        );
        setSelectedId("headline");
      }, remaining.current);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting && entry.intersectionRatio >= 0.2;
        schedule();
      },
      { threshold: 0.2 },
    );
    observer.observe(element);
    document.addEventListener("visibilitychange", schedule);
    window.addEventListener("pagehide", stop);
    window.addEventListener("pageshow", schedule);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("pageshow", schedule);
    };
  }, [designId, playing, hovered, reduceMotion]);

  function selectDesign(id: typeof designId) {
    endGesture();
    resetRequested.current = true;
    setPlaying(false);
    setDesignId(id);
    setSelectedId("headline");
    if (progress.current) progress.current.style.transform = "scaleX(0)";
  }

  function trackHover(event: PointerEvent<HTMLDivElement>) {
    if (event.pointerType === "mouse") {
      setHovered(!toggle.current?.contains(event.target as Node));
    }
  }

  function dispatch(action: HistoryAction) {
    setHistories((previous) => ({
      ...previous,
      [designId]: posterHistory(previous[designId], action),
    }));
  }

  function editLayer(
    id: string,
    change: (layer: PosterLayer) => PosterLayer,
    group?: string,
  ) {
    dispatch({
      type: "edit",
      group,
      change: (poster) => ({
        ...poster,
        layers: poster.layers.map((layer) =>
          layer.id === id ? change(layer) : layer,
        ),
      }),
    });
  }

  function endGesture() {
    drag.current = null;
    dispatch({ type: "end-group" });
  }

  function startDrag(
    event: PointerEvent<HTMLButtonElement>,
    layer: PosterLayer,
  ) {
    if (!event.isPrimary || event.button !== 0) return;
    setSelectedId(layer.id);
    event.currentTarget.focus({ preventScroll: true });
    drag.current = {
      layer,
      pointer: event.pointerId,
      x: event.clientX,
      y: event.clientY,
      group: "drag:" + layer.id + ":" + event.timeStamp,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function moveDrag(event: PointerEvent<HTMLButtonElement>) {
    const current = drag.current;
    const bounds = paper.current?.getBoundingClientRect();
    if (!current || !bounds || current.pointer !== event.pointerId) return;
    editLayer(
      current.layer.id,
      (layer) =>
        movePosterLayer(layer, {
          x:
            current.layer.x +
            ((event.clientX - current.x) / bounds.width) * 100,
          y:
            current.layer.y +
            ((event.clientY - current.y) / bounds.height) * 100,
        }),
      current.group,
    );
  }

  function moveWithKeyboard(
    event: KeyboardEvent<HTMLButtonElement>,
    layer: PosterLayer,
  ) {
    const steps: Record<string, [number, number]> = {
      ArrowLeft: [-1, 0],
      ArrowRight: [1, 0],
      ArrowUp: [0, -1],
      ArrowDown: [0, 1],
    };
    const delta = steps[event.key];
    if (!delta) return;
    event.preventDefault();
    const step = event.shiftKey ? 5 : 1;
    editLayer(
      layer.id,
      (current) =>
        movePosterLayer(current, {
          x: current.x + delta[0] * step,
          y: current.y + delta[1] * step,
        }),
      "nudge:" + layer.id,
    );
  }

  function reorder(direction: "front" | "back") {
    if (!selected) return;
    dispatch({
      type: "edit",
      change: (poster) => {
        const layers = [...poster.layers];
        const index = layers.findIndex((layer) => layer.id === selected.id);
        const next = index + (direction === "front" ? 1 : -1);
        if (next < 0 || next >= layers.length) return poster;
        [layers[index], layers[next]] = [layers[next], layers[index]];
        return { ...poster, layers };
      },
    });
  }

  return (
    <div
      ref={root}
      className="work-illustration illustration-compad"
      data-playing={playing}
      role="group"
      aria-label="Editable COMPaD poster demo"
      onPointerEnter={trackHover}
      onPointerMove={trackHover}
      onPointerLeave={() => setHovered(false)}
      onFocusCapture={(event) => {
        if (!toggle.current?.contains(event.target as Node)) setPlaying(false);
      }}
      onPointerDownCapture={(event) => {
        if (!toggle.current?.contains(event.target as Node)) setPlaying(false);
      }}
      onKeyDown={(event) => {
        if (
          event.target instanceof HTMLInputElement ||
          event.target instanceof HTMLTextAreaElement ||
          !(event.metaKey || event.ctrlKey)
        )
          return;
        if (event.key.toLowerCase() === "z") {
          event.preventDefault();
          dispatch({ type: event.shiftKey ? "redo" : "undo" });
        } else if (event.key.toLowerCase() === "y") {
          event.preventDefault();
          dispatch({ type: "redo" });
        }
      }}
    >
      <span className="illustration-label">Click a detail. Make it yours.</span>
      <button
        ref={toggle}
        type="button"
        className="compad-cycle-toggle"
        disabled={!interactive}
        aria-label={
          playing ? "Pause poster rotation" : "Resume poster rotation"
        }
        onClick={() => {
          setHovered(false);
          setPlaying((value) => !value);
        }}
      >
        <span className="compad-cycle-track" aria-hidden="true">
          <span ref={progress} className="compad-cycle-progress" />
        </span>
      </button>
      <div className="compad-designs" role="group" aria-label="Poster designs">
        {posterDesigns.map((item, index) => (
          <button
            key={item.id}
            type="button"
            aria-pressed={designId === item.id}
            disabled={!interactive}
            onClick={() => selectDesign(item.id)}
          >
            <span>0{index + 1}</span>
            {item.label}
          </button>
        ))}
      </div>
      <div
        ref={paper}
        className="compad-paper"
        data-tone={poster.tone}
        data-design={poster.design}
        role="group"
        aria-label="Poster canvas"
      >
        <button
          type="button"
          className="compad-paper-select"
          aria-label="Select poster paper"
          disabled={!interactive}
          onClick={() => setSelectedId(null)}
          onFocus={() => setSelectedId(null)}
        />
        {poster.layers.map((layer, index) => {
          const isText = layer.kind === "text";
          const longestLine = isText
            ? Math.max(...layer.text.split("\n").map((line) => line.length))
            : 0;
          const typeSize = isText
            ? Math.min(
                layer.size,
                layer.width / Math.max(longestLine * 0.57, 1),
                layer.maxHeight /
                  0.75 /
                  (layer.leading * layer.text.split("\n").length),
              )
            : 0;
          const style: CSSProperties = {
            left: layer.x + "%",
            top: layer.y + "%",
            width:
              (isText ? layer.width : (layer.width * layer.scale) / 100) + "%",
            aspectRatio: isText ? undefined : layer.aspect,
            transform: "rotate(" + layer.rotation + "deg)",
            zIndex: index + 1,
            textAlign: isText ? layer.align : undefined,
            fontSize: isText
              ? (typeSize * layer.scale) / 100 + "cqw"
              : undefined,
            fontWeight: isText ? layer.weight : undefined,
            lineHeight: isText ? layer.leading : undefined,
            letterSpacing: isText ? layer.tracking + "em" : undefined,
          };
          return (
            <button
              key={layer.id}
              type="button"
              className={"compad-layer compad-" + layer.id}
              data-poster-layer={layer.id}
              data-kind={layer.kind}
              data-selected={selectedId === layer.id}
              data-font={isText ? layer.font : undefined}
              data-italic={isText ? layer.italic : undefined}
              data-ink={isText ? layer.ink : undefined}
              aria-label={
                layer.id === "flower"
                  ? "Move the flower image"
                  : "Move the " + layer.name.toLowerCase()
              }
              aria-pressed={selectedId === layer.id}
              aria-describedby="compad-move-help"
              style={style}
              disabled={!interactive}
              onClick={() => setSelectedId(layer.id)}
              onFocus={() => setSelectedId(layer.id)}
              onPointerDown={(event) => startDrag(event, layer)}
              onPointerMove={moveDrag}
              onPointerUp={endGesture}
              onPointerCancel={endGesture}
              onLostPointerCapture={endGesture}
              onKeyDown={(event) => moveWithKeyboard(event, layer)}
              onKeyUp={() => dispatch({ type: "end-group" })}
            >
              {isText ? (
                <span>{layer.text || "Your words."}</span>
              ) : (
                <Image
                  src={withBasePath(layer.src)}
                  alt=""
                  fill
                  sizes="(max-width: 760px) 65vw, 30vw"
                  draggable={false}
                  style={{
                    objectFit: layer.fit,
                    opacity: layer.opacity / 100,
                    transform: layer.flipped ? "scaleX(-1)" : "none",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>
      <CompadInspector
        layer={selected}
        tone={poster.tone}
        colours={design.colours}
        atFront={selectedIndex === poster.layers.length - 1}
        atBack={selectedIndex === 0}
        onChange={(change, group) => {
          if (selectedId) editLayer(selectedId, change, group);
        }}
        onTone={(tone) =>
          dispatch({ type: "edit", change: (poster) => ({ ...poster, tone }) })
        }
        onOrder={reorder}
        onEndGroup={() => dispatch({ type: "end-group" })}
      />
      <span className="sr-only" id="compad-move-help">
        Click to edit this element. Drag to move it, or use the arrow keys. Hold
        Shift to move further.
      </span>
      <span className="illustration-caption">Interactive concept · COMPaD</span>
      <div className="compad-history" role="group" aria-label="Poster history">
        <button
          type="button"
          aria-label="Undo poster change"
          title="Undo"
          disabled={!history.past.length}
          onClick={() => dispatch({ type: "undo" })}
        >
          <Undo2 size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Redo poster change"
          title="Redo"
          disabled={!history.future.length}
          onClick={() => dispatch({ type: "redo" })}
        >
          <Redo2 size={16} aria-hidden="true" />
        </button>
        <button
          type="button"
          aria-label="Reset poster"
          title="Reset"
          onClick={() => {
            dispatch({ type: "edit", change: () => design.poster });
            setSelectedId("headline");
          }}
        >
          <RotateCcw size={15} aria-hidden="true" />
        </button>
      </div>
      <noscript>
        <style>{`.compad-tools,.compad-history,.compad-designs,.compad-cycle-toggle{display:none}.compad-layer[data-selected=true]{outline:none}@media(min-width:761px){.compad-paper{left:22%}}`}</style>
      </noscript>
    </div>
  );
}
