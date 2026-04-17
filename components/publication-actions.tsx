"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";

import { Publication } from "@/src/data/site";
import { getPublicationDoiUrl } from "@/src/lib/publications";

import { TextLink } from "./text-link";

type PublicationActionsProps = {
  publication: Publication;
  idPrefix: string;
  showSpotlightButton?: boolean;
  onOpenSpotlight?: (trigger: HTMLButtonElement | null) => void;
};

export function PublicationActions({
  publication,
  idPrefix,
  showSpotlightButton = true,
  onOpenSpotlight
}: PublicationActionsProps) {
  const reducedMotion = useReducedMotion();
  const [supportsHover, setSupportsHover] = useState(false);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [toastOpen, setToastOpen] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);
  const bibtexId = `${idPrefix}-bibtex`;
  const citationPreviewId = `${idPrefix}-citation-preview`;

  useEffect(() => {
    if (typeof window === "undefined" || !window.matchMedia) {
      return undefined;
    }

    const mediaQuery = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setSupportsHover(mediaQuery.matches);

    sync();

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener("change", sync);
      return () => mediaQuery.removeEventListener("change", sync);
    }

    mediaQuery.addListener(sync);
    return () => mediaQuery.removeListener(sync);
  }, []);

  useEffect(() => {
    if (!toastOpen) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setToastOpen(false), 3200);
    return () => window.clearTimeout(timeoutId);
  }, [toastOpen]);

  async function handleCopyCitation() {
    try {
      if (navigator.clipboard?.writeText) {
        await navigator.clipboard.writeText(publication.citationText);
      } else {
        const textArea = document.createElement("textarea");
        textArea.value = publication.citationText;
        textArea.setAttribute("readonly", "true");
        textArea.style.position = "absolute";
        textArea.style.left = "-9999px";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
      }

      setPreviewOpen(false);
      setToastOpen(true);
    } catch {
      setToastOpen(false);
    }
  }

  return (
    <>
      <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 sm:gap-x-5">
        {showSpotlightButton ? (
          <button
            type="button"
            className="group inline-flex items-center gap-1.5 text-sm text-ink/82 hover:text-ink"
            aria-label={`Open spotlight for ${publication.title}`}
            onClick={(event) => onOpenSpotlight?.(event.currentTarget)}
          >
            <span className="border-b border-transparent pb-px group-hover:border-current">
              Spotlight
            </span>
          </button>
        ) : null}
        {publication.links.map((link) => (
          <TextLink
            key={`${publication.slug}-${link.kind}-${link.label}`}
            href={link.href}
            external={link.external ?? true}
          >
            {link.label}
          </TextLink>
        ))}
        {publication.doi ? (
          <TextLink href={getPublicationDoiUrl(publication.doi)}>DOI</TextLink>
        ) : null}
        <div
          className="relative inline-flex"
          onMouseEnter={() => {
            if (supportsHover) {
              setPreviewOpen(true);
            }
          }}
          onMouseLeave={() => {
            if (supportsHover) {
              setPreviewOpen(false);
            }
          }}
        >
          <button
            type="button"
            className="group inline-flex items-center gap-1.5 text-sm text-ink/82 hover:text-ink"
            aria-label={`Copy citation for ${publication.title}`}
            aria-describedby={previewOpen ? citationPreviewId : undefined}
            onFocus={() => {
              if (supportsHover) {
                setPreviewOpen(true);
              }
            }}
            onBlur={() => {
              if (supportsHover) {
                setPreviewOpen(false);
              }
            }}
            onClick={() => {
              void handleCopyCitation();
            }}
          >
            <span className="border-b border-transparent pb-px group-hover:border-current">
              Copy citation
            </span>
          </button>

          <AnimatePresence>
            {previewOpen ? (
              <motion.div
                id={citationPreviewId}
                data-citation-preview={publication.slug}
                initial={reducedMotion ? false : { opacity: 0, y: 6, scale: 0.985 }}
                animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
                exit={reducedMotion ? undefined : { opacity: 0, y: 4, scale: 0.985 }}
                transition={{ duration: 0.16, ease: [0.22, 1, 0.36, 1] }}
                className="pointer-events-none absolute left-0 top-full z-20 mt-3 w-[min(28rem,calc(100vw-3rem))] rounded-[1rem] border border-line/90 bg-paper/96 p-4 text-left shadow-[0_18px_36px_rgba(29,32,28,0.16)] backdrop-blur-sm"
              >
                <p className="meta-label text-accent">Will copy citation text</p>
                <p className="mt-3 text-sm leading-7 text-ink/84">
                  {publication.citationText}
                </p>
              </motion.div>
            ) : null}
          </AnimatePresence>
        </div>
        <button
          type="button"
          className="group inline-flex items-center gap-1.5 text-sm text-ink/82 hover:text-ink"
          aria-controls={bibtexId}
          aria-expanded={showBibtex}
          onClick={() => setShowBibtex((current) => !current)}
        >
          <span className="border-b border-transparent pb-px group-hover:border-current">
            {showBibtex ? "Hide BibTeX" : "BibTeX"}
          </span>
        </button>
      </div>
      {showBibtex ? (
        <pre
          id={bibtexId}
          className="mt-4 overflow-x-auto rounded-[1.15rem] border border-line/90 bg-stone/40 p-4 text-[0.78rem] leading-6 text-ink/82 sm:text-[0.82rem]"
        >
          <code>{publication.bibtex}</code>
        </pre>
      ) : null}
      <AnimatePresence>
        {toastOpen ? (
          <motion.div
            aria-live="polite"
            role="status"
            data-citation-toast={publication.slug}
            initial={reducedMotion ? false : { opacity: 0, y: 14, scale: 0.985 }}
            animate={reducedMotion ? undefined : { opacity: 1, y: 0, scale: 1 }}
            exit={reducedMotion ? undefined : { opacity: 0, y: 12, scale: 0.985 }}
            transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-x-4 bottom-4 z-[110] rounded-[1.1rem] border border-line/90 bg-paper/96 p-4 shadow-[0_18px_40px_rgba(29,32,28,0.16)] backdrop-blur-sm sm:left-auto sm:right-5 sm:w-[min(28rem,calc(100vw-2.5rem))]"
          >
            <p className="meta-label text-accent">Citation copied to clipboard</p>
            <p className="mt-3 text-sm leading-7 text-ink/84">
              {publication.citationText}
            </p>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
