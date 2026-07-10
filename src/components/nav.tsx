"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const links = [
  { href: "/#problem", label: "Problem" },
  { href: "/#benchmarks", label: "Benchmarks" },
  { href: "/research/", label: "Research" },
  { href: "/#how", label: "System" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const pathname = usePathname();
  const onResearch =
    pathname === "/research" || pathname === "/research/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="mem01 home">
          <Logo size="lg" />
        </Link>

        <nav className="hidden items-center gap-7 md:flex">
          {links.map((l) => {
            const isResearch = l.href.startsWith("/research");
            const active = isResearch && onResearch;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={cn(
                  "font-mono text-[11px] tracking-[0.14em] uppercase transition-colors hover:text-white",
                  active ? "text-accent" : "text-muted",
                )}
              >
                {l.label}
              </Link>
            );
          })}
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
