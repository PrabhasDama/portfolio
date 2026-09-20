import type { ReactNode } from "react";
import { ArrowUpRight } from "lucide-react";

export function Tag({ children }: { children: ReactNode }) {
  return <span className="tag">{children}</span>;
}

export function SectionHeading({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-heading">
      <h2>
        <span className="section-number">{number}</span>
        {title}
      </h2>
      {description && <p>{description}</p>}
    </div>
  );
}

export function Arrow({ className = "" }: { className?: string }) {
  return (
    <ArrowUpRight
      className={`link-arrow ${className}`}
      size={18}
      aria-hidden="true"
    />
  );
}

export function PersonalLink({
  label,
  href,
  className = "",
}: {
  label: string;
  href: string | null;
  className?: string;
}) {
  if (!href)
    return (
      <span
        className={`personal-link is-unavailable ${className}`}
        aria-label={`${label} — link coming soon`}
      >
        {label}
        <span className="coming-soon">Soon</span>
      </span>
    );
  return (
    <a
      className={`personal-link ${className}`}
      href={href}
      target={href.startsWith("mailto:") ? undefined : "_blank"}
      rel="noreferrer"
    >
      {label}
      <Arrow />
    </a>
  );
}
