import { StructuredData } from "./structured-data";
import {
  organisationLinks,
  personLinks,
  profile,
  publications,
} from "@/src/data/site";
import {
  getPrimaryPublicationHref,
  getPublicationDoiUrl,
} from "@/src/lib/publications";
import { absoluteUrl } from "@/src/lib/site-config";

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": `${absoluteUrl("/")}#person`,
  name: profile.name,
  alternateName: profile.englishName,
  url: absoluteUrl("/"),
  image: absoluteUrl(profile.heroImage),
  description: profile.bio,
  email: profile.email,
  jobTitle: profile.role,
  worksFor: {
    "@type": "Organization",
    name: "Allsee",
  },
  affiliation: [
    {
      "@type": "Organization",
      name: "Allsee",
      url: organisationLinks.find(
        (organisation) => organisation.label === "Allsee",
      )?.href,
    },
    {
      "@type": "Organization",
      name: "Vieunite",
      url: organisationLinks.find(
        (organisation) => organisation.label === "Vieunite",
      )?.href,
    },
    {
      "@type": "Organization",
      name: "University of Birmingham",
      url: organisationLinks.find(
        (organisation) => organisation.label === "University of Birmingham",
      )?.href,
    },
  ],
  alumniOf: [
    { "@type": "CollegeOrUniversity", name: "University of Birmingham" },
    { "@type": "CollegeOrUniversity", name: "University of Southampton" },
  ],
  sameAs: profile.links
    .filter((link) => link.kind !== "email")
    .map((link) => link.href),
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
      ? {
          "@type": "PropertyValue",
          propertyID: "arXiv",
          value: publication.arxivId,
        }
      : null,
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
      publication.doi ? getPublicationDoiUrl(publication.doi) : null,
    ].filter(Boolean),
    identifier: identifiers.length > 0 ? identifiers : undefined,
  };
});

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [personSchema, ...publicationSchemas],
};

export function ProfileSchema() {
  return <StructuredData data={structuredData} />;
}
