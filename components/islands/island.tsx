import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Plus } from "lucide-react";

export function Island({
  className = "",
  ...props
}: ComponentPropsWithoutRef<"div">) {
  return <div className={`island ${className}`} {...props} />;
}

export function ExpandableIsland({
  title,
  summary,
  children,
  index,
}: {
  title: string;
  summary: string;
  children: ReactNode;
  index: string;
}) {
  return (
    <details className="island expandable-island">
      <summary>
        <span className="expand-index">{index}</span>
        <span className="expand-label">
          <strong>{title}</strong>
          <span>{summary}</span>
        </span>
        <Plus size={20} className="expand-icon" aria-hidden="true" />
      </summary>
      <div className="expanded-content">{children}</div>
    </details>
  );
}
