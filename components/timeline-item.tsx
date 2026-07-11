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
        className="absolute -left-[4px] top-2 h-2 w-2 rounded-full bg-ink ring-4 ring-surface"
      />
      <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:justify-between sm:gap-5">
        <h5 className="text-lg font-semibold text-ink">{role.title}</h5>
        <div className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted sm:text-right">
          {role.period}
        </div>
      </div>
      <p className="mt-3 max-w-reading text-sm leading-7 text-ink/72 sm:text-[0.95rem]">
        {role.detail}
      </p>
      {role.highlights?.length ? (
        <details className="group mt-4 border-t border-line pt-3">
          <summary className="flex min-h-9 cursor-pointer list-none items-center justify-between text-sm text-muted marker:content-none hover:text-ink">
            Details
            <span>{role.highlights.length} items</span>
          </summary>
          <ul className="mt-3 max-w-reading space-y-2 pb-1 text-sm leading-7 text-ink/72">
            {role.highlights.map((highlight) => (
              <li key={highlight} className="flex gap-3">
                <span className="mt-[0.72rem] h-1 w-1 shrink-0 rounded-full bg-ink/55" />
                <span>{highlight}</span>
              </li>
            ))}
          </ul>
        </details>
      ) : null}
    </div>
  );
}

export function TimelineItem({ item, index }: TimelineItemProps) {
  return (
    <Reveal delay={index * 0.04}>
      <div className="border-b border-line py-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <div>
            <h5 className="font-display text-[1.45rem] font-normal text-ink">{item.title}</h5>
            <p className="mt-2 text-sm text-muted">
            <OrganisationLabel
              fallback={item.organisation}
              links={item.organisationLinks}
            />
            </p>
          </div>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted sm:text-right">{item.period}</div>
        </div>
        <p className="mt-3 max-w-reading text-sm leading-7 text-ink/72">{item.detail}</p>
      </div>
    </Reveal>
  );
}

export function TimelineGroup({ group, index }: TimelineGroupProps) {
  return (
    <Reveal delay={index * 0.04}>
      <div className="border-b border-line py-7">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-5">
          <h4 className="font-display text-[1.65rem] font-normal text-ink">
            <OrganisationLabel
              fallback={group.organisation}
              links={group.organisationLinks}
            />
          </h4>
          <div className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted sm:text-right">
            {group.period}
          </div>
        </div>
        <div className="mt-7 space-y-7">
          {group.roles.map((role) => (
            <RoleSegment key={`${role.title}-${role.period}`} role={role} />
          ))}
        </div>
      </div>
    </Reveal>
  );
}
