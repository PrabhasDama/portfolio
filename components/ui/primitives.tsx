import type { ReactNode } from "react";

/** A section with its label set in the left margin on wide screens. */
export function Section({
  id,
  label,
  children,
  className = "",
}: {
  id?: string;
  label: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`section ${className}`} aria-label={label}>
      <h2 className="section-label">{label}</h2>
      <div className="section-body">{children}</div>
    </section>
  );
}

export function OutLink({
  href,
  children,
}: {
  href: string;
  children: ReactNode;
}) {
  const external = !href.startsWith("mailto:") && !href.startsWith("/");
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}
