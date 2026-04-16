import { ArrowUpRight } from "lucide-react";

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
        "group inline-flex items-center gap-1.5 text-sm text-ink/82 hover:text-ink",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="border-b border-transparent pb-px group-hover:border-current">
        {children}
      </span>
      {external ? (
        <ArrowUpRight className="h-3.5 w-3.5 text-accent transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
      ) : null}
    </a>
  );
}

