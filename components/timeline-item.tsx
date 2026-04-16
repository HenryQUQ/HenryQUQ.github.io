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
        </div>
      </div>
    </Reveal>
  );
}

