import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-border">
      {/* Links row */}
      <div className="relative z-10 mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 pt-12 pb-6 sm:flex-row sm:items-center sm:px-6">
        <span className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted-dim">
          mem01 · MIT
        </span>
        <div className="flex gap-8 font-mono text-[11px] tracking-[0.12em] uppercase text-muted">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            GitHub
          </a>
          <a
            href={site.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors hover:text-white"
          >
            Docs
          </a>
          <a href="#compare" className="transition-colors hover:text-white">
            Compare
          </a>
        </div>
      </div>

      {/* Huge fading brand wordmark */}
      <div className="footer-mega-wrap relative z-0 select-none px-2 pb-0 pt-4 sm:px-4">
        <p className="footer-mega-word" aria-hidden>
          mem01
        </p>
      </div>
    </footer>
  );
}
