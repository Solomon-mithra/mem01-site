import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  /** Nav vs footer scale */
  size?: "md" | "lg";
};

export function Logo({ className, size = "lg" }: LogoProps) {
  return (
    <span
      className={cn(
        "font-mono tracking-tight text-white",
        size === "lg" && "text-2xl sm:text-[1.75rem]",
        size === "md" && "text-xl",
        className,
      )}
    >
      <span className="font-normal">mem</span>
      <span className="font-bold text-accent">01</span>
    </span>
  );
}
