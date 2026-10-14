import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main" className="page">
      <header className="page-header">
        <p className="kicker">404</p>
        <h1>Nothing at this address</h1>
        <p>
          It may have moved, or I haven’t made it yet.{" "}
          <Link href="/">Go to the homepage →</Link>
        </p>
      </header>
    </main>
  );
}
