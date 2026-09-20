import Link from "next/link";
import { ArrowUp } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <Link className="footer-signature" href="/">
        pd<span>.</span>
      </Link>
      <p>© {new Date().getFullYear()} Prabhas Dama</p>
      <a href="#top" className="back-to-top">
        Back to top <ArrowUp size={14} aria-hidden="true" />
      </a>
    </footer>
  );
}
