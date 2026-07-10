import { GitHubIcon } from "@/components/icons";
import { site } from "@/lib/site";

const links = [
  { href: "#problem", label: "Problem" },
  { href: "#compare", label: "Compare" },
  { href: "#how", label: "System" },
  { href: "#faq", label: "FAQ" },
];

export function Nav() {
  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-5 sm:px-6">
        <a href="#" className="flex items-center gap-3">
          <span className="font-mono text-[13px] font-medium tracking-[0.12em] uppercase">
            mem<span className="text-accent">01</span>
          </span>
          <span className="hidden font-mono text-[10px] tracking-[0.16em] text-muted-dim sm:inline">
            ( open )
          </span>
        </a>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[11px] tracking-[0.14em] uppercase text-muted transition-colors hover:text-white"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href={site.githubUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex h-9 items-center justify-center gap-2 border border-white/20 bg-transparent px-3.5 font-mono text-[11px] tracking-[0.12em] uppercase text-white transition-colors hover:border-accent hover:text-accent"
        >
          <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
          <span>GitHub</span>
        </a>
      </div>
    </header>
  );
}
