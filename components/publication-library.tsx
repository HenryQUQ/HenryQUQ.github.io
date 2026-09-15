"use client";

import Image from "next/image";
import { useEffect } from "react";
import { ArrowUpRight, Plus } from "lucide-react";
import { paperIntroductions, publications, projects } from "@/src/data/site";
import { withBasePath } from "@/src/lib/site-config";
import { LinkedAuthors } from "./linked-authors";
import { PublicationActions } from "./publication-actions";
import { PaperPreview } from "./paper-preview";
import { paperVisuals } from "@/src/data/paper-visuals";

export function PublicationLibrary() {
  useEffect(() => {
    const openSharedPaper = (includeLegacyQuery = false) => {
      const url = new URL(window.location.href);
      const slug = url.hash.startsWith("#publication-")
        ? url.hash.slice(13)
        : includeLegacyQuery
          ? url.searchParams.get("spotlight")
          : null;
      if (!slug || !publications.some((paper) => paper.slug === slug)) return;
      const detail = document.getElementById(
        `publication-${slug}`,
      ) as HTMLDetailsElement | null;
      if (detail) {
        detail.open = true;
        requestAnimationFrame(() => detail.scrollIntoView({ block: "start" }));
      }
    };
    const onHashChange = () => openSharedPaper();
    openSharedPaper(true);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  return (
    <div className="publication-library" id="papers">
      <div className="library-heading">
        <h3>A little more reading.</h3>
        <span>
          {Math.min(...publications.map((paper) => paper.year))} —{" "}
          {Math.max(...publications.map((paper) => paper.year))}
        </span>
      </div>
      {publications.map((paper) => (
        <details
          key={paper.slug}
          id={`publication-${paper.slug}`}
          className="publication-row"
          data-publication-slug={paper.slug}
        >
          <summary>
            <PaperPreview slug={paper.slug} />
            <span className="paper-heading">
              <span className="paper-venue">
                {paper.year} <span aria-hidden="true">·</span>{" "}
                {paper.shortVenue}
                {paper.recognition ? " · Oral" : ""}
              </span>
              <strong>{paperIntroductions[paper.slug].name}</strong>
              <span className="paper-introduction">
                {paperIntroductions[paper.slug].title}
              </span>
              <span className="paper-preview-caption">
                {paperVisuals[paper.slug]?.caption}
              </span>
            </span>
            <Plus className="disclosure-icon" size={19} aria-hidden="true" />
          </summary>
          <div className="publication-detail">
            <div className="paper-reading-grid">
              <div className="paper-reading-copy">
                <h4>{paper.title}</h4>
                <LinkedAuthors publication={paper} className="paper-authors" />
                <p className="paper-abstract">{paper.abstract}</p>
                <PublicationActions publication={paper} />
              </div>
              {paper.spotlightMedia?.[0]?.kind === "figure" && (
                <figure className="paper-overview">
                  <a
                    href={withBasePath(paper.spotlightMedia[0].src)}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <Image
                      src={withBasePath(paper.spotlightMedia[0].src)}
                      width={paper.spotlightMedia[0].width}
                      height={paper.spotlightMedia[0].height}
                      alt={paper.spotlightMedia[0].alt}
                      sizes="(max-width: 759px) 90vw, 42vw"
                    />
                    <span>
                      {paper.spotlightMedia[0].label}{" "}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </span>
                  </a>
                </figure>
              )}
            </div>
            {(paper.spotlightMedia?.length ?? 0) > 1 && (
              <details className="paper-media">
                <summary>
                  Posters &amp; presentation{" "}
                  <Plus size={15} aria-hidden="true" />
                </summary>
                <div className="paper-media-grid">
                  {paper.spotlightMedia?.slice(1).map((media) =>
                    media.kind === "video" ? (
                      <div key={media.id}>
                        <video
                          controls
                          preload="none"
                          poster={
                            media.posterSrc
                              ? withBasePath(media.posterSrc)
                              : undefined
                          }
                          aria-label={media.label}
                        >
                          <source
                            src={withBasePath(media.src)}
                            type="video/mp4"
                          />
                          <a href={media.src}>Watch {media.label}</a>
                        </video>
                        <p>{media.label}</p>
                      </div>
                    ) : (
                      <a
                        key={media.id}
                        href={withBasePath(media.src)}
                        target="_blank"
                        rel="noreferrer"
                      >
                        <Image
                          src={withBasePath(media.src)}
                          width={media.width}
                          height={media.height}
                          alt={media.alt}
                          sizes="(max-width: 760px) 85vw, 35vw"
                        />
                        <span>{media.label} ↗</span>
                      </a>
                    ),
                  )}
                </div>
              </details>
            )}
          </div>
        </details>
      ))}
      <div className="open-resources">
        <p>Shared along the way</p>
        {projects
          .filter((project) => !project.relatedPublicationSlug)
          .map((project) => (
            <div key={project.title}>
              <a href={project.links[0].href} target="_blank" rel="noreferrer">
                {project.title}
                <span aria-hidden="true">↗</span>
              </a>
              <p>{project.summary}</p>
              {project.links.slice(1).map((link) => (
                <a
                  className="resource-secondary"
                  key={link.href}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  {link.label} ↗
                </a>
              ))}
            </div>
          ))}
      </div>
    </div>
  );
}
