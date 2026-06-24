import type {
  OrganisationLink,
  TimelineGroup as TimelineGroupType,
  TimelineItem as TimelineItemType,
  TimelineRole
} from "@/src/data/site";

import { Reveal } from "./reveal";

type OrganisationLabelProps = {
  fallback: string;
  links?: OrganisationLink[];
};

type TimelineItemProps = {
  item: TimelineItemType;
  index: number;
};

type TimelineGroupProps = {
  group: TimelineGroupType;
  index: number;
};

function OrganisationLabel({ fallback, links }: OrganisationLabelProps) {
  if (!links?.length) {
    return <>{fallback}</>;
  }

  return (
    <>
      {links.map((organisation, linkIndex) => (
        <span key={organisation.label}>
          <a
            href={organisation.href}
            target="_blank"
            rel="noreferrer"
            className="border-b border-transparent transition-colors hover:border-current hover:text-ink focus-visible:border-current focus-visible:text-ink focus-visible:outline-none"
          >
            {organisation.label}
          </a>
          {linkIndex < links.length - 1 ? " · " : ""}
        </span>
      ))}
    </>
  );
}

function RoleSegment({ role }: { role: TimelineRole }) {
  return (
    <div
      className="relative border-l border-line pl-5 sm:pl-6"
      data-timeline-role={role.title}
    >
      <span
        aria-hidden="true"
        className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-accent/70 ring-4 ring-paper"
      />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
        <h4 className="font-display text-xl text-ink">{role.title}</h4>
        <div className="meta-label shrink-0 pt-1">{role.period}</div>
      </div>
      <p className="mt-3 max-w-reading text-base leading-8 text-ink/84">
        {role.detail}
      </p>
      {role.highlights?.length ? (
        <ul className="mt-4 max-w-reading space-y-2 text-sm leading-7 text-ink/78 sm:text-base">
          {role.highlights.map((highlight) => (
            <li key={highlight} className="flex gap-3">
              <span className="mt-[0.85rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent/70" />
              <span>{highlight}</span>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <Reveal delay={index * 0.04}>
      <div className="grid gap-3 border-t border-line py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
        <div className="meta-label pt-1">{item.period}</div>
        <div>
          <h3 className="font-display text-2xl text-ink">{item.title}</h3>
          <p className="mt-2 text-sm uppercase tracking-[0.18em] text-muted">
            <OrganisationLabel
              fallback={item.organisation}
              links={item.organisationLinks}
            />
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

export function TimelineGroup({ group, index }: TimelineGroupProps) {
  return (
    <Reveal delay={index * 0.04}>
      <div className="grid gap-5 border-t border-line py-7 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
        <div className="meta-label pt-1">{group.period}</div>
        <div>
          <h3 className="font-display text-2xl text-ink">
            <OrganisationLabel
              fallback={group.organisation}
              links={group.organisationLinks}
            />
          </h3>
          <div className="mt-6 space-y-6">
            {group.roles.map((role) => (
              <RoleSegment key={`${role.title}-${role.period}`} role={role} />
            ))}
          </div>
        </div>
      </div>
    </Reveal>
  );
}
