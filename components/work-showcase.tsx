"use client";

import { useRef, useState } from "react";
import { Check, Plus } from "lucide-react";
import { workStories } from "@/src/data/site";
import { CompadPlayground } from "@/components/compad-playground";
import { NexusVisual } from "@/components/nexus-visual";

function WorkIllustration({ kind }: { kind: string }) {
  if (kind === "compad") return <CompadPlayground />;
  if (kind === "nexus") return <NexusVisual />;
  return (
    <div
      className="work-illustration illustration-erp-ai"
      role="img"
      aria-label="Project illustration of a request becoming a completed task"
    >
      <span className="illustration-label" aria-hidden="true">
        A helping hand
      </span>
      <div className="assistant-composition" aria-hidden="true">
        <span className="assistant-orbit">
          done<span>.</span>
        </span>
        <div className="request-note">
          Could you put together
          <br />
          this week’s repair summary?<span>↗</span>
        </div>
        <div className="reply-note">
          <span className="reply-label">
            <Check size={16} /> Ready for your review
          </span>
          <div className="note-lines">
            <span />
            <span />
            <span />
          </div>
          <span className="note-signature">You have the final say.</span>
        </div>
      </div>
      <span className="illustration-caption" aria-hidden="true">
        Project illustration
      </span>
    </div>
  );
}

export function WorkShowcase() {
  const [selected, setSelected] = useState(0);
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  return (
    <div className="work-showcase">
      <div className="work-tabs" role="tablist" aria-label="Selected work">
        {workStories.map((story, index) => (
          <button
            key={story.slug}
            ref={(element) => {
              buttons.current[index] = element;
            }}
            type="button"
            role="tab"
            id={`work-tab-${story.slug}`}
            aria-controls={`work-panel-${story.slug}`}
            aria-selected={selected === index}
            tabIndex={selected === index ? 0 : -1}
            onClick={() => setSelected(index)}
            onKeyDown={(event) => {
              const next =
                event.key === "ArrowRight"
                  ? (index + 1) % workStories.length
                  : event.key === "ArrowLeft"
                    ? (index + workStories.length - 1) % workStories.length
                    : event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? workStories.length - 1
                        : null;
              if (next !== null) {
                event.preventDefault();
                setSelected(next);
                buttons.current[next]?.focus();
              }
            }}
          >
            <span>0{index + 1}</span>
            {story.name}
          </button>
        ))}
      </div>
      {workStories.map((story, index) => (
        <article
          key={story.slug}
          id={`work-panel-${story.slug}`}
          role="tabpanel"
          aria-labelledby={`work-tab-${story.slug}`}
          hidden={selected !== index}
          className="work-panel"
          data-work={story.slug}
        >
          <WorkIllustration kind={story.slug} />
          <div className="work-story">
            <p className="work-category">{story.category}</p>
            <h3>{story.title}</h3>
            <p className="work-description">{story.description}</p>
            {story.status && <p className="work-status">{story.status}</p>}
            <details className="work-detail">
              <summary>
                The story behind it <Plus size={17} aria-hidden="true" />
              </summary>
              <div>
                <p className="work-role">{story.role}</p>
                {story.story.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <p className="work-outcome">
                  {story.highlight} {story.highlightContext}.
                </p>
              </div>
            </details>
          </div>
        </article>
      ))}
      <noscript>
        <style>{`.work-tabs{display:none}.work-panel[hidden]{display:grid!important;margin-top:2rem}`}</style>
      </noscript>
    </div>
  );
}
