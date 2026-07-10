import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
};

/** Text-only: red bold 01 */
export function Logo({ className, size = "lg" }: LogoProps) {
  return (
    <span
      className={cn(
        "inline-flex items-baseline font-mono font-bold leading-none tracking-tight text-accent",
        size === "lg" && "text-[1.2rem] sm:text-[1.3rem]",
        size === "md" && "text-[1.1rem]",
        className,
      )}
      aria-label="mem01"
    >
      01
    </span>
  );
}
