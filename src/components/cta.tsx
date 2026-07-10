import { ArrowRight } from "lucide-react";
import { GitHubIcon } from "@/components/icons";
import { site } from "@/lib/site";

export function Cta() {
  return (
    <section className="relative border-t border-border py-20 sm:py-28">
      <div className="mx-auto max-w-6xl px-5 sm:px-6">
        <div className="relative overflow-hidden border border-border-bright bg-black/60 px-6 py-16 text-center backdrop-blur-md sm:px-12 sm:py-20">
          <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,#d719211f,transparent_65%)]" />
          <div className="glyph-dots-dense pointer-events-none absolute inset-0 opacity-40" />
          <div className="relative">
            <p className="label">Get started</p>
            <h2 className="display-xl mx-auto mt-4 max-w-xl text-4xl text-white sm:text-5xl">
              Ship agents that
              <br />
              remember right
            </h2>
            <p className="mx-auto mt-5 max-w-md text-white">
              Clone the repo. Compose up. Call remember and recall.
            </p>
            <a
              href={site.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-9 inline-flex h-12 items-center justify-center gap-2 bg-white px-8 text-[13px] font-semibold uppercase tracking-[0.08em] text-black transition-colors hover:bg-accent"
            >
              <GitHubIcon className="h-4 w-4 shrink-0" />
              <span>Start on GitHub</span>
              <ArrowRight className="h-4 w-4 shrink-0" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
