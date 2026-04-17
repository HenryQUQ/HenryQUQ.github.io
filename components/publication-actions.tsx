"use client";

import { useEffect, useState } from "react";

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
  const [copied, setCopied] = useState(false);
  const [showBibtex, setShowBibtex] = useState(false);
  const bibtexId = `${idPrefix}-bibtex`;

  useEffect(() => {
    if (!copied) {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => setCopied(false), 1600);
    return () => window.clearTimeout(timeoutId);
  }, [copied]);

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

      setCopied(true);
    } catch {
      setCopied(false);
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
        <button
          type="button"
          className="group inline-flex items-center gap-1.5 text-sm text-ink/82 hover:text-ink"
          aria-label={`Copy citation for ${publication.title}`}
          onClick={() => {
            void handleCopyCitation();
          }}
        >
          <span className="border-b border-transparent pb-px group-hover:border-current">
            {copied ? "Copied" : "Copy citation"}
          </span>
        </button>
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
    </>
  );
}
