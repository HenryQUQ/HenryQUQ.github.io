import { TimelineItem as TimelineItemType } from "@/src/data/site";

import { Reveal } from "./reveal";

type TimelineItemProps = {
  item: TimelineItemType;
  index: number;
};

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <Reveal delay={index * 0.04}>
      <div className="grid gap-3 border-t border-line py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
        <div className="meta-label pt-1">{item.period}</div>
        <div>
          <h3 className="font-display text-2xl text-ink">{item.title}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
            {item.organisation}
          </p>
          <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
            {item.detail}
          </p>
          {item.highlights?.length ? (
            <ul className="mt-4 max-w-reading space-y-2 text-sm leading-7 text-ink/78 sm:text-base">
              {item.highlights.map((highlight) => (
                <li key={highlight} className="flex gap-3">
                  <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>
      </div>
    </Reveal>
  );
}
