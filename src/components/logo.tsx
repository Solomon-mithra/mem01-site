import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
};

/** Text-only wordmark: mem (regular) + 01 (bold red). */
export function Logo({ className, size = "lg" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-mono leading-none tracking-[-0.04em] text-white",
        size === "lg" && "text-[1.85rem] sm:text-[2.1rem]",
        size === "md" && "text-[1.5rem]",
        className,
      )}
      aria-label="mem01"
    >
      <span className="font-normal text-white/85">mem</span>
      <span className="font-bold text-accent">01</span>
    </span>
  );
}
