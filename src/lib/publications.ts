import { Project, Publication } from "@/src/data/site";

const primaryLinkOrder = ["project", "paper", "arxiv", "doi", "code", "dataset"];

export function groupPublicationsByYear(publications: Publication[]) {
  const grouped = new Map<number, Publication[]>();

  publications.forEach((publication) => {
    const existing = grouped.get(publication.year) ?? [];
    existing.push(publication);
    grouped.set(publication.year, existing);
  });

  return Array.from(grouped.entries()).sort(([yearA], [yearB]) => yearB - yearA);
}

export function getPublicationDoiUrl(doi: string) {
  return `https://doi.org/${doi}`;
}

export function getPrimaryPublicationHref(publication: Publication) {
  for (const kind of primaryLinkOrder) {
    const match = publication.links.find((link) => link.kind === kind);
    if (match) {
      return match.href;
    }
  }

  if (publication.doi) {
    return getPublicationDoiUrl(publication.doi);
  }

  return undefined;
}

export function getPublicationProjectLinks(
  publication: Publication,
  project?: Project
) {
  return (
    project?.links.filter(
      (projectLink) =>
        !publication.links.some(
          (publicationLink) =>
            publicationLink.href === projectLink.href ||
            (publicationLink.kind === projectLink.kind &&
              publicationLink.label === projectLink.label)
        )
    ) ?? []
  );
}
