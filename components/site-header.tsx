"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowDown, X } from "lucide-react";
import { profile } from "@/src/data/site";

type SiteHeaderProps = {
  sections: { id: string; label: string; folio: string }[];
};

type Tone = "paper" | "stone" | "night" | "photo" | "rust";

// Browser chrome follows the surface beneath the masthead.
const themeColours: Record<Tone, string> = {
  paper: "#f5f2eb",
  stone: "#e4ddcf",
  night: "#111a1c",
  photo: "#0c191b",
  rust: "#994028",
};

export function SiteHeader({ sections }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeId, setActiveId] = useState("");
  const [tone, setTone] = useState<Tone>("paper");
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    let frame = 0;
    const update = () => {
      setScrolled(window.scrollY > 30);
      const marker = window.scrollY + window.innerHeight * 0.35;
      let current = "";
      sections.forEach(({ id }) => {
        const section = document.getElementById(id);
        if (
          section &&
          section.getBoundingClientRect().top + window.scrollY <= marker
        )
          current = id;
      });
      setActiveId(current);
      // The deepest surface under the middle of the header sets its tone.
      const probe = (headerRef.current?.offsetHeight ?? 0) / 2;
      let surface: Tone = "paper";
      document
        .querySelectorAll<HTMLElement>("main [data-surface]")
        .forEach((element) => {
          const box = element.getBoundingClientRect();
          if (box.top <= probe && box.bottom > probe)
            surface = element.dataset.surface as Tone;
        });
      setTone(surface);
    };
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [sections]);

  useEffect(() => {
    const meta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    if (meta) meta.content = themeColours[scrolled ? tone : "paper"];
  }, [scrolled, tone]);

  useEffect(() => {
    const dialog = menuRef.current;
    if (!dialog) return;
    if (!menuOpen) {
      if (dialog.open) dialog.close();
      return;
    }
    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    dialog.querySelector<HTMLButtonElement>("button")?.focus();
    return () => {
      document.body.style.overflow = previousOverflow;
      if (dialog.open) dialog.close();
      menuButton?.focus();
    };
  }, [menuOpen]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 760px)");
    const closeOnDesktop = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", closeOnDesktop);
    return () => desktop.removeEventListener("change", closeOnDesktop);
  }, []);

  return (
    <>
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header
        ref={headerRef}
        className="site-header"
        data-scrolled={scrolled}
        data-tone={scrolled ? tone : "paper"}
      >
        <div className="site-container header-inner">
          <a
            className="site-mark"
            href="#top"
            aria-label={`${profile.name}, back to top`}
          >
            cq<span>.</span>
          </a>
          <nav className="desktop-nav" aria-label="Primary">
            {sections.map((section) => (
              <a
                key={section.id}
                href={`#${section.id}`}
                aria-current={activeId === section.id ? "location" : undefined}
              >
                {section.label}
                {section.id === "contact" && (
                  <ArrowDown size={14} aria-hidden="true" />
                )}
              </a>
            ))}
          </nav>
          <button
            className="menu-toggle"
            type="button"
            ref={menuButtonRef}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen(true)}
          >
            Menu <span aria-hidden="true">+</span>
          </button>
          <noscript>
            <style>{`.menu-toggle{display:none!important}.site-header{background-color:var(--header-bg);box-shadow:0 1px 0 var(--rule)}.site-header .header-inner{border-color:transparent}`}</style>
            <nav className="no-script-nav" aria-label="Navigation">
              {sections.map((section) => (
                <a key={section.id} href={`#${section.id}`}>
                  {section.label}
                </a>
              ))}
            </nav>
          </noscript>
        </div>
      </header>
      <dialog
        ref={menuRef}
        id="mobile-navigation"
        className="mobile-navigation"
        aria-label="Navigation"
        onCancel={() => setMenuOpen(false)}
        onKeyDown={(event) => {
          if (event.key !== "Tab") return;
          const targets =
            event.currentTarget.querySelectorAll<HTMLElement>(
              "button, a[href]",
            );
          const first = targets[0];
          const last = targets[targets.length - 1];
          if (event.shiftKey && document.activeElement === first) {
            event.preventDefault();
            last?.focus();
          } else if (!event.shiftKey && document.activeElement === last) {
            event.preventDefault();
            first?.focus();
          }
        }}
        onClick={(event) => {
          if (event.target === event.currentTarget) setMenuOpen(false);
        }}
      >
        <div className="mobile-nav-top">
          <span className="site-mark">
            cq<span>.</span>
          </span>
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setMenuOpen(false)}
          >
            <X aria-hidden="true" />
          </button>
        </div>
        <nav aria-label="Mobile primary">
          {sections.map((section) => (
            <a
              key={section.id}
              href={`#${section.id}`}
              onClick={() => setMenuOpen(false)}
            >
              <span className="mobile-nav-index" aria-hidden="true">
                {section.folio}
              </span>
              {section.label}
            </a>
          ))}
        </nav>
        <p>
          {profile.location}. {profile.positioning}.
        </p>
      </dialog>
    </>
  );
}
