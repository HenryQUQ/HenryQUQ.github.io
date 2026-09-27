"use client";

import { useEffect, useState } from "react";
import { Plus } from "lucide-react";
import type { Publication } from "@/src/data/site";
import { getPublicationDoiUrl } from "@/src/lib/publications";
import { TextLink } from "./text-link";

function copyWithSelection(text: string) {
  const previousFocus = document.activeElement as HTMLElement | null;
  const field = document.createElement("textarea");
  field.value = text;
  field.readOnly = true;
  field.className = "clipboard-field";
  document.body.appendChild(field);
  field.select();
  try {
    if (!document.execCommand("copy"))
      throw new Error("Copy was not available");
  } finally {
    field.remove();
    previousFocus?.focus({ preventScroll: true });
  }
}

export function PublicationActions({
  publication,
}: {
  publication: Publication;
}) {
  const [status, setStatus] = useState("");

  useEffect(() => {
    if (!status) return;
    const timeout = window.setTimeout(() => setStatus(""), 4500);
    return () => window.clearTimeout(timeout);
  }, [status]);

  async function copyCitation() {
    try {
      try {
        if (!navigator.clipboard?.writeText)
          throw new Error("Clipboard unavailable");
        await navigator.clipboard.writeText(publication.citationText);
      } catch {
        copyWithSelection(publication.citationText);
      }
      setStatus("Citation copied.");
    } catch {
      setStatus("Copy didn’t work. You can select the citation below.");
    }
  }

  return (
    <div className="publication-actions">
      <div className="paper-links">
        {publication.links.map((link) => (
          <TextLink
            key={`${link.kind}-${link.label}`}
            href={link.href}
            external={link.external ?? true}
          >
            {link.label}
          </TextLink>
        ))}
        {publication.doi && (
          <TextLink href={getPublicationDoiUrl(publication.doi)}>DOI</TextLink>
        )}
        <button
          className="copy-citation text-link"
          type="button"
          onClick={() => void copyCitation()}
          aria-label={`Copy citation for ${publication.title}`}
        >
          <span>Copy citation</span>
        </button>
      </div>
      <p className="citation-status" role="status">
        {status}
      </p>
      <details className="citation-detail">
        <summary>
          Citation &amp; BibTeX <Plus size={15} aria-hidden="true" />
        </summary>
        <p>{publication.citationText}</p>
        <pre tabIndex={0} aria-label={`BibTeX for ${publication.title}`}>
          <code>{publication.bibtex}</code>
        </pre>
      </details>
      <noscript>
        <style>{`.copy-citation{display:none}`}</style>
      </noscript>
    </div>
  );
}
