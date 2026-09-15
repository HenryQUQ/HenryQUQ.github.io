"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { MoveHorizontal, RotateCcw } from "lucide-react";
import type {
  PanoramaRenderer,
  PanoramaView,
} from "@/src/lib/panorama-renderer";
import { withBasePath } from "@/src/lib/site-config";

const initialView: PanoramaView = { yaw: 144, pitch: 0 };

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
  const pointer = useRef<{ id: number; x: number; y: number } | null>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const element = root.current;
    const surface = canvas.current;
    if (!element || !surface) return;
    let cancelled = false;
    let started = false;
    let failed = false;

    const contextLost = () => {
      failed = true;
      setReady(false);
      renderer.current?.dispose();
      renderer.current = null;
    };
    surface.addEventListener("webglcontextlost", contextLost);
    const observer = new IntersectionObserver(
      async ([entry]) => {
        if (!entry.isIntersecting || started) return;
        started = true;
        observer.disconnect();
        try {
          const { createPanoramaRenderer } = await import(
            "@/src/lib/panorama-renderer"
          );
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
          setReady(true);
        } catch {
          // The source photograph stays available if WebGL or its texture fails.
        }
      },
      { rootMargin: "200px" },
    );
    observer.observe(element);
    return () => {
      cancelled = true;
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

  function resetView() {
    view.current = { ...initialView };
    renderer.current?.update(view.current);
    canvas.current?.focus({ preventScroll: true });
  }

  return (
    <div
      ref={root}
      className="immersive-panorama"
      data-ready={ready}
      role="group"
      aria-label="Interactive 360+x panorama"
    >
      <div className="panorama-fallback" aria-hidden={ready}>
        <Image
          src={withBasePath(source)}
          alt={alt}
          fill
          sizes="(max-width: 760px) 90vw, 40vw"
        />
      </div>
      <canvas
        ref={canvas}
        className="panorama-surface"
        tabIndex={ready ? 0 : -1}
        role="img"
        aria-hidden={!ready}
        aria-label="Inside the 360+x museum panorama"
        aria-describedby="panorama-instructions"
        onPointerDown={(event) => {
          if (!ready || !event.isPrimary || event.button !== 0) return;
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
          event.currentTarget.setPointerCapture(event.pointerId);
        }}
        onPointerMove={(event) => {
          const previous = pointer.current;
          if (!previous || previous.id !== event.pointerId) return;
          const dx = event.clientX - previous.x;
          const dy = event.clientY - previous.y;
          const scale = 180 / event.currentTarget.clientWidth;
          turn(-dx * scale, dy * scale);
          pointer.current = {
            id: event.pointerId,
            x: event.clientX,
            y: event.clientY,
          };
        }}
        onPointerUp={() => {
          pointer.current = null;
        }}
        onPointerCancel={() => {
          pointer.current = null;
        }}
        onLostPointerCapture={() => {
          pointer.current = null;
        }}
        onKeyDown={(event) => {
          if (!ready) return;
          const directions: Record<string, [number, number]> = {
            ArrowLeft: [-12, 0],
            ArrowRight: [12, 0],
            ArrowUp: [0, 10],
            ArrowDown: [0, -10],
          };
          if (directions[event.key]) {
            event.preventDefault();
            turn(...directions[event.key]);
          } else if (event.key === "Home") {
            event.preventDefault();
            resetView();
          }
        }}
      />
      <span className="panorama-marker" aria-hidden="true">
        360°
      </span>
      <span className="sr-only" id="panorama-instructions">
        Drag or use the arrow keys to look around. Home resets the view.
      </span>
      {ready && (
        <div className="panorama-toolbar">
          <span className="panorama-hint">
            <MoveHorizontal size={15} aria-hidden="true" /> Drag to look around
          </span>
          <button
            type="button"
            className="panorama-reset"
            aria-label="Reset panorama view"
            onClick={resetView}
          >
            <RotateCcw size={16} aria-hidden="true" />
          </button>
        </div>
      )}
    </div>
  );
}
