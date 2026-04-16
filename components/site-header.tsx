"use client";

import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

import { cn } from "@/src/lib/utils";

type SectionLink = {
  id: string;
  label: string;
};

type SiteHeaderProps = {
  sections: SectionLink[];
};

export function SiteHeader({ sections }: SiteHeaderProps) {
  const [activeId, setActiveId] = useState(sections[0]?.id ?? "about");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 28);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const elements = sections
      .map(({ id }) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[];

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (visible?.target.id) {
          setActiveId(visible.target.id);
        }
      },
      {
        threshold: [0.2, 0.45, 0.7],
        rootMargin: "-35% 0px -45% 0px"
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [sections]);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-300",
          scrolled ? "bg-paper/84 backdrop-blur-md" : "bg-transparent"
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 sm:px-8 lg:px-12">
          <a
            href="#about"
            className="text-sm font-medium uppercase tracking-[0.22em] text-ink/80 hover:text-ink"
          >
            Chenyuan Qu
          </a>
          <nav
            aria-label="Primary"
            className="hidden items-center gap-5 lg:flex"
          >
            {sections.map((section) => {
              const active = activeId === section.id;

              return (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "relative pb-1 text-sm text-ink/68 hover:text-ink",
                    active && "text-ink"
                  )}
                >
                  {section.label}
                  <span
                    className={cn(
                      "absolute inset-x-0 -bottom-0.5 h-px origin-left bg-accent transition-transform duration-300",
                      active ? "scale-x-100" : "scale-x-0"
                    )}
                  />
                </a>
              );
            })}
          </nav>
          <button
            type="button"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-line/80 bg-paper/70 text-ink lg:hidden"
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            {menuOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </header>
      {menuOpen ? (
        <div className="fixed inset-0 z-40 bg-ink/18 backdrop-blur-sm lg:hidden">
          <div className="absolute inset-x-5 top-20 rounded-[1.6rem] bg-paper px-6 py-6 shadow-soft">
            <nav aria-label="Mobile primary" className="flex flex-col gap-2">
              {sections.map((section) => (
                <a
                  key={section.id}
                  href={`#${section.id}`}
                  className={cn(
                    "border-b border-line py-3 text-base text-ink/84",
                    activeId === section.id && "text-accent"
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

