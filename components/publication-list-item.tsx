import type { KeyboardEvent, MouseEvent } from "react";
import Image from "next/image";

import { Project, Publication } from "@/src/data/site";
import { getPublicationProjectLinks } from "@/src/lib/publications";

import { PublicationActions } from "./publication-actions";
import { Reveal } from "./reveal";
import { TextLink } from "./text-link";

type PublicationListItemProps = {
  publication: Publication;
  project?: Project;
  index: number;
  onOpenSpotlight?: (publication: Publication, trigger: HTMLElement | null) => void;
};

export function PublicationListItem({
  publication,
  project,
  index,
  onOpenSpotlight
}: PublicationListItemProps) {
  const extraProjectLinks = getPublicationProjectLinks(publication, project);
  const isSpotlightEnabled = Boolean(onOpenSpotlight);
  const previewMedia =
    publication.spotlightMedia?.find((media) => media.kind !== "video") ??
    publication.spotlightMedia?.find((media) => Boolean(media.posterSrc));
  const previewImageSrc = project?.image
    ? project.image
    : previewMedia?.kind === "video"
      ? previewMedia.posterSrc
      : previewMedia?.src;
  const previewImageAlt = project?.title ?? previewMedia?.alt ?? publication.title;
  const previewImageFit = project?.imageFit ?? previewMedia?.fit;

  const openSpotlight = (trigger: HTMLElement | null) => {
    onOpenSpotlight?.(publication, trigger);
  };

  const handleArticleClick = (event: MouseEvent<HTMLElement>) => {
    if (!isSpotlightEnabled) {
      return;
    }

    const target = event.target as HTMLElement | null;
    if (target?.closest("a, button, input, textarea, select, summary")) {
      return;
    }

    openSpotlight(event.currentTarget);
  };

  const handleArticleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (!isSpotlightEnabled || event.target !== event.currentTarget) {
      return;
    }

    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      openSpotlight(event.currentTarget);
    }
  };

  return (
    <Reveal delay={index * 0.04}>
      <li
        id={`publication-${publication.slug}`}
        data-publication-slug={publication.slug}
        data-publication-variant="full"
        className="border-t border-line py-8"
      >
        <article
          role={isSpotlightEnabled ? "button" : undefined}
          tabIndex={isSpotlightEnabled ? 0 : undefined}
          aria-haspopup={isSpotlightEnabled ? "dialog" : undefined}
          aria-label={
            isSpotlightEnabled ? `Open spotlight for ${publication.title}` : undefined
          }
          className="group grid cursor-pointer gap-6 text-left focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-line/80 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-10"
          onClick={handleArticleClick}
          onKeyDown={handleArticleKeyDown}
        >
          {isSpotlightEnabled ? (
            <div className="pointer-events-none relative overflow-hidden rounded-[1.2rem] bg-stone/60 sm:rounded-[1.35rem]">
              {previewImageSrc ? (
                <div className="relative aspect-[5/4]">
                  <Image
                    src={previewImageSrc}
                    alt={previewImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 18rem"
                    className={
                      previewImageFit === "contain"
                        ? "object-contain p-4 transition-transform duration-300 group-hover:scale-[1.02] sm:p-5"
                        : "object-cover transition-transform duration-300 group-hover:scale-[1.02]"
                    }
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/18 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                  <div className="absolute inset-x-4 bottom-4 flex items-center justify-between text-[0.76rem] uppercase tracking-[0.18em] text-ink/72 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                    <span>{publication.shortVenue}</span>
                    <span>Spotlight</span>
                  </div>
                </div>
              ) : (
                <div className="paper-grid hero-shadow flex aspect-[5/4] flex-col items-start justify-between rounded-[1.35rem] border border-white/60 px-6 py-5">
                  <span className="meta-label text-accent">{publication.shortVenue}</span>
                  <p className="font-display text-[2.6rem] leading-none text-ink/88">
                    {publication.year}
                  </p>
                  <span className="text-[0.76rem] uppercase tracking-[0.18em] text-ink/72">
                    Spotlight
                  </span>
                </div>
              )}
            </div>
          ) : (
            <div className="pointer-events-none relative overflow-hidden rounded-[1.2rem] bg-stone/60 sm:rounded-[1.35rem]">
              {previewImageSrc ? (
                <div className="relative aspect-[5/4]">
                  <Image
                    src={previewImageSrc}
                    alt={previewImageAlt}
                    fill
                    sizes="(max-width: 1024px) 100vw, 18rem"
                    className={
                      previewImageFit === "contain"
                        ? "object-contain p-4 sm:p-5"
                        : "object-cover"
                    }
                  />
                </div>
              ) : (
                <div className="paper-grid hero-shadow flex aspect-[5/4] flex-col items-start justify-between rounded-[1.35rem] border border-white/60 px-6 py-5">
                  <span className="meta-label text-accent">{publication.shortVenue}</span>
                  <p className="font-display text-[2.6rem] leading-none text-ink/88">
                    {publication.year}
                  </p>
                </div>
              )}
            </div>
          )}
          <div>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
              <p className="meta-label">{publication.shortVenue}</p>
              <p className="text-sm text-muted">{publication.year}</p>
              {project ? (
                <p className="text-sm text-muted">{project.title}</p>
              ) : null}
            </div>
            <h3 className="mt-4 font-display text-[1.9rem] leading-tight text-ink sm:text-[2.15rem]">
              {publication.title}
            </h3>
            <p className="mt-3 text-sm leading-7 text-muted">{publication.authors}</p>
            <p className="mt-2 text-sm leading-7 text-ink/78">{publication.venue}</p>
            <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
              {publication.summary}
            </p>
            <PublicationActions
              publication={publication}
              idPrefix={`publication-${publication.slug}`}
              onOpenSpotlight={(trigger) => onOpenSpotlight?.(publication, trigger)}
            />
            {extraProjectLinks.length > 0 ? (
              <div className="mt-3 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5">
                {extraProjectLinks.map((link) => (
                  <TextLink
                    key={`${publication.slug}-${link.kind}-${link.label}`}
                    href={link.href}
                    external={link.external ?? true}
                  >
                    {link.label}
                  </TextLink>
                ))}
              </div>
            ) : null}
          </div>
        </article>
      </li>
    </Reveal>
  );
}
