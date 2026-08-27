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
        "group inline-flex min-h-10 items-center py-1 text-sm text-accent transition-[color,opacity,transform] duration-150 hover:text-ink active:scale-[0.98] active:opacity-70 motion-reduce:transform-none motion-reduce:transition-none",
        className
      )}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span className="border-b border-accent/30 pb-px transition-colors duration-150 group-hover:border-ink motion-reduce:transition-none">
        {children}
      </span>
    </a>
  );
}
