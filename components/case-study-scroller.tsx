import { ResearchFigure } from "@/components/research-figure";
import type { CaseStudy, ResearchThread } from "@/src/data/site";
import {
  getResearchThreadHref,
  getResearchThreadTarget,
  getResearchThreadsForStudy
} from "@/src/lib/research-threads";

import { TextLink } from "./text-link";

type CaseStudyScrollerProps = {
  studies: CaseStudy[];
  researchThreads: ResearchThread[];
};

export function CaseStudyScroller({
  studies,
  researchThreads
}: CaseStudyScrollerProps) {
  return (
    <section id="work" className="border-t border-line bg-paper">
      <div className="site-container section-shell">
        <header className="grid gap-5 border-b border-line pb-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:pb-12">
          <p className="section-kicker">Research</p>
          <div>
            <h2 className="section-title">Selected research</h2>
            <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
              Two recent projects on interpretable image representation and multimodal scene understanding. The complete publication list follows below.
            </p>
          </div>
        </header>

        <div>
          {studies.map((study, index) => {
            const relatedThreads = getResearchThreadsForStudy(
              researchThreads,
              study.slug
            );
            const primaryThread =
              relatedThreads.find((thread) => thread.inferFromTarget) ??
              relatedThreads[0];

            return (
              <article
              key={study.slug}
              id={`study-${study.slug}`}
              data-case-study={study.slug}
              data-thread-observer
              data-thread-target={`study-${study.slug}`}
              data-thread-stage="study"
              data-research-threads={relatedThreads
                .map((thread) => thread.slug)
                .join(" ")}
              data-primary-research-thread={primaryThread?.slug}
              className="grid gap-8 border-b border-line py-12 transition-[background-color,box-shadow] duration-200 last:border-b-0 last:pb-0 motion-reduce:transition-none lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.08fr)] lg:gap-14 lg:py-16"
            >
              <figure>
                <ResearchFigure
                  src={study.media.src}
                  alt={study.media.alt}
                  label={`${study.title} overview`}
                  width={study.media.width}
                  height={study.media.height}
                  fit={study.media.fit}
                  priority={index === 0}
                  researchLens={study.media.lens}
                />
                <figcaption className="mt-3 flex items-center justify-between gap-4 font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted">
                  <span>{study.context}</span>
                  <span>{study.year}</span>
                </figcaption>
              </figure>

              <div className="lg:pt-1">
                {relatedThreads.length > 0 ? (
                  <nav
                    data-thread-context="study"
                    aria-label={`Research threads related to ${study.title}`}
                    className="mb-6 border-b border-line pb-5"
                  >
                    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-2">
                      <p className="meta-label">Related inquiry</p>
                      {relatedThreads.map((thread) => {
                        const target = getResearchThreadTarget(thread, "interest");
                        return (
                          <a
                            key={thread.slug}
                            href={getResearchThreadHref(thread, "interest")}
                            data-set-research-thread={thread.slug}
                            data-thread-target={target}
                            data-thread-stage="interest"
                            className="text-xs text-ink/76 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent"
                          >
                            {thread.index} {thread.title}
                          </a>
                        );
                      })}
                    </div>
                    {primaryThread ? (
                      <p className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[0.6rem] uppercase tracking-[0.08em] text-muted">
                        <span>Inquiry</span>
                        <span aria-hidden="true">→</span>
                        <span className="text-ink" aria-current="location">
                          {study.title}
                        </span>
                        <span aria-hidden="true">→</span>
                        <a
                          href={getResearchThreadHref(primaryThread, "publication")}
                          data-set-research-thread={primaryThread.slug}
                          data-thread-target={getResearchThreadTarget(
                            primaryThread,
                            "publication"
                          )}
                          data-thread-stage="publication"
                          className="text-signal underline decoration-signal/25 underline-offset-4"
                        >
                          {primaryThread.publication.label}
                        </a>
                      </p>
                    ) : null}
                  </nav>
                ) : null}
                <p className="meta-label">{study.eyebrow}</p>
                <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink">
                  {study.title}
                </h3>
                <p className="mt-6 max-w-2xl text-lg leading-8 text-ink/84">
                  {study.thesis}
                </p>

                <div
                  data-case-study-takeaway={study.slug}
                  className="mt-7 max-w-2xl border-l-2 border-signal pl-4"
                >
                  <p className="meta-label text-signal">Takeaway</p>
                  <p className="mt-2 text-base leading-7 text-ink/84">
                    {study.takeaway}
                  </p>
                </div>

                <dl className="mt-8 space-y-5 border-t border-line pt-6 text-sm leading-7 sm:text-base">
                  <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                    <dt className="font-medium text-ink">Question</dt>
                    <dd className="text-muted">{study.challenge}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                    <dt className="font-medium text-ink">My role</dt>
                    <dd className="text-muted">{study.contribution}</dd>
                  </div>
                  <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                    <dt className="font-medium text-ink">Publication</dt>
                    <dd className="text-muted">{study.outcome}</dd>
                  </div>
                </dl>

                <div className="mt-6 flex flex-wrap gap-x-5 gap-y-1">
                  {study.links.map((link) => (
                    <TextLink
                      key={`${study.slug}-${link.label}`}
                      href={link.href}
                      external={link.external ?? true}
                    >
                      {link.label}
                    </TextLink>
                  ))}
                </div>
              </div>
            </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
