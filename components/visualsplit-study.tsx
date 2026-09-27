"use client";

import Image from "next/image";
import { ArrowRight, ArrowUpRight, MoveHorizontal } from "lucide-react";
import { useEffect, useRef, useState, type CSSProperties } from "react";
import {
  visualSplitExamples,
  visualSplitLighting,
} from "@/src/data/visualsplit-examples";
import { withBasePath } from "@/src/lib/site-config";

export function VisualSplitStudy() {
  const [active, setActive] = useState(0);
  const [light, setLight] = useState(2);
  const [comparison, setComparison] = useState(40);
  // Eases the divider back to its starting point when a new example opens.
  const [settling, setSettling] = useState(false);
  const [ready, setReady] = useState(false);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const tabListRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const example = visualSplitExamples[active];
  const lighting = visualSplitLighting[light];
  const result = example.id === "light" ? lighting.image : example.result;
  const resultLabel =
    example.id === "light" ? lighting.label : example.resultLabel;

  useEffect(() => setReady(true), []);

  function selectExample(index: number) {
    setActive(index);
    setSettling(comparison !== 40);
    setComparison(40);
    const panel = panelRef.current?.getBoundingClientRect();
    const tabs = tabListRef.current?.getBoundingClientRect();
    if (index !== active && panel && tabs && panel.top < tabs.bottom) {
      window.scrollBy({
        top: panel.top - tabs.bottom - 20,
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
    }
  }

  return (
    <div className="visualsplit-study" data-ready={ready}>
      <div
        className="visualsplit-tabs"
        ref={tabListRef}
        role="tablist"
        aria-label="Explore VisualSplit"
      >
        {visualSplitExamples.map((item, index) => (
          <button
            key={item.id}
            id={`visualsplit-tab-${item.id}`}
            type="button"
            role="tab"
            aria-selected={index === active}
            aria-controls="visualsplit-example"
            tabIndex={index === active ? 0 : -1}
            disabled={!ready}
            ref={(node) => {
              tabRefs.current[index] = node;
            }}
            onClick={() => selectExample(index)}
            onKeyDown={(event) => {
              let next = index;
              if (event.key === "ArrowRight")
                next = (index + 1) % visualSplitExamples.length;
              else if (event.key === "ArrowLeft")
                next =
                  (index + visualSplitExamples.length - 1) %
                  visualSplitExamples.length;
              else if (event.key === "Home") next = 0;
              else if (event.key === "End")
                next = visualSplitExamples.length - 1;
              else return;
              event.preventDefault();
              selectExample(next);
              tabRefs.current[next]?.focus({ preventScroll: true });
            }}
          >
            {item.label}
          </button>
        ))}
      </div>

      <div
        id="visualsplit-example"
        ref={panelRef}
        role="tabpanel"
        aria-labelledby={`visualsplit-tab-${example.id}`}
        className="visualsplit-example"
        tabIndex={0}
      >
        <figure
          className="visualsplit-comparison"
          data-settling={settling}
          style={{ "--comparison": `${comparison}%` } as CSSProperties}
          onTransitionEnd={(event) => {
            if (event.propertyName === "--comparison") setSettling(false);
          }}
        >
          <div className="visualsplit-images" key={example.id}>
            <Image
              src={withBasePath(example.original.src)}
              alt={example.original.alt}
              fill
              sizes="(max-width: 759px) 90vw, 56vw"
              className="visualsplit-original"
            />
            <div className="visualsplit-result">
              <Image
                src={withBasePath(result.src)}
                alt={result.alt}
                fill
                sizes="(max-width: 759px) 90vw, 56vw"
              />
            </div>
            <div className="visualsplit-image-labels" aria-hidden="true">
              <span>Original</span>
              <span>{resultLabel}</span>
            </div>
            <span className="visualsplit-divider" aria-hidden="true">
              <span>
                <MoveHorizontal size={22} />
              </span>
            </span>
            <input
              className="visualsplit-scrubber"
              type="range"
              min={0}
              max={100}
              value={comparison}
              disabled={!ready}
              onChange={(event) => {
                setSettling(false);
                setComparison(Number(event.target.value));
              }}
              aria-label="Compare original and VisualSplit result"
              aria-valuetext={`${comparison}% original, ${100 - comparison}% ${resultLabel.toLowerCase()}`}
              aria-describedby="visualsplit-drag-hint"
            />
          </div>
          <figcaption className="visualsplit-caption">
            <span id="visualsplit-drag-hint">
              <MoveHorizontal size={15} aria-hidden="true" />
              {ready ? "Drag to compare" : "Original / VisualSplit result"}
            </span>
            <a
              href="https://chenyuanqu.com/VisualSplit/"
              target="_blank"
              rel="noreferrer"
            >
              Published results <ArrowUpRight size={13} aria-hidden="true" />
            </a>
          </figcaption>
        </figure>

        <div className="visualsplit-notes" key={example.id}>
          <div className="visualsplit-copy">
            <h4>{example.title}</h4>
            <p>{example.description}</p>
          </div>
          {example.id === "light" ? (
            <div className="visualsplit-ingredients">
              <div
                className="visualsplit-lighting"
                role="group"
                aria-label="Scene lighting"
              >
                {visualSplitLighting.map((option, index) => (
                  <button
                    type="button"
                    key={option.id}
                    aria-pressed={index === light}
                    onClick={() => setLight(index)}
                  >
                    <span
                      className={`visualsplit-light-dot visualsplit-light-${option.id}`}
                      aria-hidden="true"
                    />
                    {option.label}
                  </button>
                ))}
              </div>
              <div className="visualsplit-histogram">
                <Image
                  src={withBasePath(lighting.histogram)}
                  alt={`Brightness histogram used for the ${lighting.label.toLowerCase()} valley result`}
                  width={1000}
                  height={200}
                />
              </div>
              <p className="visualsplit-ingredient-note">
                {example.ingredientNote}
              </p>
            </div>
          ) : (
            <div className="visualsplit-ingredients">
              <div
                className={`visualsplit-ingredient-images visualsplit-ingredient-${example.id}`}
              >
                {example.ingredients.map((ingredient, index) => (
                  <figure key={ingredient.src}>
                    <div className="visualsplit-ingredient-image">
                      <Image
                        src={withBasePath(ingredient.src)}
                        alt={ingredient.alt}
                        fill
                        sizes="(max-width: 759px) 28vw, 12vw"
                      />
                    </div>
                    <figcaption>{ingredient.label}</figcaption>
                    {example.id === "colour" && index === 0 && (
                      <ArrowRight
                        className="visualsplit-map-arrow"
                        size={18}
                        aria-hidden="true"
                      />
                    )}
                  </figure>
                ))}
              </div>
              <p className="visualsplit-ingredient-note">
                {example.ingredientNote}
              </p>
            </div>
          )}
          <a
            className="text-arrow"
            href="https://chenyuanqu.com/VisualSplit/"
            target="_blank"
            rel="noreferrer"
          >
            Explore the research <ArrowUpRight size={16} aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
