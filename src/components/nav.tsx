"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GitHubIcon } from "@/components/icons";
import { Logo } from "@/components/logo";
import { site } from "@/lib/site";
import { cn } from "@/lib/cn";

const links = [
  { href: "/mem01session/", label: "Mem01Session" },
  { href: "/#problem", label: "Problem" },
  { href: "/#benchmarks", label: "Benchmarks" },
  { href: "/#use-cases", label: "Use cases" },
  { href: "/research/", label: "Research" },
  { href: "/#how", label: "System" },
  { href: "/#faq", label: "FAQ" },
];

export function Nav() {
  const pathname = usePathname();
  const onResearch =
    pathname === "/research" || pathname === "/research/";
  const onMem01Session =
    pathname === "/mem01session" || pathname === "/mem01session/";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-black/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-6">
        <Link href="/" className="flex items-center" aria-label="mem01 home">
          <Logo size="lg" />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
          {links.map((l) => {
            const isResearch = l.href.startsWith("/research");
            const isSession = l.href.startsWith("/mem01session");
            const active =
              (isResearch && onResearch) || (isSession && onMem01Session);
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

        <div className="flex items-center gap-2">
          <Link
            href="/mem01session/"
            className="inline-flex h-9 items-center justify-center gap-1.5 bg-white px-3.5 font-mono text-[11px] tracking-[0.12em] uppercase text-black transition-colors hover:bg-accent md:hidden"
          >
            Get started
          </Link>
          <a
            href={site.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex h-9 items-center justify-center gap-2 border border-white/20 bg-transparent px-3.5 font-mono text-[11px] tracking-[0.12em] uppercase text-white transition-colors hover:border-accent hover:text-accent"
          >
            <GitHubIcon className="h-3.5 w-3.5 shrink-0" />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </div>
      </div>
    </header>
  );
}
