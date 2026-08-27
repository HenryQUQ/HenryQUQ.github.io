import { CaseFlow } from "@/components/case-flow";
import { CaseStudyScroller } from "@/components/case-study-scroller";
import { HeroPortrait } from "@/components/hero-portrait";
import { PublicationsExperience } from "@/components/publications-experience";
import { ResearchThreadExperience } from "@/components/research-thread-experience";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { TextLink } from "@/components/text-link";
import { TimelineGroup, TimelineItem } from "@/components/timeline-item";
import {
  caseStudies,
  education,
  enterpriseCaseStudies,
  experience,
  newsItems,
  organisationLinks,
  personLinks,
  profile,
  profileEvidence,
  projects,
  publications,
  researchThreads,
  sections
} from "@/src/data/site";
import {
  getPrimaryPublicationHref,
  getPublicationDoiUrl
} from "@/src/lib/publications";
import { absoluteUrl } from "@/src/lib/site-config";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${absoluteUrl("/")}#person`,
  name: profile.name,
  url: absoluteUrl("/"),
  image: absoluteUrl(profile.heroImage),
  description: profile.bio,
  email: profile.email,
  jobTitle: profile.role,
  worksFor: {
    "@type": "Organization",
    name: "Allsee"
  },
  affiliation: [
    {
      "@type": "Organization",
      name: "Allsee",
      url: organisationLinks.find((organisation) => organisation.label === "Allsee")
        ?.href
    },
    {
      "@type": "Organization",
      name: "Vieunite",
      url: organisationLinks.find((organisation) => organisation.label === "Vieunite")
        ?.href
    },
    {
      "@type": "Organization",
      name: "University of Birmingham",
      url: organisationLinks.find(
        (organisation) => organisation.label === "University of Birmingham"
      )?.href
    }
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Birmingham" },
    { "@type": "CollegeOrUniversity", name: "University of Southampton" }
  ],
  sameAs: profile.links
    .filter((link) => link.kind !== "email")
    .map((link) => link.href)
};

