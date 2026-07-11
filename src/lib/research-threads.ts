import type { ResearchThread } from "@/src/data/site";
import { withBasePath } from "@/src/lib/site-config";

export type ResearchThreadStage = "interest" | "study" | "publication";

export function getResearchThreadTarget(
  thread: ResearchThread,
  stage: ResearchThreadStage
) {
  if (stage === "study") {
    return `study-${thread.study.slug}`;
  }

  if (stage === "publication") {
    return `publication-${thread.publication.slug}`;
  }

  return `thread-${thread.slug}`;
}

export function getResearchThreadHref(
  thread: ResearchThread,
  stage: ResearchThreadStage
) {
  const target = getResearchThreadTarget(thread, stage);
  return `${withBasePath("/")}?thread=${encodeURIComponent(thread.slug)}#${target}`;
}

export function getResearchThreadsForStudy(
  threads: ResearchThread[],
  studySlug: string
) {
  return threads.filter((thread) => thread.study.slug === studySlug);
}

export function getResearchThreadsForPublication(
  threads: ResearchThread[],
  publicationSlug: string
) {
  return threads.filter(
    (thread) => thread.publication.slug === publicationSlug
  );
}
