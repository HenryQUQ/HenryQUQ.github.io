"use client";

import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  LayoutGroup,
  motion,
  useReducedMotion
} from "framer-motion";
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
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const menuPanelRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLSpanElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    let frame = 0;

    const update = () => {
      const scrollTop = window.scrollY;
      const scrollableHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress =
        scrollableHeight > 0
          ? Math.min(1, Math.max(0, scrollTop / scrollableHeight))
          : 0;
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
      if (progressRef.current) {
        progressRef.current.style.transform = `scaleX(${progress})`;
      }
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
    const header = headerRef.current;
    const main = document.querySelector<HTMLElement>("main");
    const headerHadInert = header?.hasAttribute("inert") ?? false;
    const previousMainAriaHidden = main?.getAttribute("aria-hidden") ?? null;
    const mainHadInert = main?.hasAttribute("inert") ?? false;
    document.body.style.overflow = "hidden";
    header?.setAttribute("inert", "");
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
      if (header && !headerHadInert) {
        header.removeAttribute("inert");
      }
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
        ref={headerRef}
        aria-hidden={menuOpen ? "true" : undefined}
        className="pointer-events-none fixed inset-x-0 top-0 z-50"
      >
        <div className="site-container py-2 sm:py-3">
          <div
            data-header-surface
            data-scrolled={scrolled ? "true" : undefined}
            className={cn(
              "site-header-surface pointer-events-auto relative flex h-14 items-center justify-between overflow-hidden rounded-[1rem] border px-3 transition-[background-color,border-color,box-shadow,transform] duration-300 sm:px-4",
              scrolled
                ? "border-white/55 bg-paper/82 shadow-[0_14px_42px_rgba(17,20,25,0.10)] backdrop-blur-xl"
                : "border-transparent bg-transparent shadow-none"
            )}
          >
            <a
              href="#top"
              className="py-2 text-[0.95rem] font-medium tracking-[-0.025em] text-ink transition-[opacity,transform] duration-150 hover:opacity-60 active:scale-[0.97] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink/40 focus-visible:ring-offset-4 focus-visible:ring-offset-paper motion-reduce:transform-none"
              aria-label="Chenyuan Qu, back to top"
            >
              Chenyuan Qu
            </a>

            <div className="hidden items-center lg:flex">
              <LayoutGroup id="primary-navigation">
                <nav aria-label="Primary" className="flex items-center gap-7">
                  {sections.map((section) => {
                    const active = activeId === section.id;
                    return (
                      <a
                        key={section.id}
                        href={`#${section.id}`}
                        aria-current={active ? "location" : undefined}
                        className={cn(
                          "relative py-2 text-[0.82rem] text-ink/68 transition-[color,transform] duration-150 hover:text-ink active:scale-[0.97] motion-reduce:transform-none",
                          active && "text-ink"
                        )}
                      >
                        {section.label}
                        {active ? (
                          <motion.span
                            layoutId="active-navigation-line"
                            aria-hidden="true"
                            className="absolute inset-x-0 bottom-0 h-px bg-ink/60"
                            transition={
                              reduceMotion
                                ? { duration: 0 }
                                : {
                                    type: "spring",
                                    bounce: 0,
                                    duration: 0.38
                                  }
                            }
                          />
                        ) : null}
                      </a>
                    );
                  })}
                </nav>
              </LayoutGroup>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              className="min-h-11 px-1 text-[0.78rem] text-ink underline decoration-ink/30 underline-offset-4 transition-[color,transform] duration-150 hover:decoration-ink active:scale-[0.95] lg:hidden motion-reduce:transform-none"
              aria-label={
                menuOpen ? "Close navigation menu" : "Open navigation menu"
              }
              aria-expanded={menuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? "Close" : "Menu"}
            </button>

            <span
              ref={progressRef}
              data-scroll-progress
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-signal/65"
            />
          </div>
        </div>
      </header>

      <AnimatePresence initial={false}>
        {menuOpen ? (
          <motion.div
            className="fixed inset-0 z-[60] lg:hidden"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={reduceMotion ? undefined : { opacity: 1 }}
            exit={reduceMotion ? undefined : { opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <div
              className="absolute inset-0 cursor-default bg-ink/18 backdrop-blur-[2px]"
              aria-hidden="true"
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              ref={menuPanelRef}
              id="mobile-navigation"
              role="dialog"
              aria-modal="true"
              aria-label="Navigation"
              className="mobile-menu-surface absolute inset-x-3 top-3 overflow-hidden rounded-[1.4rem] border border-white/55 bg-paper/92 shadow-[0_24px_70px_rgba(17,20,25,0.18)] backdrop-blur-2xl"
              initial={
                reduceMotion ? false : { opacity: 0, y: -12, scale: 0.985 }
              }
              animate={
                reduceMotion ? undefined : { opacity: 1, y: 0, scale: 1 }
              }
              exit={
                reduceMotion ? undefined : { opacity: 0, y: -10, scale: 0.985 }
              }
              transition={
                reduceMotion
                  ? { duration: 0 }
                  : { type: "spring", bounce: 0, duration: 0.34 }
              }
              style={{ transformOrigin: "top center" }}
            >
              <div className="site-container flex h-[4.5rem] items-center justify-between border-b border-line">
                <p className="text-[0.95rem] font-medium tracking-[-0.025em] text-ink">
                  Chenyuan Qu
                </p>
                <button
                  type="button"
                  className="grid h-11 w-11 place-items-center rounded-full text-ink transition-[background-color,opacity,transform] duration-150 hover:bg-surface/60 hover:opacity-70 active:scale-[0.92] motion-reduce:transform-none"
                  aria-label="Close navigation menu"
                  onClick={() => setMenuOpen(false)}
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <nav aria-label="Mobile primary" className="site-container py-4">
                {sections.map((section) => {
                  const active = activeId === section.id;
                  return (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      aria-current={active ? "location" : undefined}
                      className={cn(
                        "relative flex min-h-14 items-center border-b border-line py-3 text-lg text-ink/68 transition-[color,transform] duration-150 last:border-b-0 active:translate-x-1 motion-reduce:transform-none",
                        active && "font-medium text-ink"
                      )}
                      onPointerDown={() => setActiveId(section.id)}
                      onClick={() => setMenuOpen(false)}
                    >
                      {active ? (
                        <span
                          aria-hidden="true"
                          className="mr-3 h-1.5 w-1.5 rounded-full bg-signal"
                        />
                      ) : null}
                      {section.label}
                    </a>
                  );
                })}
              </nav>
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
