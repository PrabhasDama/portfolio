import type { ReactNode } from "react";
import Link from "next/link";

/** A page section headed by a path-style label and a hairline rule. */
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
      <h2 className="section-label">
        <span aria-hidden="true">/</span>
        {label.toLowerCase()}
      </h2>
      {children}
    </section>
  );
}

export function OutLink({
  href,
  children,
  className,
}: {
  href: string;
  children: ReactNode;
  className?: string;
}) {
  const external = !href.startsWith("mailto:") && !href.startsWith("/");
  return (
    <a
      href={href}
      className={className}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
    >
      {children}
    </a>
  );
}

/** A file-path style breadcrumb, e.g. ~/work/caltrack. Pass [label, href] pairs; the last is the current page. */
export function PathCrumb({ parts }: { parts: [string, string][] }) {
  return (
    <p className="kicker path-crumb">
      <Link href="/">~</Link>
      {parts.map(([label, href], index) => (
        <span key={href}>
          /
          {index === parts.length - 1 ? (
            <span aria-current="page">{label}</span>
          ) : (
            <Link href={href}>{label}</Link>
          )}
        </span>
      ))}
    </p>
  );
}
