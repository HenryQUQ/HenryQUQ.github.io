"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MoveHorizontal, RotateCcw } from "lucide-react";
import type {
  PanoramaRenderer,
  PanoramaView,
} from "@/src/lib/panorama-renderer";
import { withBasePath } from "@/src/lib/site-config";
import { prefersReducedMotion } from "@/src/lib/use-reduced-motion";

const initialView: PanoramaView = { yaw: 144, pitch: 0 };

// idle → loading (near the viewport) → shown (cross-fading in, already
// interactive) → ready (settled). Without WebGL it stays a still photograph.
type Status = "idle" | "loading" | "shown" | "ready" | "failed";

// Only a cross-fading view settles; a failure is never overwritten.
const settled = (current: Status): Status =>
  current === "shown" ? "ready" : current;

export function ImmersivePanorama({
  source,
  alt,
}: {
  source: string;
  alt: string;
}) {
  const root = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const renderer = useRef<PanoramaRenderer | null>(null);
  const view = useRef<PanoramaView>({ ...initialView });
  const pointer = useRef<{
    id: number;
    x: number;
    y: number;
    time: number;
    velocity: number;
  } | null>(null);
  const glide = useRef(0);
  const [status, setStatus] = useState<Status>("idle");
  const interactive = status === "shown" || status === "ready";

  useEffect(() => {
    const element = root.current;
    const surface = canvas.current;
    if (!element || !surface) return;
    let cancelled = false;
    let started = false;
    let failed = false;
    let settle = 0;

    const contextLost = () => {
      failed = true;
      window.clearTimeout(settle);
      cancelAnimationFrame(glide.current);
      // Keep keyboard focus in the viewer when its controls disappear.
      if (element.contains(document.activeElement))
        element.focus({ preventScroll: true });
      setStatus("failed");
      renderer.current?.dispose();
      renderer.current = null;
    };
    surface.addEventListener("webglcontextlost", contextLost);
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        setStatus("loading");
        try {
          const { createPanoramaRenderer } =
            await import("@/src/lib/panorama-renderer");
          if (cancelled) return;
          const next = await createPanoramaRenderer(
            surface,
            withBasePath(source),
          );
          if (cancelled || failed) {
            next.dispose();
            return;
          }
          renderer.current = next;
          next.update(view.current);
          if (prefersReducedMotion()) {
            setStatus("ready");
          } else {
            setStatus("shown");
            // Settle once the cross-fade has finished (transitionend is a hint).
            settle = window.setTimeout(() => setStatus(settled), 950);
          }
        } catch {
          // The source photograph stays available if WebGL or its texture fails.
          if (!cancelled) setStatus("failed");
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
      window.clearTimeout(settle);
      cancelAnimationFrame(glide.current);
      observer.disconnect();
      surface.removeEventListener("webglcontextlost", contextLost);
      renderer.current?.dispose();
      renderer.current = null;
    };
  }, [source]);

  function turn(horizontal: number, vertical: number) {
    const current = view.current;
    current.yaw = (current.yaw + horizontal) % 360;
    current.pitch = Math.max(-75, Math.min(75, current.pitch + vertical));
    renderer.current?.update(current);
  }

  function stopGlide() {
    cancelAnimationFrame(glide.current);
    glide.current = 0;
  }

  // A short, frictional glide after a flick; any new input stops it.
  function startGlide(velocity: number) {
    stopGlide();
    if (Math.abs(velocity) < 0.02 || prefersReducedMotion()) return;
    const started = performance.now();
    let last = started;
    let speed = velocity;
    const step = (now: number) => {
      const elapsed = now - last;
      last = now;
      turn(speed * elapsed, 0);
      speed *= Math.pow(0.92, elapsed / 16.7);
      if (Math.abs(speed) > 0.004 && now - started < 600)
        glide.current = requestAnimationFrame(step);
      else glide.current = 0;
    };
    glide.current = requestAnimationFrame(step);
  }

  function resetView() {
    stopGlide();
    view.current = { ...initialView };
    renderer.current?.update(view.current);
    canvas.current?.focus({ preventScroll: true });
  }

  return (
    <div
      ref={root}
      className="immersive-panorama"
      data-state={status}
      data-ready={status === "ready"}
      role="group"
      tabIndex={-1}
      aria-label="Interactive 360+x panorama"
      aria-busy={status === "loading"}
    >
      <div className="panorama-fallback" aria-hidden={interactive}>
        <Image
          src={withBasePath(source)}
          alt={alt}
          fill
          sizes="(max-width: 759px) 100vw, 1180px"
        />
      </div>
      <canvas
        ref={canvas}
        className="panorama-surface"
        tabIndex={interactive ? 0 : -1}
        role="img"
        aria-hidden={!interactive}
        aria-label="Inside the 360+x museum panorama"
        aria-describedby="panorama-instructions"
        onTransitionEnd={(event) => {
          if (event.propertyName === "opacity") setStatus(settled);
        }}
        onPointerDown={(event) => {
          if (!interactive || !event.isPrimary || event.button !== 0) return;
          stopGlide();
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            time: event.timeStamp,
            velocity: 0,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const previous = pointer.current;
          if (!previous || previous.id !== event.pointerId) return;
          const dx = event.clientX - previous.x;
          const dy = event.clientY - previous.y;
          const scale = 180 / event.currentTarget.clientWidth;
          const elapsed = Math.max(8, event.timeStamp - previous.time);
          turn(-dx * scale, dy * scale);
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
            time: event.timeStamp,
            // Degrees per millisecond, capped so a flick glides at most ~50°.
            velocity: Math.max(-0.25, Math.min(0.25, (-dx * scale) / elapsed)),
          };
        }}
        onPointerUp={(event) => {
          const previous = pointer.current;
          pointer.current = null;
          // Only a recent movement carries into a glide.
          if (previous && event.timeStamp - previous.time < 80)
            startGlide(previous.velocity);
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onLostPointerCapture={() => {
          pointer.current = null;
        }}
        onKeyDown={(event) => {
          if (!interactive) return;
          const directions: Record<string, [number, number]> = {
            ArrowLeft: [-12, 0],
            ArrowRight: [12, 0],
            ArrowUp: [0, 10],
            ArrowDown: [0, -10],
          };
          if (directions[event.key]) {
            event.preventDefault();
            stopGlide();
            turn(...directions[event.key]);
          } else if (event.key === "Home") {
            event.preventDefault();
            resetView();
          }
        }}
      />
      <span className="sr-only" id="panorama-instructions">
        Drag or use the arrow keys to look around. Home resets the view.
      </span>
      <div className="panorama-toolbar">
        <span className="panorama-hint" aria-hidden={!interactive}>
          <MoveHorizontal size={15} aria-hidden="true" /> Drag to look around
        </span>
        {interactive && (
          <button
            type="button"
            className="panorama-reset"
            aria-label="Reset panorama view"
            onClick={resetView}
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        )}
      </div>
      {status === "loading" && (
        <span className="panorama-progress" aria-hidden="true" />
      )}
    </div>
  );
}
