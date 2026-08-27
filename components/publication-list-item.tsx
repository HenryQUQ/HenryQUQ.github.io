import Image from "next/image";

import { Project, Publication, ResearchThread } from "@/src/data/site";
import {
  getPrimaryPublicationHref,
  getPublicationProjectLinks
} from "@/src/lib/publications";
import { withBasePath } from "@/src/lib/site-config";
import {
  getResearchThreadHref,
  getResearchThreadTarget
} from "@/src/lib/research-threads";

import { LinkedAuthors } from "./linked-authors";
import { PublicationActions } from "./publication-actions";
import { TextLink } from "./text-link";

type PublicationListItemProps = {
  publication: Publication;
  project?: Project;
  researchThreads?: ResearchThread[];
  index: number;
  onOpenSpotlight?: (publication: Publication, trigger: HTMLElement | null) => void;
};

export function PublicationListItem({
  publication,
  project,
  researchThreads = [],
  onOpenSpotlight
}: PublicationListItemProps) {
  const extraProjectLinks = getPublicationProjectLinks(publication, project);
  const previewMedia =
    publication.spotlightMedia?.find((media) => media.kind !== "video") ??
    publication.spotlightMedia?.find((media) => Boolean(media.posterSrc));
  const previewImageSrc = project?.image
    ? project.image
    : previewMedia?.kind === "video"
      ? previewMedia.posterSrc
      : previewMedia?.src;
  const previewImageAlt =
    previewMedia?.alt ??
    (project
      ? `Visual overview for ${project.title}`
      : `Visual overview for ${publication.title}`);
  const previewImageFit = project?.imageFit ?? previewMedia?.fit;
  const spotlightHref =
    getPrimaryPublicationHref(publication) ??
    `${withBasePath("/")}?spotlight=${encodeURIComponent(publication.slug)}#research`;
  const spotlightFallbackIsExternal = /^(?:https?:)?\/\//i.test(spotlightHref);
  const primaryThread =
    researchThreads.find((thread) => thread.inferFromTarget) ??
    researchThreads[0];

  const preview = (
    <>
      <div className="relative aspect-[16/10] overflow-hidden rounded-[0.35rem] border border-line bg-surface/55">
        {previewImageSrc ? (
          <Image
            src={withBasePath(previewImageSrc)}
            alt={previewImageAlt}
            fill
            sizes="(max-width: 1024px) 100vw, 14rem"
            className={previewImageFit === "contain" ? "object-contain p-4" : "object-cover"}
          />
        ) : (
          <div className="flex h-full items-center justify-center font-display text-3xl text-muted">
            {publication.year}
          </div>
        )}
      </div>
      <span className="mt-2 flex items-center justify-between gap-4 text-xs text-muted">
        <span>
          {publication.shortVenue}
          {publication.recognition ? ` · ${publication.recognition}` : ""}
        </span>
        <span className="underline decoration-ink/20 underline-offset-4">View details</span>
      </span>
    </>
  );

  return (
    <li
      id={`publication-${publication.slug}`}
      data-publication-slug={publication.slug}
      data-publication-variant="full"
      data-thread-observer
      data-thread-target={`publication-${publication.slug}`}
      data-thread-stage="publication"
      data-research-threads={researchThreads
        .map((thread) => thread.slug)
        .join(" ")}
      data-primary-research-thread={primaryThread?.slug}
      className="border-t border-line py-8 transition-[background-color,box-shadow] duration-200 motion-reduce:transition-none sm:py-10"
    >
      <article className="grid gap-7 text-left lg:grid-cols-[13rem_minmax(0,1fr)] lg:items-start lg:gap-10">
        {onOpenSpotlight ? (
          <a
            href={spotlightHref}
            target={spotlightFallbackIsExternal ? "_blank" : undefined}
            rel={spotlightFallbackIsExternal ? "noreferrer" : undefined}
            data-open-publication-spotlight={publication.slug}
            aria-haspopup="dialog"
            aria-label={`Open spotlight for ${publication.title}`}
            className="group block w-full text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            onClick={(event) => {
              if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
                return;
              }

              event.preventDefault();
              onOpenSpotlight(publication, event.currentTarget);
            }}
          >
            {preview}
          </a>
        ) : (
          <div>{preview}</div>
        )}

        <div>
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <p className="meta-label">{publication.shortVenue}</p>
            <p className="text-sm text-muted">{publication.year}</p>
            {publication.recognition ? (
              <p
                data-publication-recognition={publication.slug}
                className="meta-label text-signal"
              >
                {publication.recognition}
              </p>
            ) : null}
          </div>
          <h3 className="mt-3 max-w-4xl font-display text-[1.8rem] font-normal leading-[1.08] tracking-[-0.02em] text-ink sm:text-[2.15rem]">
            {publication.title}
          </h3>
          <LinkedAuthors
            publication={publication}
            className="mt-3 text-sm leading-7 text-muted"
          />
          <p className="mt-2 text-sm leading-7 text-ink/78">{publication.venue}</p>
          <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
            {publication.summary}
          </p>
          {researchThreads.length > 0 ? (
            <nav
              data-thread-context="publication"
              aria-label={`Research threads related to ${publication.title}`}
              className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-line pt-4"
            >
              <span className="meta-label">Related question</span>
              {researchThreads.map((thread) => {
                const interestTarget = getResearchThreadTarget(
                  thread,
                  "interest"
                );
                return (
                  <a
                    key={thread.slug}
                    href={getResearchThreadHref(thread, "interest")}
                    data-set-research-thread={thread.slug}
                    data-thread-target={interestTarget}
                    data-thread-stage="interest"
                    className="text-xs text-ink/76 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent"
                  >
                    {thread.index} {thread.title}
                  </a>
                );
              })}
              {primaryThread ? (
                <a
                  href={getResearchThreadHref(primaryThread, "study")}
                  data-set-research-thread={primaryThread.slug}
                  data-thread-target={getResearchThreadTarget(
                    primaryThread,
                    "study"
                  )}
                  data-thread-stage="study"
                  className="text-xs text-signal underline decoration-signal/25 underline-offset-4"
                >
                  Read about {primaryThread.study.label}
                </a>
              ) : null}
            </nav>
          ) : null}
          <PublicationActions
            publication={publication}
            idPrefix={`publication-${publication.slug}`}
            showSpotlightButton={false}
          />
          {extraProjectLinks.length > 0 ? (
            <div className="mt-2 flex flex-wrap gap-x-5 gap-y-1">
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
  );
}
