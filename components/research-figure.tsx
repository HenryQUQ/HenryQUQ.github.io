"use client";

import { useEffect, useId, useRef, useState } from "react";
import Image from "next/image";
import { Maximize2 } from "lucide-react";

import type { PublicationMedia, ResearchLens } from "@/src/data/site";
import { withBasePath } from "@/src/lib/site-config";

import { MediaLightbox } from "./media-lightbox";

export type ResearchFigureProps = {
  src: string;
  alt: string;
  label: string;
  width?: number;
  height?: number;
  fit?: "cover" | "contain";
  sizes?: string;
  priority?: boolean;
  researchLens?: ResearchLens;
  className?: string;
};

export function ResearchFigure({
  src,
  alt,
  label,
  width = 1600,
  height = 1000,
  fit = "contain",
  sizes = "(max-width: 1024px) 100vw, 35rem",
  priority = false,
  researchLens,
  className = ""
}: ResearchFigureProps) {
  const [isOpen, setIsOpen] = useState(false);
  const triggerRef = useRef<HTMLAnchorElement>(null);
  const reactId = useId();
  const mediaId = `research-figure-${reactId.replace(/:/g, "")}`;
  const mediaItem: PublicationMedia = {
    id: mediaId,
    kind: "figure",
    label,
    src,
    alt,
    width,
    height,
    fit
  };

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  const closeFigure = () => {
    setIsOpen(false);

    window.requestAnimationFrame(() => {
      if (triggerRef.current?.isConnected) {
        triggerRef.current.focus();
      }
    });
  };

  return (
    <>
      <a
        ref={triggerRef}
        href={withBasePath(src)}
        target="_blank"
        rel="noreferrer"
        aria-label={`Open figure: ${label}`}
        aria-haspopup="dialog"
        aria-expanded={isOpen}
        data-open-research-figure
        className={`group relative block aspect-[16/10] w-full cursor-zoom-in overflow-hidden rounded-[0.45rem] border border-line bg-white/55 text-left transition-[border-color,background-color] duration-200 hover:border-ink/25 hover:bg-white/70 focus-visible:border-signal motion-reduce:transition-none ${className}`}
        onClick={(event) => {
          if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
            return;
          }

          event.preventDefault();
          setIsOpen(true);
        }}
      >
        <Image
          src={withBasePath(src)}
          alt={alt}
          fill
          priority={priority}
          sizes={sizes}
          className={
            fit === "contain"
              ? "object-contain p-5 transition-transform duration-300 group-hover:scale-[1.006] group-focus-visible:scale-[1.006] motion-reduce:transform-none motion-reduce:transition-none sm:p-7"
              : "object-cover transition-transform duration-300 group-hover:scale-[1.006] group-focus-visible:scale-[1.006] motion-reduce:transform-none motion-reduce:transition-none"
          }
        />

        <span className="pointer-events-none absolute bottom-2.5 right-2.5 inline-flex items-center gap-1.5 border border-line bg-paper/95 px-2 py-1 font-mono text-[0.58rem] font-medium uppercase tracking-[0.09em] text-ink opacity-90 shadow-sm transition-opacity duration-200 group-hover:opacity-100 group-focus-visible:opacity-100 motion-reduce:transition-none">
          <Maximize2 aria-hidden="true" className="h-3 w-3" />
          {researchLens
            ? `Explore ${researchLens.steps.length} ${researchLens.unitLabel}`
            : "Open figure"}
        </span>
      </a>

      {isOpen ? (
        <MediaLightbox
          publicationTitle={label}
          mediaItems={[mediaItem]}
          activeMediaId={mediaId}
          researchLens={researchLens}
          onClose={closeFigure}
          onSelectMedia={() => undefined}
        />
      ) : null}
    </>
  );
}
