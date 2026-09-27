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
  external = true,
}: TextLinkProps) {
  return (
    <a
      href={href}
      className={cn("text-link", className)}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      <span>{children}</span>
    </a>
  );
}
