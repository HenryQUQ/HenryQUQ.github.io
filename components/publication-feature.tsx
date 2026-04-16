import { Publication } from "@/src/data/site";

import { Reveal } from "./reveal";
import { TextLink } from "./text-link";

type PublicationFeatureProps = {
  publication: Publication;
  index: number;
};

export function PublicationFeature({
  publication,
  index
}: PublicationFeatureProps) {
  return (
    <Reveal delay={index * 0.06}>
      <article className="group grid gap-6 border-t border-line py-8 lg:grid-cols-[minmax(0,1fr)_14rem] lg:gap-12">
        <div>
          <p className="meta-label">{publication.shortVenue}</p>
          <h3 className="mt-4 max-w-4xl font-display text-3xl leading-tight text-ink transition-colors duration-200 group-hover:text-accent sm:text-[2.2rem]">
            {publication.title}
          </h3>
          <p className="mt-4 text-sm leading-7 text-muted sm:text-base">
            {publication.authors}
          </p>
          <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
            {publication.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {publication.links.map((link) => (
              <TextLink key={link.label} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
        <div className="grid grid-cols-2 gap-5 border-t border-line pt-4 text-sm text-muted sm:max-w-xs lg:block lg:border-l lg:border-t-0 lg:pl-8 lg:pt-0">
          <div>
            <p className="meta-label">Year</p>
            <p className="mt-2 text-base text-ink">{publication.year}</p>
          </div>
          <div>
            <p className="meta-label">Venue</p>
            <p className="mt-2 text-base text-ink">{publication.venue}</p>
          </div>
        </div>
      </article>
    </Reveal>
  );
}

