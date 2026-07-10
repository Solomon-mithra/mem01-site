import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
};

/** Text-only wordmark: mem (regular) + 01 (extra bold red). */
export function Logo({ className, size = "lg" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-mono leading-none tracking-[-0.03em] text-white",
        size === "lg" && "text-[1.15rem] sm:text-[1.25rem]",
        size === "md" && "text-[1.05rem]",
        className,
      )}
      aria-label="mem01"
    >
      <span className="font-normal text-white/80">mem</span>
      <span className="font-extrabold text-accent">01</span>
    </span>
  );
}
