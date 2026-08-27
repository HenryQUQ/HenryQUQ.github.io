"use client";

import { useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { LayoutGroup, motion, useReducedMotion } from "framer-motion";

import { cn } from "@/src/lib/utils";

type CaseFlowProps = {
  label: string;
  steps: string[];
};

export function CaseFlow({ label, steps }: CaseFlowProps) {
  const [activeIndex, setActiveIndex] = useState(0);
  const stepRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const groupId = useId().replace(/:/g, "");
  const reduceMotion = useReducedMotion();

  const selectStep = (index: number) => {
    const nextIndex = (index + steps.length) % steps.length;
    setActiveIndex(nextIndex);
    stepRefs.current[nextIndex]?.focus();
  };

  const handleKeyDown = (
    event: KeyboardEvent<HTMLButtonElement>,
    index: number
  ) => {
    if (event.key === "ArrowRight" || event.key === "ArrowDown") {
      event.preventDefault();
      selectStep(index + 1);
    } else if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
      event.preventDefault();
      selectStep(index - 1);
    } else if (event.key === "Home") {
      event.preventDefault();
      selectStep(0);
    } else if (event.key === "End") {
      event.preventDefault();
      selectStep(steps.length - 1);
    }
  };

  return (
    <div className="mt-10 border-y border-line py-7" data-case-flow>
      <p className="meta-label">{label}</p>
      <LayoutGroup id={groupId}>
        <ol className="mt-5 grid gap-x-8 sm:grid-cols-2 lg:grid-cols-4 lg:gap-x-0">
          {steps.map((step, index) => {
            const active = activeIndex === index;

            return (
              <li key={step} className="relative border-t border-line">
                {active ? (
                  <motion.span
                    layoutId="active-case-flow-line"
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-x-0 -top-px h-[2px] bg-signal"
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
                <button
                  ref={(element) => {
                    stepRefs.current[index] = element;
                  }}
                  type="button"
                  aria-pressed={active}
                  className={cn(
                    "relative flex min-h-20 w-full items-start px-2 py-4 text-left text-sm font-medium leading-6 transition-[color,transform] duration-150 active:scale-[0.985] focus-visible:outline-none motion-reduce:transform-none motion-reduce:transition-none lg:px-4",
                    active
                      ? "-translate-y-0.5 text-ink"
                      : "text-ink/62 hover:text-ink/84"
                  )}
                  onPointerEnter={() => setActiveIndex(index)}
                  onPointerDown={() => setActiveIndex(index)}
                  onFocus={() => setActiveIndex(index)}
                  onClick={() => setActiveIndex(index)}
                  onKeyDown={(event) => handleKeyDown(event, index)}
                >
                  {step}
                </button>
              </li>
            );
          })}
        </ol>
      </LayoutGroup>
    </div>
  );
}
