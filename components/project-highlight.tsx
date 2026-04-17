import Image from "next/image";

import { Project } from "@/src/data/site";

import { Reveal } from "./reveal";
import { TextLink } from "./text-link";

type ProjectHighlightProps = {
  project: Project;
  index: number;
};

export function ProjectHighlight({ project, index }: ProjectHighlightProps) {
  return (
    <Reveal delay={index * 0.05}>
      <article className="grid gap-6 border-t border-line py-8 lg:grid-cols-[18rem_minmax(0,1fr)] lg:items-start lg:gap-10">
        <div className="relative overflow-hidden rounded-[1.2rem] bg-stone/65 sm:rounded-[1.35rem]">
          {project.image ? (
            <div className="relative aspect-[5/4]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                sizes="(max-width: 1024px) 100vw, 18rem"
                className={
                  project.imageFit === "contain"
                    ? "object-contain p-4 sm:p-5"
                    : "object-cover"
                }
              />
            </div>
          ) : (
            <div className="paper-grid hero-shadow flex aspect-[5/4] items-end justify-start rounded-[1.35rem] border border-white/60 px-6 py-5">
              <span className="meta-label text-accent">{project.year}</span>
            </div>
          )}
        </div>
        <div>
          <div className="flex items-center gap-4">
            <p className="meta-label">{project.year}</p>
            <div className="h-px flex-1 bg-line" />
          </div>
          <h3 className="mt-4 font-display text-[2.15rem] tracking-tight text-ink sm:mt-5 sm:text-[2rem] lg:text-[2.35rem]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-reading text-[0.98rem] leading-8 text-ink/84 sm:text-base">
            {project.summary}
          </p>
          <div className="mt-5 flex flex-wrap gap-x-4 gap-y-3 sm:mt-6 sm:gap-x-5">
            {project.links.map((link) => (
              <TextLink
                key={`${project.title}-${link.kind}-${link.label}`}
                href={link.href}
                external={link.external ?? true}
              >
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}
