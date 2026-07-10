import { Logo } from "@/components/logo";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-5 sm:flex-row sm:items-center sm:px-6">
        <div className="flex items-center gap-3">
          <Logo size="md" />
          <span className="font-mono text-[10px] tracking-[0.14em] text-muted-dim">
            MIT
          </span>
        </div>
        <div className="flex gap-8 font-mono text-[11px] tracking-[0.12em] uppercase text-muted">
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            GitHub
          </a>
          <a
            href={site.docsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white"
          >
            Docs
          </a>
          <a href="#compare" className="hover:text-white">
            Compare
          </a>
        </div>
      </div>
    </footer>
  );
}
