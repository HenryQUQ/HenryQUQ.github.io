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
              I want AI systems to understand images without making every decision
              invisible to people. These two projects show how I approach that
              question from image representation and from richer, multi-view data.
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
                className="border-b border-line py-12 last:border-b-0 last:pb-0 lg:py-16"
              >
                <header className="max-w-4xl">
                  <p className="meta-label">{study.eyebrow}</p>
                  <h3 className="mt-3 font-display text-[clamp(2.5rem,5vw,4.25rem)] font-normal leading-[0.98] tracking-[-0.025em] text-ink">
                    {study.title}
                  </h3>
                  <p className="mt-5 max-w-3xl text-lg leading-8 text-ink/84">
                    {study.thesis}
                  </p>
                </header>

                <div className="mt-8 grid gap-9 lg:grid-cols-[minmax(0,0.96fr)_minmax(0,1.04fr)] lg:gap-14">
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

                  <div>
                    <div
                      data-case-study-takeaway={study.slug}
                      className="max-w-2xl border-l-2 border-signal pl-4"
                    >
                      <p className="meta-label text-signal">Main idea</p>
                      <p className="mt-2 text-base leading-7 text-ink/84">
                        {study.takeaway}
                      </p>
                    </div>

                    <dl className="mt-7 space-y-5 border-t border-line pt-6 text-sm leading-7 sm:text-base">
                      <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                        <dt className="font-medium text-ink">Question</dt>
                        <dd className="text-muted">{study.challenge}</dd>
                      </div>
                      <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                        <dt className="font-medium text-ink">My role</dt>
                        <dd className="text-muted">{study.contribution}</dd>
                      </div>
                      <div className="grid gap-1 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                        <dt className="font-medium text-ink">Where published</dt>
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
                </div>

                {relatedThreads.length > 0 ? (
                  <nav
                    data-thread-context="study"
                    aria-label={`Research threads related to ${study.title}`}
                    className="mt-8 border-t border-line pt-6"
                  >
                    <div className="grid gap-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                      <p className="meta-label pt-0.5">Related questions</p>
                      <div className="flex flex-col items-start gap-2 sm:flex-row sm:flex-wrap sm:gap-x-5">
                        {relatedThreads.map((thread) => {
                          const target = getResearchThreadTarget(
                            thread,
                            "interest"
                          );
                          return (
                            <a
                              key={thread.slug}
                              href={getResearchThreadHref(thread, "interest")}
                              data-set-research-thread={thread.slug}
                              data-thread-target={target}
                              data-thread-stage="interest"
                              className="text-sm leading-6 text-ink/76 underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent"
                            >
                              {thread.index} {thread.title}
                            </a>
                          );
                        })}
                      </div>
                    </div>
                    {primaryThread ? (
                      <div className="mt-4 grid gap-3 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-5">
                        <p className="meta-label pt-0.5">Publication</p>
                        <a
                          href={getResearchThreadHref(
                            primaryThread,
                            "publication"
                          )}
                          data-set-research-thread={primaryThread.slug}
                          data-thread-target={getResearchThreadTarget(
                            primaryThread,
                            "publication"
                          )}
                          data-thread-stage="publication"
                          className="w-fit text-sm leading-6 text-signal underline decoration-signal/25 underline-offset-4"
                        >
                          {primaryThread.publication.label}
                        </a>
                      </div>
                    ) : null}
                  </nav>
                ) : null}
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
