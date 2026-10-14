export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Prabhas Dama</p>
      <a href="#main">
        top <span className="arrow arrow-up">↑</span>
      </a>
    </footer>
  );
}
