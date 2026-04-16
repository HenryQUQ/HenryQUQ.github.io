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
        <div className="relative overflow-hidden rounded-[1.35rem] bg-stone/70">
          {project.image ? (
            <div className="relative aspect-[5/4]">
              <Image
                src={project.image}
                alt={project.title}
                fill
                className="object-cover"
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
          <h3 className="mt-5 font-display text-3xl tracking-tight text-ink sm:text-[2rem]">
            {project.title}
          </h3>
          <p className="mt-4 max-w-reading text-base leading-8 text-ink/84">
            {project.summary}
          </p>
          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-3">
            {project.links.map((link) => (
              <TextLink key={link.label} href={link.href}>
                {link.label}
              </TextLink>
            ))}
          </div>
        </div>
      </article>
    </Reveal>
  );
}

