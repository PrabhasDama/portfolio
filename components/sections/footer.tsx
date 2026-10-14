const commit = process.env.NEXT_PUBLIC_BUILD_COMMIT;
const built = process.env.NEXT_PUBLIC_BUILD_DATE;

export function Footer() {
  return (
    <footer className="footer">
      <p>© {new Date().getFullYear()} Prabhas Dama</p>
      <p>
        {built && <>built {built}</>}
        {commit && <> from {commit}</>}
        {built && " · "}Newsreader + Plex Mono · Next.js
      </p>
      <a href="#main">
        top <span className="arrow arrow-up">↑</span>
      </a>
    </footer>
  );
}
