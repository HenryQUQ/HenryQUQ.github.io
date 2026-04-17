"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

import { PublicationMedia } from "@/src/data/site";
import { getFocusableElements } from "@/src/lib/focus";

type MediaLightboxProps = {
  publicationTitle: string;
  mediaItems: PublicationMedia[];
  activeMediaId: string;
  onClose: () => void;
  onSelectMedia: (mediaId: string) => void;
};

export function MediaLightbox({
  publicationTitle,
  mediaItems,
  activeMediaId,
  onClose,
  onSelectMedia
}: MediaLightboxProps) {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const activeIndex = mediaItems.findIndex((media) => media.id === activeMediaId);
  const safeIndex = activeIndex >= 0 ? activeIndex : 0;
  const activeMedia = mediaItems[safeIndex];
  const hasMultiple = mediaItems.length > 1;
  const isVideoMedia = activeMedia?.kind === "video";

  const previousMedia = hasMultiple
    ? mediaItems[(safeIndex - 1 + mediaItems.length) % mediaItems.length]
    : null;
  const nextMedia = hasMultiple
    ? mediaItems[(safeIndex + 1) % mediaItems.length]
    : null;

  useEffect(() => {
    closeButtonRef.current?.focus();

    const dialog = dialogRef.current;
    if (!dialog) {
      return undefined;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key === "ArrowLeft" && previousMedia) {
        event.preventDefault();
        onSelectMedia(previousMedia.id);
        return;
      }

      if (event.key === "ArrowRight" && nextMedia) {
        event.preventDefault();
        onSelectMedia(nextMedia.id);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusableElements(dialog);
      if (focusable.length === 0) {
        event.preventDefault();
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement as HTMLElement | null;

      if (event.shiftKey) {
        if (active === first || !dialog.contains(active)) {
          event.preventDefault();
          last.focus();
        }
        return;
      }

      if (active === last) {
        event.preventDefault();
        first.focus();
      }
    };

    dialog.addEventListener("keydown", handleKeyDown);
    return () => dialog.removeEventListener("keydown", handleKeyDown);
  }, [nextMedia, onClose, onSelectMedia, previousMedia]);

  if (!activeMedia) {
    return null;
  }

  return (
    <motion.div
      data-lightbox-backdrop="true"
      className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/76 px-4 py-4 backdrop-blur-md sm:px-6 sm:py-6"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={reducedMotion ? undefined : { opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      {previousMedia ? (
        <button
          type="button"
          className="absolute left-3 top-1/2 z-[101] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#181b17]/72 text-paper/82 transition-colors hover:text-paper sm:left-5"
          aria-label={`Show previous media for ${publicationTitle}`}
          onClick={() => onSelectMedia(previousMedia.id)}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
      ) : null}

      {nextMedia ? (
        <button
          type="button"
          className="absolute right-3 top-1/2 z-[101] inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/12 bg-[#181b17]/72 text-paper/82 transition-colors hover:text-paper sm:right-5"
          aria-label={`Show next media for ${publicationTitle}`}
          onClick={() => onSelectMedia(nextMedia.id)}
        >
          <ChevronRight className="h-5 w-5" />
        </button>
      ) : null}

      {isVideoMedia ? (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`lightbox-title-${activeMedia.id}`}
          data-lightbox-media-id={activeMedia.id}
          data-lightbox-media-kind={activeMedia.kind}
          className="relative flex h-full w-full flex-col overflow-hidden rounded-[1.8rem] border border-white/10 bg-[#181b17]/94 text-paper"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <div className="flex items-center justify-between gap-4 border-b border-white/10 px-4 py-4 sm:px-6">
            <div className="min-w-0">
              <p className="text-[0.72rem] uppercase tracking-[0.18em] text-paper/58">
                {activeMedia.kind}
              </p>
              <h3
                id={`lightbox-title-${activeMedia.id}`}
                className="mt-2 truncate font-display text-2xl text-paper sm:text-[2rem]"
              >
                {activeMedia.label}
              </h3>
            </div>
            <button
              ref={closeButtonRef}
              type="button"
              className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-white/12 text-paper/82 transition-colors hover:text-paper"
              aria-label={`Close media lightbox for ${publicationTitle}`}
              onClick={onClose}
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <div className="relative flex-1 overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center px-4 py-4 sm:px-8 sm:py-8">
              <div className="flex max-h-full max-w-full items-center justify-center">
                {activeMedia.embedUrl ? (
                  <div className="relative aspect-video w-full max-w-[1400px] overflow-hidden rounded-[1.4rem] border border-white/10 bg-black">
                    <iframe
                      src={activeMedia.embedUrl}
                      title={`${activeMedia.label} for ${publicationTitle}`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowFullScreen
                      className="h-full w-full"
                    />
                  </div>
                ) : (
                  <video
                    controls
                    playsInline
                    preload="metadata"
                    poster={activeMedia.posterSrc}
                    className="max-h-full max-w-full rounded-[1.4rem] border border-white/10 bg-black"
                  >
                    <source src={activeMedia.src} type="video/mp4" />
                  </video>
                )}
              </div>
            </div>
          </div>

          <div className="border-t border-white/10 px-4 py-4 text-sm text-paper/72 sm:px-6">
            <p>{publicationTitle}</p>
          </div>
        </motion.div>
      ) : (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`lightbox-title-${activeMedia.id}`}
          data-lightbox-media-id={activeMedia.id}
          data-lightbox-media-kind={activeMedia.kind}
          data-lightbox-panel="image"
          className="relative inline-flex max-w-full items-start justify-end"
          initial={reducedMotion ? false : { opacity: 0, scale: 0.985 }}
          animate={reducedMotion ? undefined : { opacity: 1, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, scale: 0.985 }}
          transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute right-3 top-3 z-[101] inline-flex h-11 w-11 items-center justify-center rounded-full border border-white/15 bg-[#181b17]/76 text-paper/82 transition-colors hover:text-paper"
            aria-label={`Close media lightbox for ${publicationTitle}`}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>

          <div className="relative inline-flex max-w-full items-center justify-center overflow-hidden rounded-[1.4rem] border border-white/10 bg-[#11120f] shadow-[0_18px_44px_rgba(0,0,0,0.26)]">
            <Image
              src={activeMedia.src}
              alt={activeMedia.alt}
              width={activeMedia.width}
              height={activeMedia.height}
              sizes="(max-width: 640px) calc(100vw - 2rem), calc(100vw - 7rem)"
              className={
                activeMedia.fit === "cover"
                  ? "h-auto w-auto max-h-[calc(100svh-7.5rem)] max-w-[calc(100vw-2rem)] object-cover sm:max-h-[calc(100svh-10rem)] sm:max-w-[calc(100vw-10rem)]"
                  : "h-auto w-auto max-h-[calc(100svh-7.5rem)] max-w-[calc(100vw-2rem)] object-contain sm:max-h-[calc(100svh-10rem)] sm:max-w-[calc(100vw-10rem)]"
              }
            />

            <div className="pointer-events-none absolute inset-x-0 bottom-0 bg-gradient-to-t from-[#11120f]/90 via-[#11120f]/48 to-transparent px-4 pb-4 pt-8 sm:px-5 sm:pb-5">
              <div className="min-w-0">
                <p className="text-[0.7rem] uppercase tracking-[0.18em] text-paper/58">
                  {activeMedia.kind}
                </p>
                <h3
                  id={`lightbox-title-${activeMedia.id}`}
                  className="mt-1 font-display text-lg text-paper sm:text-[1.4rem]"
                >
                  {activeMedia.label}
                </h3>
                <p className="mt-1 text-sm text-paper/68">{publicationTitle}</p>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
}
