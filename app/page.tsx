import Image from "next/image";
import { ArrowDown, ArrowUpRight, Plus } from "lucide-react";
import { SiteHeader } from "@/components/site-header";
import { PortraitPoster } from "@/components/portrait-poster";
import { WorkShowcase } from "@/components/work-showcase";
import { ResearchStories } from "@/components/research-stories";
import { PublicationLibrary } from "@/components/publication-library";
import { ProfileSchema } from "@/components/profile-schema";
import { Reveal } from "@/components/reveal";
import {
  education,
  experience,
  homeContent,
  newsItems,
  profile,
  sections,
} from "@/src/data/site";
import { withBasePath } from "@/src/lib/site-config";

export default function HomePage() {
  const [firstName, ...lastName] = profile.name.split(" ");
  return (
    <div id="top">
      <ProfileSchema />
      <SiteHeader sections={sections} />
      <main id="main" tabIndex={-1}>
        <section className="hero" aria-labelledby="intro-title">
          <div className="site-container">
            <div className="hero-masthead">
              <p className="eyebrow">{homeContent.hero.greeting}</p>
              <h1 id="intro-title">
                {firstName}
                <span className="hero-surname"> {lastName.join(" ")}.</span>
              </h1>
            </div>
            <div className="hero-grid">
              <div className="hero-intro">
                <p className="hero-name-note">
                  You can call me <em>{profile.englishName}</em>.
                </p>
                <p className="hero-lede">{profile.shortBio}</p>
                <p className="hero-note">{homeContent.hero.note}</p>
                <a className="hero-cta" href="#enterprise">
                  Explore my work <ArrowDown size={18} aria-hidden="true" />
                </a>
              </div>
              <PortraitPoster />
            </div>
            <div className="hero-foot">
              <span>{profile.location}</span>
              <span>{homeContent.hero.footer}</span>
            </div>
          </div>
        </section>

        <section
          id="enterprise"
          className="work-section section-space"
          aria-labelledby="work-title"
        >
          <div className="site-container">
            <Reveal>
              <header className="section-heading">
                <div>
                  <p className="eyebrow">{homeContent.work.label}</p>
                  <h2 id="work-title">{homeContent.work.title}</h2>
                </div>
                <p>{homeContent.work.intro}</p>
              </header>
            </Reveal>
            <Reveal>
              <WorkShowcase />
            </Reveal>
          </div>
        </section>

        <section
          id="research"
          className="research-section section-space"
          aria-labelledby="research-title"
        >
          <div className="site-container">
            <Reveal>
              <header className="section-heading research-heading">
                <div>
                  <p className="eyebrow">{homeContent.research.label}</p>
                  <h2 id="research-title">{homeContent.research.title}</h2>
                </div>
                <p>{homeContent.research.intro}</p>
              </header>
            </Reveal>
            <Reveal>
              <ResearchStories />
            </Reveal>
            <PublicationLibrary />
          </div>
        </section>

        <section
          id="journey"
          className="about-section"
          aria-labelledby="about-title"
        >
          <figure className="about-scene">
            <Image
              src={withBasePath(homeContent.about.image)}
              fill
              sizes="100vw"
              alt={homeContent.about.imageAlt}
            />
            <figcaption className="site-container">
              <Reveal>
                <p className="eyebrow">{homeContent.about.label}</p>
                <h2 id="about-title">{homeContent.about.title}</h2>
              </Reveal>
              <span>{homeContent.about.caption}</span>
            </figcaption>
          </figure>
          <div className="site-container section-space">
            <div className="about-grid">
              <Reveal className="about-introduction">
                <p className="eyebrow">A little about me</p>
                <h3>{homeContent.about.introduction}</h3>
              </Reveal>
              <Reveal className="about-copy">
                {homeContent.about.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
                <a
                  className="text-arrow"
                  href={
                    profile.links.find((link) => link.kind === "linkedin")!.href
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Find me on LinkedIn{" "}
                  <ArrowUpRight size={17} aria-hidden="true" />
                </a>
              </Reveal>
            </div>

            <details className="journey-detail">
              <summary>
                Experience &amp; education <Plus size={20} aria-hidden="true" />
              </summary>
              <div className="journey-grid">
                {experience.map((group) => (
                  <section key={group.organisation} className="journey-group">
                    <h3>
                      {group.organisationLinks?.map((link, index) => (
                        <span key={link.href}>
                          {index > 0 && " · "}
                          <a href={link.href} target="_blank" rel="noreferrer">
                            {link.label}
                          </a>
                        </span>
                      )) ?? group.organisation}
                    </h3>
                    {group.roles.map((role) => (
                      <div
                        className="journey-role"
                        key={`${role.title}-${role.period}`}
                      >
                        <p className="journey-date">{role.period}</p>
                        <h4>{role.title}</h4>
                        <p>{role.detail}</p>
                      </div>
                    ))}
                  </section>
                ))}
                <section className="journey-group">
                  <h3>Education</h3>
                  {education.map((item) => (
                    <div className="journey-role" key={item.title}>
                      <p className="journey-date">{item.period}</p>
                      <h4>{item.title}</h4>
                      <a
                        href={item.organisationLinks?.[0].href}
                        target="_blank"
                        rel="noreferrer"
                      >
                        {item.organisation}
                      </a>
                      <p>{item.detail}</p>
                    </div>
                  ))}
                </section>
              </div>
            </details>

            <div className="recently">
              <h3>Recently</h3>
              <div>
                {newsItems.slice(0, 3).map((item) => (
                  <article key={item.title}>
                    <span>{item.date}</span>
                    <div>
                      <h4>
                        {item.href ? (
                          <a href={item.href} target="_blank" rel="noreferrer">
                            {item.title}{" "}
                            <ArrowUpRight size={14} aria-hidden="true" />
                          </a>
                        ) : (
                          item.title
                        )}
                      </h4>
                      <p>{item.detail}</p>
                    </div>
                  </article>
                ))}
                <details className="earlier-updates">
                  <summary>
                    A few earlier moments <Plus size={15} aria-hidden="true" />
                  </summary>
                  {newsItems.slice(3).map((item) => (
                    <article key={item.title}>
                      <span>{item.date}</span>
                      <div>
                        <h4>
                          {item.href ? (
                            <a
                              href={item.href}
                              target="_blank"
                              rel="noreferrer"
                            >
                              {item.title} ↗
                            </a>
                          ) : (
                            item.title
                          )}
                        </h4>
                        <p>{item.detail}</p>
                      </div>
                    </article>
                  ))}
                </details>
              </div>
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="contact-section section-space"
          aria-labelledby="contact-title"
        >
          <div className="site-container">
            <Reveal>
              <div className="contact-heading">
                <div>
                  <p className="eyebrow">{homeContent.contact.label}</p>
                  <h2 id="contact-title">{homeContent.contact.title}</h2>
                </div>
                <p className="contact-intro">{homeContent.contact.intro}</p>
              </div>
              <a className="contact-email" href={profile.primaryContact.href}>
                {profile.primaryContact.address}
                <ArrowUpRight aria-hidden="true" />
              </a>
            </Reveal>
            <div className="contact-bottom">
              <div className="social-links">
                {profile.links
                  .filter((link) => link.kind !== "email")
                  .map((link) => (
                    <a
                      key={link.kind}
                      href={link.href}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {link.label}
                      <ArrowUpRight size={14} aria-hidden="true" />
                    </a>
                  ))}
              </div>
              <details className="other-emails">
                <summary>
                  Other ways to reach me <Plus size={15} aria-hidden="true" />
                </summary>
                <div>
                  {profile.contactEmails
                    .filter(
                      (contact) =>
                        contact.address !== profile.primaryContact.address,
                    )
                    .map((contact) => (
                      <a key={contact.address} href={contact.href}>
                        <span>{contact.label}</span>
                        {contact.address}
                      </a>
                    ))}
                </div>
              </details>
            </div>
            <footer className="site-footer">
              <a href="#top" className="site-mark" aria-label="Back to top">
                cq.
              </a>
              <span>
                {profile.name} ({profile.englishName}) · {profile.location}
              </span>
              <a href="#top">
                Back to top <ArrowUpRight size={15} aria-hidden="true" />
              </a>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}
