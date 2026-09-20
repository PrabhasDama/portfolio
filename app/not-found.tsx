import Link from "next/link";
import { ArrowLeft } from "lucide-react";

export default function NotFound() {
  return (
    <main id="main" className="page-container not-found">
      <p className="eyebrow">404 / A small detour</p>
      <h1>
        Nothing here.
        <br />
        <span>Plenty to explore.</span>
      </h1>
      <p>This page may have moved, or hasn’t been built yet.</p>
      <Link className="button button-primary" href="/">
        <ArrowLeft size={17} aria-hidden="true" />
        Back to the work
      </Link>
    </main>
  );
}
