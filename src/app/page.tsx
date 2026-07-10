import { Nav } from "@/components/nav";
import { SiteBackground } from "@/components/site-background";
import { Hero } from "@/components/hero";
import { Problem } from "@/components/problem";
import { Benchmarks } from "@/components/benchmarks";
import { Compare } from "@/components/compare";
import { How } from "@/components/how";
import { Features } from "@/components/features";
import { CodeBlock } from "@/components/code-block";
import { Faq } from "@/components/faq";
import { Cta } from "@/components/cta";
import { Footer } from "@/components/footer";

export default function Home() {
  return (
    <>
      <SiteBackground />
      <div className="relative z-10 flex min-h-full flex-1 flex-col">
        <Nav />
        <main className="flex-1 pt-2">
          <Hero />
          <Problem />
          <Benchmarks />
          <Compare />
          <How />
          <Features />
          <CodeBlock />
          <Faq />
          <Cta />
        </main>
        <Footer />
      </div>
    </>
  );
}
