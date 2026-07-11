"use client";

import { type RefObject, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";

import type { PublicationMedia, ResearchLens } from "@/src/data/site";
import { withBasePath } from "@/src/lib/site-config";

type ResearchLensPanelProps = {
  media: PublicationMedia;
  lens: ResearchLens;
  publicationTitle: string;
  closeButtonRef: RefObject<HTMLButtonElement>;
  onClose: () => void;
};

export function ResearchLensPanel({
  media,
  lens,
  publicationTitle,
  closeButtonRef,
  onClose
}: ResearchLensPanelProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const tabRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const activeStep = lens.steps[activeIndex] ?? lens.steps[0];

  useEffect(() => {
    setActiveIndex(0);
  }, [media.id]);

  if (!activeStep) {
    return null;
  }

  const activeStepNumber = String(activeIndex + 1).padStart(2, "0");

  const selectAndFocus = (nextIndex: number) => {
    const normalizedIndex = (nextIndex + lens.steps.length) % lens.steps.length;
    setActiveIndex(normalizedIndex);
    tabRefs.current[normalizedIndex]?.focus();
  };

  const handleTabKeyDown = (
    event: React.KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      selectAndFocus(index + 1);
      return;
    }

    if (event.key === "ArrowLeft") {
      event.preventDefault();
      selectAndFocus(index - 1);
      return;
    }

    if (event.key === "Home") {
      event.preventDefault();
      selectAndFocus(0);
      return;
    }

    if (event.key === "End") {
      event.preventDefault();
      selectAndFocus(lens.steps.length - 1);
    }
  };

  return (
    <div
      data-research-lens={lens.id}
      data-active-lens-step={activeStep.id}
      data-lightbox-media-id={media.id}
      data-lightbox-media-kind={media.kind}
      className="relative flex max-h-[calc(100svh-2rem)] w-full max-w-[90rem] flex-col overflow-hidden rounded-[0.55rem] border border-white/15 bg-paper text-ink shadow-[0_24px_72px_rgba(0,0,0,0.24)] sm:max-h-[calc(100svh-3rem)]"
      onClick={(event) => event.stopPropagation()}
    >
      <header className="flex items-start justify-between gap-4 border-b border-line px-4 py-4 sm:px-6 sm:py-5">
        <div className="min-w-0">
          <p className="meta-label text-signal">
            Figure explorer · {activeStepNumber}/
            {String(lens.steps.length).padStart(2, "0")}
          </p>
          <h2
            id={`lightbox-title-${media.id}`}
            className="mt-2 truncate font-display text-2xl font-normal text-ink sm:text-[2rem]"
          >
            {publicationTitle}
          </h2>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <a
            href={withBasePath(media.src)}
            target="_blank"
            rel="noreferrer"
            className="hidden min-h-11 items-center gap-2 border-b border-transparent px-2 text-sm text-ink/76 transition-colors hover:border-ink/30 hover:text-ink sm:inline-flex"
          >
            Original
            <ArrowUpRight aria-hidden="true" className="h-3.5 w-3.5" />
          </a>
          <button
            ref={closeButtonRef}
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line text-ink/78 transition-colors hover:border-ink/30 hover:text-ink"
            aria-label={`Close figure explorer for ${publicationTitle}`}
            onClick={onClose}
          >
            <X aria-hidden="true" className="h-4 w-4" />
          </button>
        </div>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="bg-stone/38 p-3 sm:p-5 lg:p-6">
          <div
            className="relative mx-auto w-full max-w-[78rem] overflow-hidden border border-line bg-white"
            style={{ aspectRatio: `${media.width} / ${media.height}` }}
          >
            <Image
              src={withBasePath(media.src)}
              alt={media.alt}
              fill
              priority
              sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1536px) calc(100vw - 6rem), 78rem"
              className="object-contain"
            />
            <div
              aria-hidden="true"
              data-lens-shade="active-regions"
              className="pointer-events-none absolute inset-0 z-[5] bg-ink/30"
            />
            {activeStep.regions.map((region, regionIndex) => {
              const right = Math.max(
                0,
                100 - region.x - region.width
              );
              const bottom = Math.max(
                0,
                100 - region.y - region.height
              );

              return (
                <Image
                  key={`${activeStep.id}-focus-${regionIndex}`}
                  src={withBasePath(media.src)}
                  alt=""
                  aria-hidden="true"
                  fill
                  sizes="(max-width: 640px) calc(100vw - 2.5rem), (max-width: 1536px) calc(100vw - 6rem), 78rem"
                  className="pointer-events-none z-[6] object-contain"
                  style={{
                    clipPath: `inset(${region.y}% ${right}% ${bottom}% ${region.x}%)`
                  }}
                />
              );
            })}
            {activeStep.regions.map((region, regionIndex) => (
              <div
                key={`${activeStep.id}-${regionIndex}`}
                aria-hidden="true"
                data-lens-region={activeStep.id}
                data-lens-region-index={regionIndex}
                className="pointer-events-none absolute z-10 border-2 border-signal"
                style={{
                  left: `${region.x}%`,
                  top: `${region.y}%`,
                  width: `${region.width}%`,
                  height: `${region.height}%`
                }}
              >
                <span
                  className={`absolute -left-px inline-flex min-h-5 min-w-5 items-center justify-center bg-signal px-1 font-mono text-[0.58rem] font-semibold text-white ${
                    activeStep.regions.length > 1
                      ? "top-full"
                      : "-top-px -translate-y-full"
                  }`}
                >
                  {activeStepNumber}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-line bg-paper">
          <div
            role="tablist"
            aria-label={lens.label}
            className="flex min-h-14 overflow-x-auto border-b border-line"
          >
            {lens.steps.map((step, index) => {
              const selected = index === activeIndex;
              return (
                <button
                  key={step.id}
                  ref={(element) => {
                    tabRefs.current[index] = element;
                  }}
                  id={`lens-tab-${media.id}-${step.id}`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={`lens-panel-${media.id}-${step.id}`}
                  tabIndex={selected ? 0 : -1}
                  data-lens-step={step.id}
                  className={`flex min-h-14 shrink-0 items-center gap-2 border-r border-line px-4 text-left text-sm transition-colors motion-reduce:transition-none sm:min-h-16 sm:px-5 ${
                    selected
                      ? "bg-signal-soft text-ink"
                      : "bg-paper text-muted hover:bg-surface/60 hover:text-ink"
                  }`}
                  onClick={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleTabKeyDown(event, index)}
                >
                  <span className="font-mono text-[0.6rem] text-signal">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="whitespace-nowrap font-medium">{step.label}</span>
                </button>
              );
            })}
          </div>

          {lens.steps.map((step, index) => {
            const selected = index === activeIndex;
            return (
              <div
                key={step.id}
                id={`lens-panel-${media.id}-${step.id}`}
                role="tabpanel"
                aria-labelledby={`lens-tab-${media.id}-${step.id}`}
                data-lens-note={step.id}
                tabIndex={selected ? 0 : -1}
                hidden={!selected}
                className={`${selected ? "grid" : "hidden"} min-h-[7.5rem] gap-3 px-4 py-5 focus-visible:outline-none sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-6 sm:px-6 sm:py-6`}
              >
                <div>
                  <p className="meta-label">
                    Active region{step.regions.length > 1 ? "s" : ""}
                  </p>
                  <p className="mt-2 font-medium text-ink">
                    {step.focusLabel ?? step.label}
                  </p>
                </div>
                <div>
                  <p className="max-w-3xl text-base leading-7 text-ink/84">
                    {step.note}
                  </p>
                  <p className="mt-2 text-xs text-muted">
                    Focus a label or use the left and right arrow keys to inspect the figure.
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
