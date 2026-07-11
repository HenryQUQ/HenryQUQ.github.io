"use client";

import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";

import { cn } from "@/src/lib/utils";

type SectionLink = {
  id: string;
  label: string;
};

type SiteHeaderProps = {
  sections: SectionLink[];
};

export function SiteHeader({ sections }: SiteHeaderProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "work");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const marker = scrollTop + window.innerHeight * 0.38;
      const elements = sections
        .map(({ id }) => document.getElementById(id))
        .filter((element): element is HTMLElement => Boolean(element));
      const current = elements.reduce<HTMLElement | null>((closest, element) => {
        if (element.offsetTop <= marker) {
          return element;
        }
        return closest;
      }, elements[0] ?? null);

      setScrolled(scrollTop > 24);
      if (current?.id) {
        setActiveId(current.id);
      }
    };

    const handleScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(update);
    };

    update();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, [sections]);

  useEffect(() => {
    if (!menuOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    const menuButton = menuButtonRef.current;
    const main = document.querySelector<HTMLElement>("main");
    const previousMainAriaHidden = main?.getAttribute("aria-hidden") ?? null;
    const mainHadInert = main?.hasAttribute("inert") ?? false;
    document.body.style.overflow = "hidden";
    main?.setAttribute("aria-hidden", "true");
    main?.setAttribute("inert", "");
    const panel = menuPanelRef.current;
    const focusable = panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])");
    focusable?.[0]?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setMenuOpen(false);
        return;
      }

      if (event.key !== "Tab" || !focusable?.length) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      const active = document.activeElement;
      if (event.shiftKey && (active === first || !panel?.contains(active))) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && (active === last || !panel?.contains(active))) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      if (main) {
        if (previousMainAriaHidden === null) {
          main.removeAttribute("aria-hidden");
        } else {
          main.setAttribute("aria-hidden", previousMainAriaHidden);
        }

        if (!mainHadInert) {
          main.removeAttribute("inert");
        }
      }
      document.removeEventListener("keydown", handleKeyDown);
      menuButton?.focus();
    };
  }, [menuOpen]);

  return (
    <>
      <header
        aria-hidden={menuOpen ? "true" : undefined}
        inert={menuOpen ? true : undefined}
        className={cn(
          "fixed inset-x-0 top-0 z-50 border-b transition-colors duration-300",
          scrolled
            ? "border-line bg-paper/95 backdrop-blur-md"
            : "border-transparent bg-transparent"
        )}
      >
        <div className="site-container flex h-[4.5rem] items-center justify-between">
          <a
            href="#top"
            className="py-2 text-[0.95rem] font-medium tracking-[-0.025em] text-ink transition-opacity hover:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-paper"
            aria-label="Chenyuan Qu, back to top"
          >
            Chenyuan Qu
          </a>

          <div className="hidden items-center lg:flex">
            <nav aria-label="Primary" className="flex items-center gap-7">
              {sections.map((section) => {
                const active = activeId === section.id;
                return (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    aria-current={active ? "location" : undefined}
                    className={cn(
                      "relative py-2 text-[0.82rem] text-ink/72 transition-colors hover:text-ink",
                      active && "text-ink"
                    )}
                  >
                    {section.label}
                    <span
                      aria-hidden="true"
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-px origin-left bg-ink/55 transition-transform duration-300",
                        active ? "scale-x-100" : "scale-x-0"
                      )}
                    />
                  </a>
                );
              })}
            </nav>
          </div>

          <button
            ref={menuButtonRef}
            type="button"
            className="min-h-11 px-1 text-[0.78rem] text-ink underline decoration-ink/30 underline-offset-4 transition-colors hover:decoration-ink lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? "Close" : "Menu"}
          </button>
        </div>
      </header>

      {menuOpen ? (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <div
            className="absolute inset-0 cursor-default bg-ink/18"
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
          />
          <div
            ref={menuPanelRef}
            id="mobile-navigation"
            role="dialog"
            aria-modal="true"
            aria-label="Navigation"
            className="absolute inset-x-0 top-0 overflow-hidden border-b border-line bg-paper"
          >
            <div className="site-container flex h-[4.5rem] items-center justify-between border-b border-line">
              <p className="text-[0.95rem] font-medium tracking-[-0.025em] text-ink">
                Chenyuan Qu
              </p>
              <button
                type="button"
                className="grid h-11 w-11 place-items-center text-ink transition-opacity hover:opacity-60"
                aria-label="Close navigation menu"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <nav aria-label="Mobile primary" className="site-container py-5">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  aria-current={activeId === section.id ? "location" : undefined}
                  className={cn(
                    "flex min-h-14 items-center border-b border-line py-3 text-lg text-ink/72 last:border-b-0",
                    activeId === section.id && "text-ink underline decoration-ink/30 underline-offset-4"
                  )}
                  onClick={() => setMenuOpen(false)}
                >
                  {section.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      ) : null}
    </>
  );
}
