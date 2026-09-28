import { ArrowUpRight } from "lucide-react";
import { ImmersivePanorama } from "@/components/immersive-panorama";
import { VisualSplitStudy } from "@/components/visualsplit-study";
import { publications, researchStories } from "@/src/data/site";
import { getAuthorRole } from "@/src/lib/publications";

type ResearchStory = (typeof researchStories)[number];

function findStory(slug: string) {
  return researchStories.find((story) => story.slug === slug)!;
}

// A readable credit line built from the paper record: the venue opens the
// matching entry in the reading list, and the role follows author order.
function StoryCredit({ story }: { story: ResearchStory }) {
  const paper = publications.find((item) => item.slug === story.slug)!;
  return (
    <p className="credit-line">
      <span className="credit-name">{story.name}</span>
      {" · "}
      <a className="credit-venue" href={`#publication-${paper.slug}`}>
        {paper.shortVenue} {paper.year}
      </a>
      {paper.recognition && (
        <>
          {" · "}
          <span className="credit-honour">{paper.recognition}</span>
        </>
      )}
      {" · "}
      {getAuthorRole(paper)}
    </p>
  );
}

export function VisualSplitStory() {
  const story = findStory("visualsplit");
  return (
    <article
      id={`study-${story.slug}`}
      className="research-story research-story-visualsplit"
    >
      <div className="visualsplit-intro">
        <StoryCredit story={story} />
        <h3>{story.title}</h3>
        <p>{story.description}</p>
      </div>
      <VisualSplitStudy />
    </article>
  );
}

export function PanoramaStory() {
  const story = findStory("x360");
  return (
    <article
      id={`study-${story.slug}`}
      className="research-story night-band"
      data-surface="night"
      aria-labelledby={`study-${story.slug}-title`}
    >
      <div className="site-container">
        <div className={`research-photo research-photo-${story.slug}`}>
          <ImmersivePanorama source={story.image} alt={story.imageAlt} />
        </div>
        <div className="research-story-copy">
          <div className="panorama-heading">
            <StoryCredit story={story} />
            <h3 id={`study-${story.slug}-title`}>
              <a href={story.href} target="_blank" rel="noreferrer">
                {story.title}
              </a>
            </h3>
          </div>
          <div className="panorama-aside">
            <p>{story.description}</p>
            <a
              className="text-arrow"
              href={story.href}
              target="_blank"
              rel="noreferrer"
            >
              Explore {story.name}
              <ArrowUpRight size={16} aria-hidden="true" />
            </a>
          </div>
        </div>
      </div>
    </article>
  );
}
