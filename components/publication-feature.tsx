import type { KeyboardEvent, MouseEvent } from "react";

import { Publication } from "@/src/data/site";

import { PublicationActions } from "./publication-actions";
import { Reveal } from "./reveal";

type PublicationFeatureProps = {
  publication: Publication;
  index: number;
  onOpenSpotlight?: (publication: Publication, trigger: HTMLElement | null) => void;
};

export function PublicationFeature({
  publication,
  index,
  onOpenSpotlight
}: PublicationFeatureProps) {
  const isSpotlightEnabled = Boolean(onOpenSpotlight);

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
    <Reveal delay={index * 0.06}>
      <article
        data-publication-slug={publication.slug}
        data-publication-variant="selected"
        role={isSpotlightEnabled ? "button" : undefined}
        tabIndex={isSpotlightEnabled ? 0 : undefined}
        aria-haspopup={isSpotlightEnabled ? "dialog" : undefined}
        aria-label={
          isSpotlightEnabled ? `Open spotlight for ${publication.title}` : undefined
        }
        className="group grid cursor-pointer gap-6 border-t border-line py-8 text-left transition-colors duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-line/80 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12"
        onClick={handleArticleClick}
        onKeyDown={handleArticleKeyDown}
      >
        <div>
          <p className="meta-label">{publication.shortVenue}</p>
          <h3 className="mt-4 max-w-4xl font-display text-[2.2rem] leading-tight text-ink transition-colors duration-200 group-hover:text-accent group-focus-visible:text-accent sm:text-[2.75rem]">
            {publication.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            {publication.authors}
          </p>
          <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
            {publication.summary}
          </p>
          <PublicationActions
            publication={publication}
            idPrefix={`selected-publication-${publication.slug}`}
            onOpenSpotlight={(trigger) => onOpenSpotlight?.(publication, trigger)}
          />
        </div>
        <div className="grid grid-cols-2 gap-5 border-t border-line pt-4 text-sm text-muted sm:max-w-xs lg:block lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <p className="meta-label">Year</p>
            <p className="mt-2 text-base text-ink">{publication.year}</p>
          </div>
          <div>
            <p className="meta-label">Venue</p>
            <p className="mt-2 text-base text-ink">{publication.venue}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}
