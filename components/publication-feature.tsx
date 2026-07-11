import { Publication } from "@/src/data/site";

import { LinkedAuthors } from "./linked-authors";
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

  return (
    <Reveal delay={index * 0.06}>
      <article
        data-publication-slug={publication.slug}
        data-publication-variant="selected"
        className="group relative grid gap-6 border-t border-line py-8 text-left transition-colors duration-200 motion-reduce:transition-none lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12"
      >
        {isSpotlightEnabled ? (
          <button
            type="button"
            role="button"
            data-open-publication-spotlight={publication.slug}
            aria-haspopup="dialog"
            aria-label={`Open spotlight for ${publication.title}`}
            className="absolute inset-0 z-0 cursor-pointer rounded-sm text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            onClick={(event) =>
              onOpenSpotlight?.(publication, event.currentTarget)
            }
          >
            <span className="sr-only">Open spotlight for {publication.title}</span>
          </button>
        ) : null}

        <div className="pointer-events-none relative z-10">
          <p className="meta-label">
            {publication.shortVenue}
            {publication.recognition ? ` · ${publication.recognition}` : ""}
          </p>
          <h3 className="mt-4 max-w-4xl font-display text-[2.2rem] leading-tight text-ink transition-colors duration-200 group-hover:text-accent group-focus-within:text-accent motion-reduce:transition-none sm:text-[2.75rem]">
            {publication.title}
          </h3>
          <LinkedAuthors
            publication={publication}
            className="pointer-events-auto relative z-20 mt-4 text-sm leading-7 text-muted sm:text-base"
          />
          <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
            {publication.summary}
          </p>
          <PublicationActions
            publication={publication}
            idPrefix={`selected-publication-${publication.slug}`}
            showSpotlightButton={false}
          />
        </div>
        <div className="pointer-events-none relative z-10 grid grid-cols-2 gap-5 border-t border-line pt-4 text-sm text-muted sm:max-w-xs lg:block lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
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
