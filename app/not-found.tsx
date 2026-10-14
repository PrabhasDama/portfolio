import Link from "next/link";
import { PathCrumb } from "@/components/ui/primitives";

export default function NotFound() {
  return (
    <main id="main" className="page">
      <header className="page-header">
        <PathCrumb parts={[["404", "/404/"]]} />
        <h1>Nothing at this address</h1>
        <p>
          It may have moved, or I haven’t made it yet.{" "}
          <Link href="/">
            Go to the homepage <span className="arrow">→</span>
          </Link>
        </p>
      </header>
    </main>
  );
}
