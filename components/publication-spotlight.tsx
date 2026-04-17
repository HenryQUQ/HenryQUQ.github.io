"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { Play, X } from "lucide-react";

import { Project, Publication, PublicationMedia } from "@/src/data/site";
import { getFocusableElements } from "@/src/lib/focus";
import { getPublicationProjectLinks } from "@/src/lib/publications";

import { PublicationActions } from "./publication-actions";
import { TextLink } from "./text-link";

type PublicationSpotlightProps = {
  publication: Publication;
  project?: Project;
  onClose: () => void;
  onOpenMedia: (mediaId: string, trigger: HTMLElement | null) => void;
};

export function PublicationSpotlight({
  publication,
  project,
  onClose,
  onOpenMedia
}: PublicationSpotlightProps) {
  const reducedMotion = useReducedMotion();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const mediaItems = publication.spotlightMedia ?? [];
  const primaryMedia = mediaItems[0];
  const extraProjectLinks = getPublicationProjectLinks(publication, project);

  const getPreviewSrc = (media: PublicationMedia) =>
    media.kind === "video" ? media.posterSrc : media.src;

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
  }, [onClose]);

  return (
    <motion.div
      className="fixed inset-0 z-[90] overflow-y-auto bg-ink/42 px-4 py-4 backdrop-blur-sm sm:px-6 sm:py-8"
      initial={reducedMotion ? false : { opacity: 0 }}
      animate={reducedMotion ? undefined : { opacity: 1 }}
      exit={reducedMotion ? undefined : { opacity: 0 }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div className="flex min-h-full items-start justify-center lg:items-center">
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby={`spotlight-title-${publication.slug}`}
          data-publication-spotlight={publication.slug}
          className={`relative w-full overflow-hidden rounded-[1.8rem] border border-line/80 bg-paper shadow-[0_28px_80px_rgba(29,32,28,0.18)] ${
            mediaItems.length > 0 ? "max-w-6xl" : "max-w-4xl"
          }`}
          initial={reducedMotion ? false : { opacity: 0, y: 24, scale: 0.985 }}
          animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
          exit={reducedMotion ? undefined : { opacity: 0, y: 18, scale: 0.985 }}
          transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          onClick={(event) => event.stopPropagation()}
        >
          <button
            ref={closeButtonRef}
            type="button"
            className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/90 bg-paper/92 text-ink/82 transition-colors hover:text-ink sm:right-5 sm:top-5"
            aria-label={`Close spotlight for ${publication.title}`}
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </button>

          <div
            className={
              mediaItems.length > 0
                ? "grid lg:grid-cols-[minmax(0,1.08fr)_minmax(22rem,0.92fr)]"
                : "grid"
            }
          >
            {mediaItems.length > 0 ? (
              <div className="border-b border-line/80 bg-stone/32 p-4 sm:p-6 lg:border-b-0 lg:border-r lg:p-8">
                {primaryMedia ? (
                  <button
                    type="button"
                    className="group block w-full text-left"
                    aria-label={`Open ${primaryMedia.label} for ${publication.title}`}
                    data-spotlight-media-id={primaryMedia.id}
                    onClick={(event) =>
                      onOpenMedia(primaryMedia.id, event.currentTarget)
                    }
                  >
                    <div className="overflow-hidden rounded-[1.35rem] border border-white/60 bg-paper/72">
                      <div className="relative aspect-[16/9] sm:aspect-[16/10]">
                        {getPreviewSrc(primaryMedia) ? (
                          <Image
                            src={getPreviewSrc(primaryMedia) as string}
                            alt={primaryMedia.alt}
                            fill
                            sizes="(max-width: 1024px) 100vw, 56vw"
                            className={
                              primaryMedia.fit === "cover"
                                ? "object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                : "object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02] sm:p-6"
                            }
                          />
                        ) : (
                          <div className="paper-grid flex h-full items-center justify-center bg-stone/36">
                            <Play className="h-10 w-10 text-ink/46" />
                          </div>
                        )}
                        {primaryMedia.kind === "video" ? (
                          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/26 via-transparent to-transparent">
                            <span className="inline-flex items-center gap-2 rounded-full border border-white/40 bg-paper/88 px-4 py-2 text-[0.7rem] uppercase tracking-[0.18em] text-ink/82">
                              <Play className="h-3.5 w-3.5 fill-current" />
                              Video
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between gap-4 text-sm text-muted">
                      <span>{primaryMedia.label}</span>
                      <span className="uppercase tracking-[0.18em] text-ink/60">
                        Open
                      </span>
                    </div>
                  </button>
                ) : null}

                {mediaItems.length > 1 ? (
                  <div className="mt-5 grid gap-3 sm:grid-cols-2">
                    {mediaItems.slice(1).map((media) => (
                      <button
                        key={media.id}
                        type="button"
                        className="group overflow-hidden rounded-[1.1rem] border border-line/80 bg-paper/70 text-left transition-colors hover:border-line"
                        aria-label={`Open ${media.label} for ${publication.title}`}
                        data-spotlight-media-id={media.id}
                        onClick={(event) =>
                          onOpenMedia(media.id, event.currentTarget)
                        }
                      >
                        <div className="relative aspect-[16/9] sm:aspect-[16/10]">
                          {getPreviewSrc(media) ? (
                            <Image
                              src={getPreviewSrc(media) as string}
                              alt={media.alt}
                              fill
                              sizes="(max-width: 640px) 100vw, 18rem"
                              className={
                                media.fit === "cover"
                                  ? "object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                                  : "object-contain p-3 transition-transform duration-300 group-hover:scale-[1.02]"
                              }
                            />
                          ) : (
                            <div className="paper-grid flex h-full items-center justify-center bg-stone/36">
                              <Play className="h-8 w-8 text-ink/46" />
                            </div>
                          )}
                          {media.kind === "video" ? (
                            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-t from-ink/22 via-transparent to-transparent">
                              <span className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/40 bg-paper/88 text-ink/82">
                                <Play className="h-4 w-4 fill-current" />
                              </span>
                            </div>
                          ) : null}
                        </div>
                        <div className="flex items-center justify-between gap-3 border-t border-line/70 px-4 py-3 text-sm text-ink/82">
                          <span>{media.label}</span>
                          <span className="uppercase tracking-[0.18em] text-ink/54">
                            {media.kind}
                          </span>
                        </div>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            ) : null}

            <div className="p-6 sm:p-8 lg:p-10">
              <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
                <p className="meta-label">{publication.shortVenue}</p>
                <p className="text-sm text-muted">{publication.year}</p>
                {project ? <p className="text-sm text-muted">{project.title}</p> : null}
              </div>
              <h2
                id={`spotlight-title-${publication.slug}`}
                className="mt-4 max-w-4xl font-display text-[1.95rem] leading-tight text-ink sm:text-[2.35rem] lg:text-[2.8rem]"
              >
                {publication.title}
              </h2>
              <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
                {publication.authors}
              </p>
              <p className="mt-3 text-sm leading-7 text-ink/78">{publication.venue}</p>
              <p className="mt-6 max-w-reading text-[1.02rem] leading-8 text-ink/88 sm:text-lg">
                {publication.summary}
              </p>

              <div className="mt-8 border-t border-line pt-6">
                <p className="meta-label">Abstract</p>
                <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
                  {publication.abstract}
                </p>
              </div>

              <div className="mt-8 border-t border-line pt-6">
                <PublicationActions
                  publication={publication}
                  idPrefix={`spotlight-publication-${publication.slug}`}
                  showSpotlightButton={false}
                />
                {extraProjectLinks.length > 0 ? (
                  <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5">
                    {extraProjectLinks.map((link) => (
                      <TextLink
                        key={`${publication.slug}-spotlight-${link.kind}-${link.label}`}
                        href={link.href}
                        external={link.external ?? true}
                      >
                        {link.label}
                      </TextLink>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
