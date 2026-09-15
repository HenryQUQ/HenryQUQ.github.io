"use client";

import Image from "next/image";
import {
  CSSProperties,
  PointerEvent,
  useEffect,
  useRef,
  useState,
} from "react";
import { useReducedMotion } from "framer-motion";
import { profile } from "@/src/data/site";
import { withBasePath } from "@/src/lib/site-config";

const styles = ["Editorial", "Gallery", "Cinema"] as const;
const duration = 4500;

export function PortraitPoster() {
  const [active, setActive] = useState(0);
  const [playing, setPlaying] = useState(true);
  const rootRef = useRef<HTMLElement>(null);
  const posterRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const choiceRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const remaining = useRef(duration);
  const resetRequested = useRef(false);
  const pointerFrame = useRef(0);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    if (reduceMotion) setPlaying(false);
  }, [reduceMotion]);

  useEffect(() => {
    const poster = posterRef.current;
    const progress = progressRef.current;
    if (!poster || !progress) return;
    let timer = 0;
    let startedAt = 0;
    let visible = false;
    let animation: Animation | null = null;
    if (resetRequested.current) {
      remaining.current = duration;
      resetRequested.current = false;
    }
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
      progress.style.transform = `scaleX(${1 - remaining.current / duration})`;
    };
    const schedule = () => {
      stop();
      if (!playing || !visible || document.hidden) return;
      if (!reduceMotion)
        animation = progress.animate(
          [
            { transform: `scaleX(${1 - remaining.current / duration})` },
            { transform: "scaleX(1)" },
          ],
          { duration: remaining.current, easing: "linear", fill: "forwards" },
        );
      startedAt = performance.now();
      timer = window.setTimeout(() => {
        timer = 0;
        remaining.current = duration;
        setActive((current) => (current + 1) % styles.length);
      }, remaining.current);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        schedule();
      },
      { threshold: 0.2 },
    );
    observer.observe(poster);
    document.addEventListener("visibilitychange", schedule);
    window.addEventListener("pagehide", stop);
    window.addEventListener("pageshow", schedule);
    schedule();
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", schedule);
      window.removeEventListener("pagehide", stop);
      window.removeEventListener("pageshow", schedule);
    };
  }, [active, playing, reduceMotion]);

  useEffect(() => () => cancelAnimationFrame(pointerFrame.current), []);

  function resetDepth() {
    cancelAnimationFrame(pointerFrame.current);
    const root = rootRef.current;
    if (!root) return;
    ["person-x", "person-y", "scene-x", "scene-y", "type-x", "type-y"].forEach(
      (key) => root.style.setProperty(`--cq-${key}`, "0px"),
    );
    root.style.setProperty("--cq-rotation", "0deg");
  }

  function selectStyle(index: number) {
    resetRequested.current = true;
    remaining.current = duration;
    if (progressRef.current) progressRef.current.style.transform = "scaleX(0)";
    setPlaying(false);
    setActive(index);
    resetDepth();
  }

  function moveDepth(event: PointerEvent<HTMLDivElement>) {
    if (reduceMotion || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = Math.max(
      -0.5,
      Math.min(0.5, (event.clientX - box.left) / box.width - 0.5),
    );
    const y = Math.max(
      -0.5,
      Math.min(0.5, (event.clientY - box.top) / box.height - 0.5),
    );
    cancelAnimationFrame(pointerFrame.current);
    pointerFrame.current = requestAnimationFrame(() => {
      const root = rootRef.current;
      if (!root) return;
      root.style.setProperty("--cq-person-x", `${x * 16}px`);
      root.style.setProperty("--cq-person-y", `${y * 10}px`);
      root.style.setProperty("--cq-scene-x", `${-x * 8}px`);
      root.style.setProperty("--cq-scene-y", `${-y * 5}px`);
      root.style.setProperty("--cq-type-x", `${-x * 12}px`);
      root.style.setProperty("--cq-type-y", `${-y * 7}px`);
      root.style.setProperty("--cq-rotation", `${x * 2}deg`);
    });
  }

  const maskStyle = {
    "--portrait-mask": `url('${withBasePath("/images/portrait/person-matte.webp")}')`,
  } as CSSProperties;

  return (
    <figure
      ref={rootRef}
      className="portrait-poster"
      data-style={styles[active].toLowerCase()}
      data-playing={playing}
      style={maskStyle}
    >
      <div
        ref={posterRef}
        className="cq-poster"
        role="img"
        aria-label={`Portrait of ${profile.name}, ${styles[active]} composition`}
        onPointerMove={moveDepth}
        onPointerLeave={resetDepth}
        onPointerCancel={resetDepth}
      >
        <div className="cq-poster-top" aria-hidden="true">
          <span>{profile.name.toUpperCase()}</span>
          <span>0{active + 1}</span>
        </div>
        <div className="cq-plinth" aria-hidden="true" />
        <div className="cq-scene-frame" aria-hidden="true">
          <Image
            className="cq-scene"
            src={withBasePath("/images/portrait/street-background.webp")}
            width={1254}
            height={1254}
            alt=""
            priority
            sizes="(max-width: 600px) 85vw, 42vw"
          />
        </div>
        <p className="cq-backtype" aria-hidden="true">
          {active === 1 ? "QU." : "Qu."}
        </p>
        <div className="cq-person" aria-hidden="true">
          <Image
            src={withBasePath(profile.heroImage)}
            width={1800}
            height={1800}
            alt=""
            priority
            sizes="(max-width: 600px) 130vw, 65vw"
          />
        </div>
        <div className="cq-shade" aria-hidden="true" />
        <p className="cq-caption" aria-hidden="true">
          Research
          <br />
          &amp; practice.
        </p>
        <p className="cq-side-caption" aria-hidden="true">
          Visual studies
        </p>
        <p className="cq-edition" aria-hidden="true">
          {(active === 1
            ? profile.location.split(",")[0]
            : profile.location.replace(",", " ·")
          ).toUpperCase()}
        </p>
      </div>
      <figcaption className="cq-art-controls">
        <div
          className="cq-style-buttons"
          role="group"
          aria-label="Portrait style"
        >
          {styles.map((style, index) => (
            <button
              key={style}
              ref={(element) => {
                choiceRefs.current[index] = element;
              }}
              type="button"
              aria-pressed={active === index}
              onClick={() => selectStyle(index)}
              onKeyDown={(event) => {
                const next =
                  event.key === "ArrowRight"
                    ? (index + 1) % 3
                    : event.key === "ArrowLeft"
                      ? (index + 2) % 3
                      : event.key === "Home"
                        ? 0
                        : event.key === "End"
                          ? 2
                          : null;
                if (next !== null) {
                  event.preventDefault();
                  selectStyle(next);
                  choiceRefs.current[next]?.focus();
                }
              }}
            >
              {style}
            </button>
          ))}
        </div>
        <button
          className="cq-cycle-toggle"
          type="button"
          aria-label={
            playing ? "Pause portrait rotation" : "Resume portrait rotation"
          }
          onClick={() => setPlaying((value) => !value)}
        >
          <span className="cq-cycle-track" aria-hidden="true">
            <span ref={progressRef} className="cq-cycle-progress" />
          </span>
        </button>
        <span className="sr-only" aria-live={playing ? "off" : "polite"}>
          {styles[active]} portrait
        </span>
      </figcaption>
      <noscript>
        <style>{`.cq-art-controls{display:none}`}</style>
      </noscript>
    </figure>
  );
}
