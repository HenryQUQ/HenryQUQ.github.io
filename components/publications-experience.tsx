"use client";

import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { AnimatePresence } from "framer-motion";

import { PublicationListItem } from "@/components/publication-list-item";
import { PublicationSpotlight } from "@/components/publication-spotlight";
import { TextLink } from "@/components/text-link";
import {
  Project,
  Publication,
  ResearchThread
} from "@/src/data/site";
import { groupPublicationsByYear } from "@/src/lib/publications";
import { getResearchThreadsForPublication } from "@/src/lib/research-threads";

const MediaLightbox = dynamic(
  () => import("./media-lightbox").then((module) => module.MediaLightbox),
  { ssr: false }
);

type PublicationsExperienceProps = {
  publications: Publication[];
  projects: Project[];
  researchThreads: ResearchThread[];
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
  researchThreads
}: PublicationsExperienceProps) {
  const [spotlightSlug, setSpotlightSlug] = useState<Publication["slug"] | null>(null);
  const [activeMediaId, setActiveMediaId] = useState<string | null>(null);
  const spotlightTriggerRef = useRef<HTMLElement | null>(null);
  const spotlightReturnSlugRef = useRef<string | null>(null);
  const spotlightFocusFrameRef = useRef<number | null>(null);
  const mediaTriggerRef = useRef<HTMLElement | null>(null);

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
  const standaloneDatasets = projects.filter(
    (project) => project.category === "dataset" && !project.relatedPublicationSlug
  );
  const activePublication =
    publications.find((publication) => publication.slug === spotlightSlug) ?? null;
  const activeProject = activePublication
    ? projectsByPublicationSlug.get(activePublication.slug)
    : undefined;

  const restoreSpotlightFocus = () => {
    if (spotlightFocusFrameRef.current !== null) {
      window.cancelAnimationFrame(spotlightFocusFrameRef.current);
    }

    let attemptsRemaining = 45;
    const attemptFocus = () => {
      const fallbackSelector = spotlightReturnSlugRef.current
        ? `[data-open-publication-spotlight="${spotlightReturnSlugRef.current}"]`
        : null;
      const trigger =
        spotlightTriggerRef.current ??
        (fallbackSelector
          ? document.querySelector<HTMLElement>(fallbackSelector)
          : null);

      if (!trigger?.isConnected) {
        spotlightFocusFrameRef.current = null;
        return;
      }

      if (!trigger.closest("[inert]")) {
        trigger.focus({ preventScroll: true });
        spotlightFocusFrameRef.current = null;
        return;
      }

      attemptsRemaining -= 1;
      if (attemptsRemaining > 0) {
        spotlightFocusFrameRef.current = window.requestAnimationFrame(attemptFocus);
      } else {
        spotlightFocusFrameRef.current = null;
      }
    };

    spotlightFocusFrameRef.current = window.requestAnimationFrame(attemptFocus);
  };

  useEffect(
    () => () => {
      if (spotlightFocusFrameRef.current !== null) {
        window.cancelAnimationFrame(spotlightFocusFrameRef.current);
      }
    },
    []
  );

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

  const updateUrl = (
    nextSpotlightSlug: string | null,
    nextMediaId: string | null,
    mode: "push" | "replace" = "push"
  ) => {
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

    const nextUrl = `${url.pathname}${url.search}${url.hash}`;
    if (mode === "replace") {
      window.history.replaceState({}, "", nextUrl);
    } else {
      window.history.pushState({}, "", nextUrl);
    }
  };

  const openSpotlight = (
    publication: Publication,
    trigger: HTMLElement | null = null
  ) => {
    spotlightTriggerRef.current = trigger;
    spotlightReturnSlugRef.current = publication.slug;
    setSpotlightSlug(publication.slug);
    setActiveMediaId(null);
    updateUrl(publication.slug, null);
  };

  const closeSpotlight = () => {
    setActiveMediaId(null);
    setSpotlightSlug(null);
    updateUrl(null, null, "replace");
    restoreSpotlightFocus();
  };

  const openMedia = (mediaId: string, trigger: HTMLElement | null = null) => {
    if (!activePublication?.spotlightMedia?.some((media) => media.id === mediaId)) {
      return;
    }

    mediaTriggerRef.current = trigger;
    setActiveMediaId(mediaId);
    updateUrl(activePublication.slug, mediaId, "replace");
  };

  const selectMedia = (mediaId: string) => {
    if (!activePublication?.spotlightMedia?.some((media) => media.id === mediaId)) {
      return;
    }

    setActiveMediaId(mediaId);
    updateUrl(activePublication.slug, mediaId, "replace");
  };

  const closeMedia = () => {
    if (!activePublication) {
      return;
    }

    setActiveMediaId(null);
    updateUrl(activePublication.slug, null, "replace");

    window.requestAnimationFrame(() => {
      if (mediaTriggerRef.current?.isConnected) {
        mediaTriggerRef.current.focus();
        return;
      }

      document
        .querySelector<HTMLButtonElement>("[data-spotlight-close]")
        ?.focus();
    });
  };

  return (
    <>
      <section id="research" className="border-t border-line bg-paper">
        <div className="site-container section-shell">
          <header className="grid gap-5 border-b border-line pb-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:pb-12">
            <p className="section-kicker">Papers &amp; datasets</p>
            <div>
              <h2 className="section-title">Publications</h2>
              <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                My peer-reviewed papers, with the code, datasets, figures, talks,
                and citation details available for anyone who wants to go deeper.
              </p>
            </div>
          </header>

          <div className="mt-14 space-y-14">
            {publicationGroups.map(([year, items]) => (
              <div
                key={year}
                className="grid gap-5 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-10"
              >
                <div className="font-mono text-xs text-signal lg:sticky lg:top-28 lg:self-start">
                  {year}
                </div>
                <ul>
                  {items.map((publication, index) => (
                    <PublicationListItem
                      key={publication.slug}
                      publication={publication}
                      project={projectsByPublicationSlug.get(publication.slug)}
                      researchThreads={getResearchThreadsForPublication(
                        researchThreads,
                        publication.slug
                      )}
                      index={index}
                      onOpenSpotlight={openSpotlight}
                    />
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {standaloneDatasets.length > 0 ? (
            <div className="mt-20 border-t border-line pt-10">
              <div className="grid gap-8 lg:grid-cols-[7rem_minmax(0,1fr)] lg:gap-10">
                <p className="section-kicker pt-1">Datasets</p>
                <div className="border-t border-line">
                  {standaloneDatasets.map((project) => (
                    <article key={project.title} className="grid gap-4 border-b border-line py-6 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-6">
                      <p className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
                        {project.year}
                      </p>
                      <div>
                        <h3 className="font-display text-2xl font-normal sm:text-[1.75rem]">{project.title}</h3>
                        <p className="mt-3 max-w-2xl text-sm leading-7 text-muted">{project.summary}</p>
                        <div className="mt-4 flex flex-wrap gap-x-5 gap-y-1">
                          {project.links.map((link) => (
                            <TextLink
                              key={`${project.title}-${link.label}`}
                              href={link.href}
                              external={link.external ?? true}
                            >
                              {link.label}
                            </TextLink>
                          ))}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </div>
          ) : null}
        </div>
      </section>

      <AnimatePresence onExitComplete={restoreSpotlightFocus}>
        {activePublication ? (
          <PublicationSpotlight
            publication={activePublication}
            project={activeProject}
            isObscured={Boolean(activeMediaId)}
            onClose={closeSpotlight}
            onOpenMedia={openMedia}
          />
        ) : null}
      </AnimatePresence>

      {activePublication && activeMediaId && activePublication.spotlightMedia ? (
        <MediaLightbox
          publicationTitle={activePublication.title}
          mediaItems={activePublication.spotlightMedia}
          activeMediaId={activeMediaId}
          onClose={closeMedia}
          onSelectMedia={selectMedia}
        />
      ) : null}
    </>
  );
}
