"use client";

import {
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
  useState
} from "react";
import { ArrowRight } from "lucide-react";

import type { ResearchThread } from "@/src/data/site";
import {
  getResearchThreadHref,
  getResearchThreadTarget,
  type ResearchThreadStage
} from "@/src/lib/research-threads";

type ResearchThreadExperienceProps = {
  threads: ResearchThread[];
  children: ReactNode;
};

function getStageFromHash(hash: string): ResearchThreadStage {
  if (hash.startsWith("#publication-")) {
    return "publication";
  }

  if (hash.startsWith("#study-")) {
    return "study";
  }

  return "interest";
}

function getThreadIds(element: HTMLElement) {
  return (element.dataset.researchThreads ?? "").split(" ").filter(Boolean);
}

export function ResearchThreadExperience({
  threads,
  children
}: ResearchThreadExperienceProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const activeThreadRef = useRef<string | null>(null);
  const explicitThreadRef = useRef<string | null>(null);
  const [activeThreadSlug, setActiveThreadSlug] = useState<string | null>(null);
  const [activeStage, setActiveStage] =
    useState<ResearchThreadStage>("interest");
  const [experienceVisible, setExperienceVisible] = useState(false);
  const validThreadSlugs = useMemo(
    () => new Set(threads.map((thread) => thread.slug)),
    [threads]
  );
  const activeThread =
    threads.find((thread) => thread.slug === activeThreadSlug) ?? null;

  activeThreadRef.current = activeThreadSlug;

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    root.querySelectorAll<HTMLElement>("[data-research-threads]").forEach(
      (element) => {
        const matches = activeThreadSlug
          ? getThreadIds(element).includes(activeThreadSlug)
          : false;

        if (matches) {
          element.dataset.threadActive = "true";
        } else {
          delete element.dataset.threadActive;
        }
      }
    );
  }, [activeThreadSlug]);

  useEffect(() => {
    const syncFromLocation = () => {
      const url = new URL(window.location.href);
      const requestedThread = url.searchParams.get("thread");
      const validRequestedThread =
        requestedThread && validThreadSlugs.has(requestedThread)
          ? requestedThread
          : null;
      explicitThreadRef.current = validRequestedThread;
      activeThreadRef.current = validRequestedThread;
      setActiveThreadSlug(validRequestedThread);
      setActiveStage(getStageFromHash(url.hash));
    };

    syncFromLocation();
    window.addEventListener("popstate", syncFromLocation);
    window.addEventListener("hashchange", syncFromLocation);

    return () => {
      window.removeEventListener("popstate", syncFromLocation);
      window.removeEventListener("hashchange", syncFromLocation);
    };
  }, [validThreadSlugs]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return undefined;
    }

    const handleClick = (event: MouseEvent) => {
      if (
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      ) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Element)) {
        return;
      }

      const link = target.closest<HTMLAnchorElement>("a[data-set-research-thread]");
      const threadSlug = link?.dataset.setResearchThread;
      if (!link || !threadSlug || !validThreadSlugs.has(threadSlug)) {
        return;
      }

      const targetId = link.dataset.threadTarget;
      const stage = link.dataset.threadStage as ResearchThreadStage | undefined;
      if (!targetId || !stage) {
        return;
      }

      event.preventDefault();
      const url = new URL(window.location.href);
      url.searchParams.set("thread", threadSlug);
      url.hash = targetId;
      window.history.pushState({}, "", `${url.pathname}${url.search}${url.hash}`);
      explicitThreadRef.current = threadSlug;
      activeThreadRef.current = threadSlug;
      setActiveThreadSlug(threadSlug);
      setActiveStage(stage);
      document.getElementById(targetId)?.scrollIntoView();
    };

    root.addEventListener("click", handleClick);
    return () => root.removeEventListener("click", handleClick);
  }, [validThreadSlugs]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root || typeof IntersectionObserver === "undefined") {
      return undefined;
    }

    const targetObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || !(entry.target instanceof HTMLElement)) {
            return;
          }

          const element = entry.target;
          const threadIds = getThreadIds(element);
          const primaryThread = element.dataset.primaryResearchThread;
          const stage = element.dataset.threadStage as
            | ResearchThreadStage
            | undefined;

          if (threadIds.length === 0) {
            activeThreadRef.current = null;
            setActiveThreadSlug(null);
            return;
          }

          const currentThread = activeThreadRef.current;
          const explicitThread = explicitThreadRef.current;
          const nextThread =
            explicitThread && threadIds.includes(explicitThread)
              ? explicitThread
              : currentThread && threadIds.includes(currentThread)
              ? currentThread
              : primaryThread && threadIds.includes(primaryThread)
                ? primaryThread
                : threadIds[0];

          activeThreadRef.current = nextThread;
          setActiveThreadSlug(nextThread);
          if (stage) {
            setActiveStage(stage);
          }
        });
      },
      { rootMargin: "-26% 0px -62% 0px", threshold: 0 }
    );

    root
      .querySelectorAll<HTMLElement>("[data-thread-observer]")
      .forEach((target) => targetObserver.observe(target));

    const visibilityObserver = new IntersectionObserver(
      ([entry]) => setExperienceVisible(Boolean(entry?.isIntersecting)),
      { threshold: 0 }
    );
    visibilityObserver.observe(root);

    return () => {
      targetObserver.disconnect();
      visibilityObserver.disconnect();
    };
  }, []);

  return (
    <div ref={rootRef} data-research-thread-experience>
      <section
        id="research-interests"
        className="border-b border-line bg-surface/45"
      >
        <div className="site-container grid gap-8 py-14 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 sm:py-16">
          <h2 className="section-kicker">Research interests</h2>
          <div className="border-t border-line">
            {threads.map((thread) => {
              const active = activeThreadSlug === thread.slug;
              const studyTarget = getResearchThreadTarget(thread, "study");

              return (
                <a
                  key={thread.slug}
                  id={`thread-${thread.slug}`}
                  href={getResearchThreadHref(thread, "study")}
                  aria-current={active ? "location" : undefined}
                  data-thread-control
                  data-research-threads={thread.slug}
                  data-set-research-thread={thread.slug}
                  data-thread-target={studyTarget}
                  data-thread-stage="study"
                  className="group grid gap-2 border-b border-line py-5 transition-[background-color,box-shadow] duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-signal focus-visible:ring-offset-4 focus-visible:ring-offset-surface motion-reduce:transition-none sm:grid-cols-[2rem_15rem_minmax(0,1fr)_auto] sm:items-baseline sm:gap-6"
                  onMouseEnter={() => {
                    activeThreadRef.current = thread.slug;
                    setActiveThreadSlug(thread.slug);
                    setActiveStage("interest");
                  }}
                  onFocus={() => {
                    activeThreadRef.current = thread.slug;
                    setActiveThreadSlug(thread.slug);
                    setActiveStage("interest");
                  }}
                >
                  <span className="font-mono text-[0.62rem] text-signal">
                    {thread.index}
                  </span>
                  <h3 className="font-medium text-ink transition-colors group-hover:text-accent">
                    {thread.title}
                  </h3>
                  <p className="max-w-2xl text-sm leading-7 text-muted sm:text-base">
                    {thread.detail}
                  </p>
                  <span className="inline-flex items-center gap-2 whitespace-nowrap text-xs text-accent">
                    {active ? "Tracing" : thread.study.label}
                    <ArrowRight aria-hidden="true" className="h-3.5 w-3.5" />
                  </span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {children}

      {activeThread && experienceVisible ? (
        <nav
          data-thread-rail
          data-active-thread={activeThread.slug}
          aria-label={`Research thread: ${activeThread.title}`}
          className="fixed top-1/2 z-40 hidden w-28 -translate-y-1/2 2xl:block"
          style={{
            left: "max(1.25rem, calc((100vw - 78rem) / 2 - 8rem))"
          }}
        >
          <p className="font-mono text-[0.58rem] uppercase tracking-[0.1em] text-signal">
            Thread {activeThread.index}
          </p>
          <p className="mt-2 text-xs leading-5 text-ink/72">
            {activeThread.title}
          </p>
          <ol className="mt-4 border-l border-line pl-3">
            {(
              ["interest", "study", "publication"] as ResearchThreadStage[]
            ).map((stage) => {
              const label =
                stage === "interest"
                  ? "Inquiry"
                  : stage === "study"
                    ? activeThread.study.label
                    : activeThread.publication.label;
              const current = activeStage === stage;
              const target = getResearchThreadTarget(activeThread, stage);

              return (
                <li key={stage} className="relative py-2.5">
                  <span
                    aria-hidden="true"
                    className={`absolute -left-[0.965rem] top-[1.05rem] h-1.5 w-1.5 rounded-full border transition-colors motion-reduce:transition-none ${
                      current
                        ? "border-signal bg-signal"
                        : "border-muted/45 bg-paper"
                    }`}
                  />
                  <a
                    href={getResearchThreadHref(activeThread, stage)}
                    aria-current={current ? "location" : undefined}
                    data-research-thread={activeThread.slug}
                    data-thread-link={stage}
                    data-set-research-thread={activeThread.slug}
                    data-thread-target={target}
                    data-thread-stage={stage}
                    className={`block text-xs leading-5 transition-colors motion-reduce:transition-none ${
                      current ? "font-semibold text-ink" : "text-muted hover:text-ink"
                    }`}
                  >
                    {label}
                    {current ? (
                      <span className="mt-0.5 block font-mono text-[0.52rem] uppercase tracking-[0.08em] text-signal">
                        Current
                      </span>
                    ) : null}
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>
      ) : null}
    </div>
  );
}
