import { profile, type Publication } from "@/src/data/site";

type LinkedAuthorsProps = {
  publication: Publication;
  className?: string;
};

export function LinkedAuthors({ publication, className }: LinkedAuthorsProps) {
  const linksByName = new Map(
    publication.authorLinks?.map((author) => [author.name, author.href]),
  );

  return (
    <p className={className}>
      {publication.authorList.map((author, index) => {
        const href = linksByName.get(author);
        const suffix = index < publication.authorList.length - 1 ? ", " : "";
        // The site owner's own name is set in ink so authorship reads at a glance.
        const self = author === profile.name ? "author-self" : undefined;

        if (!href) {
          return (
            <span key={author}>
              <span className={self}>{author}</span>
              {suffix}
            </span>
          );
        }

        return (
          <span key={author}>
            <a href={href} target="_blank" rel="noreferrer" className={self}>
              {author}
            </a>
            {suffix}
          </span>
        );
      })}
    </p>
  );
}
