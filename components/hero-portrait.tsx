"use client";

import { useEffect, useRef } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import {
  animate,
  motion,
  useMotionValue,
  useReducedMotion
} from "framer-motion";
import Image from "next/image";

import { withBasePath } from "@/src/lib/site-config";

import { LocalTime } from "./local-time";

type HeroPortraitProps = {
  src: string;
  alt: string;
};

export function HeroPortrait({ src, alt }: HeroPortraitProps) {
  const frameRef = useRef<HTMLDivElement>(null);
  const animationFrameRef = useRef<number | null>(null);
  const settleAnimationsRef = useRef<Array<{ stop: () => void }>>([]);
  const reduceMotion = useReducedMotion();
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  const imageX = useMotionValue(0);
  const imageY = useMotionValue(0);

  useEffect(
    () => () => {
      if (animationFrameRef.current !== null) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      settleAnimationsRef.current.forEach((control) => control.stop());
    },
    []
  );

  const stopSettling = () => {
    settleAnimationsRef.current.forEach((control) => control.stop());
    settleAnimationsRef.current = [];
  };

  const settlePortrait = () => {
    stopSettling();

    if (reduceMotion) {
      rotateX.set(0);
      rotateY.set(0);
      imageX.set(0);
      imageY.set(0);
      return;
    }

    const spring = {
      type: "spring" as const,
      bounce: 0,
      duration: 0.4
    };
    settleAnimationsRef.current = [
      animate(rotateX, 0, spring),
      animate(rotateY, 0, spring),
      animate(imageX, 0, spring),
      animate(imageY, 0, spring)
    ];
  };

  const handlePointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const frame = frameRef.current;
    if (
      !frame ||
      event.pointerType === "touch" ||
      reduceMotion ||
      !window.matchMedia("(hover: hover) and (pointer: fine)").matches
    ) {
      return;
    }

    const bounds = frame.getBoundingClientRect();
    const x = Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width));
    const y = Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height));

    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
    }
    stopSettling();

    animationFrameRef.current = requestAnimationFrame(() => {
      frame.style.setProperty("--portrait-x", `${x * 100}%`);
      frame.style.setProperty("--portrait-y", `${y * 100}%`);
      rotateX.set((0.5 - y) * 3);
      rotateY.set((x - 0.5) * 3);
      imageX.set((x - 0.5) * 7);
      imageY.set((y - 0.5) * 7);
    });
  };

  const handlePointerLeave = () => {
    if (frameRef.current) {
      frameRef.current.style.setProperty("--portrait-x", "58%");
      frameRef.current.style.setProperty("--portrait-y", "42%");
    }
    settlePortrait();
  };

  return (
    <figure className="w-full max-w-[22rem] lg:justify-self-end">
      <motion.div
        ref={frameRef}
        data-hero-portrait
        className="hero-portrait-frame relative aspect-[4/5] overflow-hidden rounded-[0.55rem] border border-line bg-stone"
        style={{ rotateX, rotateY, transformPerspective: 900 }}
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        <motion.div
          className="hero-portrait-media absolute inset-0"
          style={{ x: imageX, y: imageY, scale: 1.025 }}
        >
          <Image
            src={withBasePath(src)}
            alt={alt}
            fill
            priority
            sizes="(max-width: 1024px) 82vw, 19rem"
            className="object-cover object-[58%_center]"
          />
        </motion.div>
        <span className="hero-portrait-glow" aria-hidden="true" />
        <span className="hero-portrait-frame-line" aria-hidden="true" />
      </motion.div>
      <figcaption className="flex items-center justify-between gap-4">
        <LocalTime className="mt-3 block text-sm tabular-nums text-muted" />
        <span
          aria-hidden="true"
          className="mt-3 hidden h-px w-12 bg-signal/45 sm:block"
        />
      </figcaption>
    </figure>
  );
}