const publicationSchemas = publications.map((publication) => {
  const primaryUrl =
    getPrimaryPublicationHref(publication) ??
    `${absoluteUrl("/")}#publication-${publication.slug}`;
  const identifiers = [
    publication.doi
      ? { "@type": "PropertyValue", propertyID: "DOI", value: publication.doi }
      : null,
    publication.arxivId
      ? { "@type": "PropertyValue", propertyID: "arXiv", value: publication.arxivId }
      : null
  ].filter(Boolean);

  return {
    "@type": "ScholarlyArticle",
    "@id": `${absoluteUrl("/")}#publication-${publication.slug}`,
    name: publication.title,
    headline: publication.title,
    url: primaryUrl,
    mainEntityOfPage: primaryUrl,
    author: publication.authorList.map((author) => {
      const personLink = personLinks.find((person) => person.name === author);
      return { "@type": "Person", name: author, url: personLink?.href };
    }),
    datePublished: `${publication.year}`,
    description: publication.summary,
    isPartOf: { "@type": "CreativeWork", name: publication.venue },
    sameAs: [
      ...publication.links.map((link) => link.href),
      publication.doi ? getPublicationDoiUrl(publication.doi) : null
    ].filter(Boolean),
    identifier: identifiers.length > 0 ? identifiers : undefined
  };
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [personSchema, ...publicationSchemas]
};

export default function HomePage() {
  const academicExperience = experience.filter((item) => item.track === "academic");
  const industryExperience = experience.filter((item) => item.track === "industry");
  const selectedResearch = caseStudies.filter(
    (study) => study.slug === "visualsplit" || study.slug === "x360"
  );
  const enterpriseEvidence = profileEvidence.filter(
    (item) => item.track === "enterprise"
  );
  const researchEvidence = profileEvidence.filter(
    (item) => item.track === "research"
  );
  const currentUpdates = newsItems.slice(0, 3);
  const archivedUpdates = newsItems.slice(3);
  const secondaryContactEmails = profile.contactEmails.filter(
    (contact) => contact.address !== profile.primaryContact.address
  );

  return (
    <div id="top" className="bg-paper text-ink">
      <StructuredData data={structuredData} />
      <SiteHeader sections={sections} />

      <main>
        <section className="border-b border-line pt-28 sm:pt-32">
          <div className="hero-stage relative overflow-hidden">
            <div className="site-container relative z-10 grid gap-12 py-12 sm:py-16 lg:grid-cols-[minmax(0,1fr)_19rem] lg:items-start lg:gap-20 lg:py-20">
              <div className="max-w-3xl">
                <p className="meta-label">{profile.positioning}</p>
                <h1 className="mt-6 font-display text-[clamp(3.5rem,15vw,4.2rem)] font-normal leading-[0.9] tracking-[-0.03em] text-ink sm:text-[clamp(4.25rem,10vw,7.75rem)] sm:tracking-[-0.035em]">
                  {profile.name}
                </h1>
                <p className="mt-8 max-w-2xl text-xl leading-8 text-ink sm:text-2xl sm:leading-9">
                  {profile.shortBio}
                </p>
                <p className="mt-5 max-w-2xl text-base leading-8 text-muted sm:text-lg">
                  {profile.bio}
                </p>

                <div className="mt-8 flex flex-wrap gap-x-5 gap-y-1 border-t border-line pt-5">
                  {profile.links
                    .filter((link) =>
                      [
                        "email",
                        "linkedin",
                        "scholar",
                        "github",
                        "orcid"
                      ].includes(link.kind)
                    )
                    .map((link) => (
                      <TextLink
                        key={link.label}
                        href={link.href}
                        external={link.external ?? link.kind !== "email"}
                      >
                        {link.label}
                      </TextLink>
                    ))}
                </div>
                <p className="mt-5 text-sm text-muted">{profile.affiliation}</p>
              </div>

              <HeroPortrait
                src={profile.heroImage}
                alt="Portrait of Chenyuan Qu"
              />
            </div>
          </div>

          <div className="border-t border-line">
            <div className="site-container grid lg:grid-cols-2">
              {[
                {
                  id: "enterprise-evidence",
                  label: "Enterprise AI",
                  linkLabel: "See industry work",
                  href: "#enterprise",
                  items: enterpriseEvidence
                },
                {
                  id: "research-evidence",
                  label: "Research",
                  linkLabel: "See research",
                  href: "#work",
                  items: researchEvidence
                }
              ].map((track, trackIndex) => (
                <div
                  key={track.id}
                  className={`py-9 sm:py-10 lg:py-12 ${
                    trackIndex === 0
                      ? "border-b border-line lg:border-b-0 lg:border-r lg:pr-10"
                      : "lg:pl-10"
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-5">
                    <h2 id={track.id} className="text-sm font-semibold text-ink">
                      {track.label}
                    </h2>
                    <a
                      href={track.href}
                      className="font-mono text-[0.62rem] uppercase tracking-[0.12em] text-muted underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent"
                    >
                      {track.linkLabel}
                    </a>
                  </div>
                  <dl className="mt-7 grid gap-6 sm:grid-cols-3 sm:gap-5">
                    {track.items.map((item) => (
                      <div key={`${item.value}-${item.label}`} className="border-t border-line pt-4">
                        <dt>
                          <span className="block font-display text-[2rem] font-normal leading-none tracking-[-0.025em] text-ink">
                            {item.value}
                          </span>
                          <span className="mt-2 block text-sm font-semibold text-ink">
                            {item.label}
                          </span>
                        </dt>
                        <dd className="mt-2 text-xs leading-5 text-muted">
                          {item.detail}
                        </dd>
                      </div>
                    ))}
                  </dl>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section id="enterprise" className="border-b border-line bg-surface/45">
          <div className="site-container section-shell">
            <header className="grid gap-5 border-b border-line pb-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:pb-12">
              <p className="section-kicker">Enterprise AI</p>
              <div>
                <h2 className="section-title">
                  Turning real business problems into useful AI.
                </h2>
                <p className="mt-5 max-w-3xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  My work usually starts by speaking with customers or colleagues,
                  understanding where time is being lost, and then building and
                  improving a tool until it works well in day-to-day use.
                </p>
              </div>
            </header>

            <div>
              {enterpriseCaseStudies.map((study) => (
                <article
                  key={study.slug}
                  id={`enterprise-${study.slug}`}
                  className="grid gap-8 border-b border-line py-12 last:border-b-0 last:pb-0 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:py-16"
                >
                  <aside>
                    <p className="font-mono text-[0.68rem] text-signal">
                      {study.index}
                    </p>
                    <p className="mt-3 max-w-[9rem] font-mono text-[0.62rem] uppercase leading-5 tracking-[0.12em] text-muted">
                      {study.eyebrow}
                    </p>
                  </aside>

                  <div>
                    <h3 className="max-w-4xl font-display text-[clamp(2.25rem,5vw,4.25rem)] font-normal leading-[1.02] tracking-[-0.025em] text-ink">
                      {study.title}
                    </h3>
                    <p className="mt-6 max-w-3xl text-lg leading-8 text-ink sm:text-xl sm:leading-9">
                      {study.summary}
                    </p>

                    <div className="mt-10 grid gap-8 border-t border-line pt-8 lg:grid-cols-2 lg:gap-12">
                      <div>
                        <p className="meta-label">What I did</p>
                        <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                          {study.contribution}
                        </p>
                      </div>
                      <div>
                        <p className="meta-label">{study.outcomeLabel}</p>
                        <p className="mt-3 text-sm leading-7 text-muted sm:text-base">
                          {study.outcome}
                        </p>
                      </div>
                    </div>

                    <CaseFlow label="How it works" steps={study.system} />

                    <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-baseline sm:gap-6">
                      <p className="meta-label shrink-0">Tools and skills</p>
                      <ul
                        className="flex flex-wrap gap-x-5 gap-y-2"
                        aria-label={`${study.title} tools and skills`}
                      >
                        {study.capabilities.map((capability) => (
                          <li
                            key={capability}
                            className="font-mono text-[0.62rem] uppercase tracking-[0.1em] text-muted"
                          >
                            {capability}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        <ResearchThreadExperience threads={researchThreads}>
          <CaseStudyScroller
            studies={selectedResearch}
            researchThreads={researchThreads}
          />

          <PublicationsExperience
            publications={publications}
            projects={projects}
            researchThreads={researchThreads}
          />
        </ResearchThreadExperience>

        <section id="journey" className="border-t border-line bg-surface/35">
          <div className="site-container section-shell">
            <header className="grid gap-5 border-b border-line pb-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:pb-12">
              <p className="section-kicker">Experience</p>
              <div>
                <h2 className="section-title">Experience &amp; education</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  The work and study that shaped how I build, lead, and research.
                </p>
              </div>
            </header>

            <div className="mt-12 grid gap-14 xl:grid-cols-2 xl:gap-16">
              <div>
                <h3 className="border-b border-line pb-4 font-display text-2xl font-normal">Research appointments</h3>
                {academicExperience.map((item, index) => (
                  <TimelineGroup key={`${item.organisation}-${item.period}`} group={item} index={index} />
                ))}
                <div className="mt-10 border-t border-line pt-6">
                  <h3 className="font-display text-2xl font-normal">Education</h3>
                  {education.map((item, index) => (
                    <TimelineItem key={`${item.title}-${item.organisation}`} item={item} index={index} />
                  ))}
                </div>
              </div>

              <div>
                <h3 className="border-b border-line pb-4 font-display text-2xl font-normal">Industry experience</h3>
                {industryExperience.map((item, index) => (
                  <TimelineGroup key={`${item.organisation}-${item.period}`} group={item} index={index} />
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="updates" className="border-t border-line bg-paper">
          <div className="site-container section-shell">
            <header className="grid gap-5 border-b border-line pb-10 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10 lg:pb-12">
              <p className="section-kicker">News</p>
              <div>
                <h2 className="section-title">Recent updates</h2>
                <p className="mt-5 max-w-2xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  Recent milestones from my work, research, and professional development.
                </p>
              </div>
            </header>

            <div>
              {currentUpdates.map((item) => (
                <article key={`${item.date}-${item.title}`} className="grid gap-3 border-b border-line py-7 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:gap-8">
                  <time className="font-mono text-[0.64rem] uppercase tracking-[0.1em] text-muted">{item.date}</time>
                  <div>
                    <h3 className="font-display text-2xl font-normal leading-tight sm:text-[1.7rem]">{item.title}</h3>
                    <p className="mt-3 max-w-3xl text-sm leading-7 text-muted sm:text-base">{item.detail}</p>
                  </div>
                  {item.href ? <TextLink href={item.href} className="md:justify-self-end">Read more</TextLink> : null}
                </article>
              ))}
            </div>

            {archivedUpdates.length > 0 ? (
              <details className="group mt-6 border-b border-line">
                <summary className="flex min-h-14 cursor-pointer list-none items-center py-4 text-sm font-semibold marker:content-none">
                  Earlier updates
                </summary>
                <div className="pb-5">
                  {archivedUpdates.map((item, index) => (
                    <article key={`${item.date}-${item.title}`} className="grid gap-3 border-t border-line py-6 md:grid-cols-[8rem_minmax(0,1fr)_auto] md:gap-6">
                      <time className="font-mono text-[0.65rem] uppercase tracking-[0.12em] text-muted">{item.date}</time>
                      <div>
                        <h3 className="text-lg font-semibold">{item.title}</h3>
                        <p className="mt-2 max-w-3xl text-sm leading-7 text-muted">{item.detail}</p>
                      </div>
                      {item.href ? <TextLink href={item.href}>Read more</TextLink> : null}
                    </article>
                  ))}
                </div>
              </details>
            ) : null}
          </div>
        </section>

        <section id="contact" className="border-t border-line bg-surface/55">
          <div className="site-container py-14 sm:py-16 lg:py-20">
            <div className="grid gap-8 md:grid-cols-[10rem_minmax(0,1fr)] md:gap-10">
              <h2 className="section-kicker">Contact</h2>
              <div>
                <p className="max-w-xl text-base leading-7 text-muted sm:text-lg sm:leading-8">
                  If you would like to talk about applied AI, computer vision, or a potential role, email is the easiest way to reach me.
                </p>
                <a
                  href={profile.primaryContact.href}
                  className="mt-5 inline-block max-w-full break-all border-b border-ink/30 pb-1 font-display text-[clamp(1.6rem,4.8vw,3rem)] leading-tight text-ink transition-colors hover:border-ink hover:text-accent sm:break-normal"
                >
                  {profile.primaryContact.address}
                </a>
                <address className="mt-9 max-w-3xl border-t border-line pt-5 not-italic">
                  <p className="section-kicker">Other addresses</p>
                  <dl className="mt-4 divide-y divide-line border-b border-line">
                    {secondaryContactEmails.map((contact) => (
                      <div
                        key={contact.address}
                        className="grid gap-1 py-3.5 sm:grid-cols-[12rem_minmax(0,1fr)] sm:items-baseline sm:gap-6"
                      >
                        <dt className="text-sm text-muted">{contact.label}</dt>
                        <dd>
                          <a
                            href={contact.href}
                            className="break-all text-base text-ink underline decoration-ink/20 underline-offset-4 transition-colors hover:text-accent sm:break-normal"
                          >
                            {contact.address}
                          </a>
                        </dd>
                      </div>
                    ))}
                  </dl>
                </address>
              </div>
            </div>

            <footer className="mt-12 flex flex-col gap-5 border-t border-line pt-6 text-sm text-muted md:flex-row md:items-center md:justify-between">
              <p>© {new Date().getFullYear()} Chenyuan Qu.</p>
              <div className="flex flex-wrap gap-x-5 gap-y-2">
                {profile.links
                  .filter((link) => link.kind !== "email")
                  .map((link) => (
                    <a key={link.label} href={link.href} target="_blank" rel="noreferrer" className="underline decoration-ink/20 underline-offset-4 transition-colors hover:text-ink">
                      {link.label}
                    </a>
                  ))}
              </div>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
