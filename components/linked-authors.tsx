import type { Publication } from "@/src/data/site";

type LinkedAuthorsProps = {
  publication: Publication;
  className?: string;
};

export function LinkedAuthors({ publication, className }: LinkedAuthorsProps) {
  const linksByName = new Map(
    publication.authorLinks?.map((author) => [author.name, author.href])
  );

  return (
    <p className={className}>
      {publication.authorList.map((author, index) => {
        const href = linksByName.get(author);
        const suffix = index < publication.authorList.length - 1 ? ", " : "";

        if (!href) {
          return (
            <span key={author}>
              {author}
              {suffix}
            </span>
          );
        }

        return (
          <span key={author}>
            <a
              href={href}
              target="_blank"
              rel="noreferrer"
              className="border-b border-transparent transition-colors hover:border-current hover:text-ink focus-visible:border-current focus-visible:text-ink focus-visible:outline-none"
            >
              {author}
            </a>
            {suffix}
          </span>
        );
      })}
    </p>
  );
}
