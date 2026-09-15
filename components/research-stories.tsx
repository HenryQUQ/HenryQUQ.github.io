import { ArrowUpRight } from "lucide-react";
import { ImmersivePanorama } from "@/components/immersive-panorama";
import { VisualSplitStudy } from "@/components/visualsplit-study";
import { researchStories } from "@/src/data/site";

export function ResearchStories() {
  return (
    <div className="research-stories" id="work">
      {researchStories.map((story) =>
        story.slug === "visualsplit" ? (
          <article
            key={story.slug}
            id={`study-${story.slug}`}
            className="research-story research-story-visualsplit"
          >
            <div className="research-story-meta">
              <span>{story.name}</span>
              <span>{story.note}</span>
            </div>
            <div className="visualsplit-intro">
              <h3>{story.title}</h3>
              <p>{story.description}</p>
            </div>
            <VisualSplitStudy />
          </article>
        ) : (
          <article
            key={story.slug}
            id={`study-${story.slug}`}
            className="research-story research-story-panorama"
          >
            <div className={`research-photo research-photo-${story.slug}`}>
              <ImmersivePanorama source={story.image} alt={story.imageAlt} />
              <a
                href={story.href}
                target="_blank"
                rel="noreferrer"
                className="image-project-link"
                aria-label={`Explore ${story.name}`}
              >
                <ArrowUpRight size={22} aria-hidden="true" />
              </a>
            </div>
            <div className="research-story-copy">
              <div className="research-story-meta">
                <span>{story.name}</span>
                <span>{story.note}</span>
              </div>
              <h3>
                <a href={story.href} target="_blank" rel="noreferrer">
                  {story.title}
                </a>
              </h3>
              <p>{story.description}</p>
              <a
                className="text-arrow"
                href={story.href}
                target="_blank"
                rel="noreferrer"
              >
                Explore the project{" "}
                <ArrowUpRight size={16} aria-hidden="true" />
              </a>
            </div>
          </article>
        ),
      )}
    </div>
  );
}
