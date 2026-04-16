import { Publication } from "@/src/data/site";

import { Reveal } from "./reveal";
import { TextLink } from "./text-link";

type PublicationListItemProps = {
  publication: Publication;
  index: number;
};

export function PublicationListItem({
  publication,
  index
}: PublicationListItemProps) {
  return (
    <Reveal delay={index * 0.04}>
      <li className="grid gap-5 border-t border-line py-6 lg:grid-cols-[6rem_minmax(0,1fr)] lg:gap-8">
        <div className="meta-label pt-1">{publication.year}</div>
        <div>
          <h3 className="font-display text-2xl leading-tight text-ink">
            {publication.title}
          </h3>
          <p className="mt-3 text-sm leading-7 text-muted">{publication.authors}</p>
          <p className="mt-2 text-sm leading-7 text-ink/78">{publication.venue}</p>
          <div className="mt-4 flex flex-wrap gap-x-5 gap-y-3">
            {publication.links.map((link) => (
              <TextLink key={link.label} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
      </li>
    </Reveal>
  );
}

