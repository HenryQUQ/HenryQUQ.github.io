import { cn } from "@/src/lib/utils";

type TextLinkProps = {
  href: string;
  children: React.ReactNode;
  className?: string;
  external?: boolean;
};

export function TextLink({
  href,
  children,
  className,
  external = true
}: TextLinkProps) {
  return (
    <a
      href={href}
      className={cn(
        "group inline-flex min-h-10 items-center py-1 text-sm text-accent hover:text-ink",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="border-b border-accent/30 pb-px group-hover:border-ink">
        {children}
      </span>
    </a>
  );
}
