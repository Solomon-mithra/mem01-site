import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
};

/** Text-only: mem (regular) + 01 (bold red) */
export function Logo({ className, size = "lg" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-mono leading-none tracking-tight",
        size === "lg" && "text-[1.15rem] sm:text-[1.25rem]",
        size === "md" && "text-[1.05rem]",
        className,
      )}
      aria-label="mem01"
    >
      <span className="font-normal text-white/85">mem</span>
      <span className="font-bold text-accent">01</span>
    </span>
  );
}
