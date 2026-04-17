"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { ProjectHighlight } from "@/components/project-highlight";
import { PublicationFeature } from "@/components/publication-feature";
import { PublicationListItem } from "@/components/publication-list-item";
import { SectionHeading } from "@/components/section-heading";
import {
  Project,
  Publication
} from "@/src/data/site";
import { groupPublicationsByYear } from "@/src/lib/publications";

import { MediaLightbox } from "./media-lightbox";
import { PublicationSpotlight } from "./publication-spotlight";

type PublicationsExperienceProps = {
  publications: Publication[];
  projects: Project[];
  selectedPublicationSlugs: Publication["slug"][];
};

function getOverlayStateFromLocation(publications: Publication[]) {
  const searchParams = new URLSearchParams(window.location.search);
  const spotlightSlug = searchParams.get("spotlight");

  if (!spotlightSlug) {
    return { spotlightSlug: null, mediaId: null };
  }

  const publication = publications.find((item) => item.slug === spotlightSlug);
  if (!publication) {
    return { spotlightSlug: null, mediaId: null };
  }

  const mediaId = searchParams.get("media");
  const validMediaId =
    mediaId &&
    publication.spotlightMedia?.some((media) => media.id === mediaId)
      ? mediaId
      : null;

  return { spotlightSlug: publication.slug, mediaId: validMediaId };
}

export function PublicationsExperience({
  publications,
  projects,
  selectedPublicationSlugs
}: PublicationsExperienceProps) {
  const [spotlightSlug, setSpotlightSlug] = useState<Publication["slug"] | null>(null);
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const spotlightTriggerRef = useRef<HTMLElement | null>(null);
  const mediaTriggerRef = useRef<HTMLElement | null>(null);

  const selectedPublications = publications.filter((publication) =>
    selectedPublicationSlugs.includes(publication.slug)
  );
  const publicationGroups = groupPublicationsByYear(publications);
  const projectsByPublicationSlug = new Map(
    projects
      .filter(
        (
          project
        ): project is Project & {
          relatedPublicationSlug: NonNullable<Project["relatedPublicationSlug"]>;
        } => Boolean(project.relatedPublicationSlug)
      )
      .map((project) => [project.relatedPublicationSlug, project])
  );
  const datasets = projects.filter((project) => project.category === "dataset");
  const activePublication =
    publications.find((publication) => publication.slug === spotlightSlug) ?? null;
  const activeProject = activePublication
    ? projectsByPublicationSlug.get(activePublication.slug)
    : undefined;

  useEffect(() => {
    const syncFromLocation = () => {
      const nextState = getOverlayStateFromLocation(publications);
      setSpotlightSlug(nextState.spotlightSlug);
      setActiveMediaId(nextState.mediaId);
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);

    return () => window.removeEventListener("popstate", syncFromLocation);
  }, [publications]);

  useEffect(() => {
    const shouldLockScroll = Boolean(spotlightSlug || activeMediaId);
    if (!shouldLockScroll) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [activeMediaId, spotlightSlug]);

  const updateUrl = (nextSpotlightSlug: string | null, nextMediaId: string | null) => {
    const url = new URL(window.location.href);

    if (nextSpotlightSlug) {
      url.searchParams.set("spotlight", nextSpotlightSlug);
    } else {
      url.searchParams.delete("spotlight");
    }

    if (nextSpotlightSlug && nextMediaId) {
      url.searchParams.set("media", nextMediaId);
    } else {
      url.searchParams.delete("media");
    }

    window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
  };

  const openSpotlight = (
    publication: Publication,
    trigger: HTMLElement | null = null
  ) => {
    spotlightTriggerRef.current = trigger;
    setSpotlightSlug(publication.slug);
    setActiveMediaId(null);
    updateUrl(publication.slug, null);
  };

  const closeSpotlight = () => {
    setActiveMediaId(null);
    setSpotlightSlug(null);
    updateUrl(null, null);

    window.requestAnimationFrame(() => {
      spotlightTriggerRef.current?.focus();
    });
  };

  const openMedia = (mediaId: string, trigger: HTMLElement | null = null) => {
    if (!activePublication?.spotlightMedia?.some((media) => media.id === mediaId)) {
      return;
    }

    mediaTriggerRef.current = trigger;
    setActiveMediaId(mediaId);
    updateUrl(activePublication.slug, mediaId);
  };

  const selectMedia = (mediaId: string) => {
    if (!activePublication?.spotlightMedia?.some((media) => media.id === mediaId)) {
      return;
    }

    setActiveMediaId(mediaId);
    updateUrl(activePublication.slug, mediaId);
  };

  const closeMedia = () => {
    if (!activePublication) {
      return;
    }

    setActiveMediaId(null);
    updateUrl(activePublication.slug, null);

    window.requestAnimationFrame(() => {
      mediaTriggerRef.current?.focus();
    });
  };

  return (
    <>
      <section id="selected-publications" className="section-rule">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <SectionHeading eyebrow="Publications" title="Selected Publications" />
          <div className="mt-12">
            {selectedPublications.map((publication, index) => (
              <PublicationFeature
                key={publication.slug}
                publication={publication}
                index={index}
                onOpenSpotlight={openSpotlight}
              />
            ))}
          </div>
        </div>
      </section>

      <section id="publications" className="section-rule">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
          <SectionHeading eyebrow="Publications" title="Publications & Datasets" />
          <div className="mt-12 space-y-12">
            {publicationGroups.map(([year, items]) => (
              <div
                key={year}
                className="grid gap-5 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-8"
              >
                <div className="meta-label pt-1 lg:sticky lg:top-28 lg:self-start">
                  {year}
                </div>
                <ul>
                  {items.map((publication, index) => (
                    <PublicationListItem
                      key={publication.slug}
                      publication={publication}
                      project={projectsByPublicationSlug.get(publication.slug)}
                      index={index}
                      onOpenSpotlight={openSpotlight}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {datasets.length > 0 ? (
            <div className="mt-16 border-t border-line pt-12">
              <h3 className="font-display text-3xl tracking-tight text-ink sm:text-4xl">
                Datasets
              </h3>
              <div className="mt-10">
                {datasets.map((project, index) => (
                  <ProjectHighlight key={project.title} project={project} index={index} />
                ))}
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <AnimatePresence>
        {activePublication ? (
          <PublicationSpotlight
            publication={activePublication}
            project={activeProject}
            onClose={closeSpotlight}
            onOpenMedia={openMedia}
          />
        ) : null}
      </AnimatePresence>

      <AnimatePresence>
        {activePublication && activeMediaId && activePublication.spotlightMedia ? (
          <MediaLightbox
            publicationTitle={activePublication.title}
            mediaItems={activePublication.spotlightMedia}
            activeMediaId={activeMediaId}
            onClose={closeMedia}
            onSelectMedia={selectMedia}
          />
        ) : null}
      </AnimatePresence>
    </>
  );
}
