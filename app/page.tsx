import Image from "next/image";

import { PublicationsExperience } from "@/components/publications-experience";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { TextLink } from "@/components/text-link";
import { TimelineItem } from "@/components/timeline-item";
import {
  education,
  experience,
  newsItems,
  profile,
  projects,
  publications,
  researchInterests,
  sections,
  selectedPublicationSlugs
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
      name: "Allsee"
    },
    {
      "@type": "Organization",
      name: "Vieunite"
    },
    {
      "@type": "Organization",
      name: "University of Birmingham"
    }
  ],
  alumniOf: [
    {
      "@type": "CollegeOrUniversity",
      name: "University of Birmingham"
    },
    {
      "@type": "CollegeOrUniversity",
      name: "University of Southampton"
    }
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
      ? {
          "@type": "PropertyValue",
          propertyID: "DOI",
          value: publication.doi
        }
      : null,
    publication.arxivId
      ? {
          "@type": "PropertyValue",
          propertyID: "arXiv",
          value: publication.arxivId
        }
      : null
  ].filter(
    (
      value
    ): value is {
      "@type": "PropertyValue";
      propertyID: string;
      value: string;
    } => Boolean(value)
  );

  return {
    "@type": "ScholarlyArticle",
    "@id": `${absoluteUrl("/")}#publication-${publication.slug}`,
    name: publication.title,
    headline: publication.title,
    url: primaryUrl,
    mainEntityOfPage: primaryUrl,
    author: publication.authorList.map((author) => ({
      "@type": "Person",
      name: author
    })),
    datePublished: `${publication.year}`,
    description: publication.summary,
    isPartOf: {
      "@type": "CreativeWork",
      name: publication.venue
    },
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
  return (
    <div className="bg-paper text-ink">
      <StructuredData data={structuredData} />
      <SiteHeader sections={sections} />

      <main>
        <section
          id="about"
          className="relative isolate min-h-[100svh] overflow-hidden"
        >
          <div className="pointer-events-none absolute inset-0">
            <Image
              src={profile.heroBackgroundImageMobile}
              alt=""
              fill
              priority
              sizes="100vw"
              className="object-cover object-center md:hidden"
            />
            <Image
              src={profile.heroBackgroundImageDesktop}
              alt=""
              fill
              priority
              sizes="100vw"
              className="hidden object-cover object-center md:block"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,239,232,0.988)_0%,rgba(243,239,232,0.97)_26%,rgba(243,239,232,0.9)_40%,rgba(243,239,232,0.64)_56%,rgba(243,239,232,0.22)_76%,rgba(243,239,232,0.08)_100%)] md:bg-[linear-gradient(90deg,rgba(243,239,232,0.992)_0%,rgba(243,239,232,0.972)_24%,rgba(243,239,232,0.88)_38%,rgba(243,239,232,0.52)_54%,rgba(243,239,232,0.16)_72%,rgba(243,239,232,0.04)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,239,232,0.16)_0%,rgba(243,239,232,0.04)_36%,rgba(243,239,232,0.4)_100%)] md:bg-[linear-gradient(180deg,rgba(243,239,232,0.12)_0%,rgba(243,239,232,0.01)_44%,rgba(243,239,232,0.22)_100%)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_14%_30%,rgba(255,255,255,0.28)_0%,rgba(255,255,255,0.07)_24%,rgba(255,255,255,0)_48%)]" />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-14 pt-24 sm:px-8 md:items-center md:pb-20 md:pt-28 lg:px-12">
            <div className="max-w-[18rem] sm:max-w-[23rem] md:max-w-[28rem] lg:max-w-[31rem] xl:max-w-[33rem] md:-translate-y-10 lg:-translate-y-12">
              <Reveal>
                <p className="meta-label">Computer Vision · Multimodal Learning</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-4 font-display text-[3.35rem] leading-[0.9] tracking-[-0.05em] text-ink sm:text-[5rem] lg:text-[6.25rem] xl:text-[6.8rem]">
                  {profile.name}
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <div className="mt-6 flex flex-col gap-2 text-[1.05rem] leading-8 text-muted sm:flex-row sm:flex-wrap sm:items-center sm:gap-4 sm:text-lg">
                  <span>{profile.role}</span>
                  <span className="hidden h-1 w-1 rounded-full bg-muted/50 sm:inline-block" />
                  <span>{profile.affiliation}</span>
                </div>
              </Reveal>
              <Reveal delay={0.22}>
                <p className="mt-7 max-w-[20rem] text-balance text-[0.98rem] leading-8 text-ink/88 sm:mt-8 sm:max-w-reading sm:text-xl sm:leading-9">
                  {profile.bio}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-8 flex max-w-[19.5rem] flex-wrap gap-x-5 gap-y-3 sm:mt-10 sm:max-w-none sm:gap-x-6">
                  {profile.links.map((link) => (
                    <TextLink
                      key={link.label}
                      href={link.href}
                      external={link.external ?? true}
                      className="text-[0.9rem] sm:text-[0.95rem]"
                    >
                      {link.label}
                    </TextLink>
                  ))}
                </div>
              </Reveal>
            </div>
          </div>
        </section>

        <section id="research" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="Research"
              title="Research Interests"
            />
            <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal>
                <p className="max-w-reading text-base leading-8 text-ink/82 sm:text-lg">
                  My recent work spans interpretable image representations,
                  multimodal scene understanding, diffusion-based methods, and
                  dataset-building for visual learning.
                </p>
              </Reveal>
              <div>
                {researchInterests.map((interest, index) => (
                  <Reveal key={interest.title} delay={index * 0.05}>
                    <div className="grid gap-3 border-t border-line py-6 md:grid-cols-[12rem_minmax(0,1fr)] md:gap-8">
                      <p className="meta-label pt-1">{interest.title}</p>
                      <p className="max-w-reading text-base leading-8 text-ink/84">
                        {interest.detail}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </section>

        <PublicationsExperience
          publications={publications}
          projects={projects}
          selectedPublicationSlugs={selectedPublicationSlugs}
        />

        <section id="news" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="News"
              title="Recent News"
            />
            <div className="mt-12">
              {newsItems.map((item, index) => (
                <Reveal key={`${item.date}-${item.title}`} delay={index * 0.04}>
                  <div className="grid gap-4 border-t border-line py-6 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-8">
                    <div className="meta-label pt-1">{item.date}</div>
                    <div>
                      <h3 className="font-display text-2xl text-ink">{item.title}</h3>
                      <p className="mt-3 max-w-reading text-base leading-8 text-ink/84">
                        {item.detail}
                      </p>
                      {item.href ? (
                        <div className="mt-4">
                          <TextLink href={item.href}>Source</TextLink>
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section id="experience" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="Experience"
              title="Professional Experience"
            />
            <div className="mt-12">
              {experience.map((item, index) => (
                <TimelineItem
                  key={`${item.title}-${item.organisation}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="Education"
              title="Academic Training"
            />
            <div className="mt-12">
              {education.map((item, index) => (
                <TimelineItem
                  key={`${item.title}-${item.organisation}`}
                  item={item}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="contact" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 lg:px-12">
            <Reveal>
              <div className="grid gap-10 md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
                <div>
                  <p className="meta-label">Contact</p>
                  <h2 className="mt-4 max-w-3xl font-display text-4xl tracking-tight text-ink sm:text-5xl">
                    Contact
                  </h2>
                  <p className="mt-5 max-w-reading text-base leading-8 text-muted sm:text-lg">
                    The easiest way to reach me is by email.
                  </p>
                </div>
                <address className="grid gap-5 not-italic md:justify-items-end md:text-right">
                  {profile.contactEmails.map((contactEmail) => (
                    <div
                      key={contactEmail.address}
                      className="flex flex-col gap-1 md:items-end"
                    >
                      <p className="meta-label">{contactEmail.label}</p>
                      <TextLink
                        href={contactEmail.href}
                        external={false}
                        className="text-lg"
                      >
                        {contactEmail.address}
                      </TextLink>
                    </div>
                  ))}
                </address>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="section-rule">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-muted sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>Chenyuan Qu · Personal website.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {profile.links.map((link) => (
              <TextLink
                key={link.label}
                href={link.href}
                external={link.external ?? true}
              >
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
