import Image from "next/image";

import { ProjectHighlight } from "@/components/project-highlight";
import { PublicationFeature } from "@/components/publication-feature";
import { PublicationListItem } from "@/components/publication-list-item";
import { Reveal } from "@/components/reveal";
import { SectionHeading } from "@/components/section-heading";
import { SiteHeader } from "@/components/site-header";
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

const selectedPublications = publications.filter((publication) =>
  selectedPublicationSlugs.includes(publication.slug)
);

export default function HomePage() {
  return (
    <div className="bg-paper text-ink">
      <SiteHeader sections={sections} />

      <main>
        <section
          id="about"
          className="relative isolate min-h-[100svh] overflow-hidden"
        >
          <div className="absolute inset-0">
            <Image
              src={profile.heroImage}
              alt="Portrait of Chenyuan Qu"
              fill
              priority
              className="object-cover object-[82%_center] sm:object-[74%_center] lg:object-[67%_center]"
            />
            <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(243,239,232,0.98)_0%,rgba(243,239,232,0.95)_50%,rgba(243,239,232,0.82)_68%,rgba(243,239,232,0.28)_100%)] md:bg-[linear-gradient(90deg,rgba(243,239,232,0.97)_0%,rgba(243,239,232,0.95)_36%,rgba(243,239,232,0.68)_55%,rgba(243,239,232,0.18)_74%,rgba(243,239,232,0.06)_100%)]" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(243,239,232,0.18)_0%,rgba(243,239,232,0.08)_34%,rgba(243,239,232,0.56)_100%)] md:bg-[linear-gradient(180deg,rgba(243,239,232,0.16)_0%,rgba(243,239,232,0.06)_40%,rgba(243,239,232,0.28)_100%)]" />
          </div>
          <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl items-end px-6 pb-14 pt-24 sm:px-8 md:items-center md:pb-20 md:pt-28 lg:px-12">
            <div className="max-w-[21rem] sm:max-w-3xl">
              <Reveal>
                <p className="meta-label">Research Website</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1 className="mt-4 font-display text-[3.45rem] leading-[0.9] tracking-[-0.05em] text-ink sm:text-[5.4rem] lg:text-[7.2rem]">
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
                <p className="mt-8 max-w-reading text-balance text-[1rem] leading-8 text-ink/88 sm:text-xl sm:leading-9">
                  {profile.bio}
                </p>
              </Reveal>
              <Reveal delay={0.3}>
                <div className="mt-10 flex flex-wrap gap-x-5 gap-y-3 sm:gap-x-6">
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
              eyebrow="Research Interests"
              title="Research that moves between representation, perception, and generation."
              description="The current body of work centres on visual understanding and multimodal learning, with a sustained interest in interpretable representations and controllable generative systems."
            />
            <div className="mt-14 grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
              <Reveal>
                <p className="max-w-reading text-base leading-8 text-ink/82 sm:text-lg">
                  Public sources consistently place Chenyuan Qu&apos;s work in computer
                  vision, multimodal learning, and generative AI. Recent papers extend
                  that profile toward interpretable image representations, multimodal
                  scene understanding, and diffusion-based segmentation.
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

        <section id="selected-publications" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="Selected Publications"
              title="A concise view of the most recent and defining work."
              description="Selected papers are shown prominently to foreground current directions and project pages with supporting material."
            />
            <div className="mt-12">
              {selectedPublications.map((publication, index) => (
                <PublicationFeature
                  key={publication.slug}
                  publication={publication}
                  index={index}
                />
              ))}
            </div>
          </div>
        </section>

        <section id="publications" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="All Publications"
              title="Public record"
              description="The publication list below reflects the current public record that could be verified through Google Scholar, ORCID, and official paper or project pages."
            />
            <ul className="mt-12">
              {publications.map((publication, index) => (
                <PublicationListItem
                  key={publication.slug}
                  publication={publication}
                  index={index}
                />
              ))}
            </ul>
          </div>
        </section>

        <section id="projects" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="Project Highlights"
              title="Datasets, project pages, code, and research surfaces."
              description="Rather than repeat publication metadata, this section surfaces the supporting artefacts that make the work accessible: project pages, repositories, models, datasets, and workshop material."
            />
            <div className="mt-12">
              {projects.map((project, index) => (
                <ProjectHighlight key={project.title} project={project} index={index} />
              ))}
            </div>
          </div>
        </section>

        <section id="news" className="section-rule">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:px-8 sm:py-24 lg:px-12 lg:py-28">
            <SectionHeading
              eyebrow="News / Highlights"
              title="Recent milestones"
              description="Only high-signal milestones are included here: publication appearances, major project releases, and the doctoral timeline."
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
              title="Academic and applied work in parallel."
              description="The public profile shows a mix of doctoral research and production-facing machine-learning experience, so this timeline keeps the emphasis on scope rather than résumé-style detail."
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
              title="Training across physics and machine learning."
              description="Only the higher-education record is retained here, keeping the academic narrative focused and proportionate."
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
                    For research conversations, collaborations, or project enquiries.
                  </h2>
                  <p className="mt-5 max-w-reading text-base leading-8 text-muted sm:text-lg">
                    The most reliable public contact route is the University of Birmingham
                    student address listed on the official profile page.
                  </p>
                </div>
                <div className="md:text-right">
                  <TextLink
                    href={`mailto:${profile.email}`}
                    external={false}
                    className="text-lg"
                  >
                    {profile.email}
                  </TextLink>
                </div>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

      <footer className="section-rule">
        <div className="mx-auto flex max-w-7xl flex-col gap-6 px-6 py-8 text-sm text-muted sm:px-8 md:flex-row md:items-center md:justify-between lg:px-12">
          <p>
            Chenyuan Qu · Research website built with Next.js, TypeScript, and
            Tailwind CSS.
          </p>
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
