import { cn } from "@/lib/cn";

type LogoProps = {
  className?: string;
  size?: "md" | "lg";
  /** Hide wordmark — mark only (favicon-scale) */
  markOnly?: boolean;
};

/**
 * Brand mark: ghost “0” superseded by solid red “1”
 * = belief memory that evolves (product story in a glyph).
 */
function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn("shrink-0", className)}
      aria-hidden
    >
      {/* Outer plate — industrial frame */}
      <rect
        x="1"
        y="1"
        width="38"
        height="38"
        rx="3"
        stroke="currentColor"
        strokeWidth="1.5"
        className="text-white/90"
      />
      {/* Inner hairline */}
      <rect
        x="5"
        y="5"
        width="30"
        height="30"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="0.75"
        className="text-white/20"
      />

      {/* Ghost 0 — past belief (superseded) */}
      <ellipse
        cx="15.5"
        cy="20"
        rx="5.2"
        ry="7.5"
        stroke="currentColor"
        strokeWidth="1.75"
        className="text-white/35"
      />
      {/* Strike through ghost 0 */}
      <line
        x1="10"
        y1="26"
        x2="21"
        y2="14"
        stroke="currentColor"
        strokeWidth="1.25"
        className="text-white/30"
        strokeLinecap="round"
      />

      {/* Solid 1 — active belief (red) */}
      <path
        d="M24.5 12.5v15M24.5 12.5l-3 2.5"
        stroke="#d71921"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {/* Base of 1 */}
      <line
        x1="21.5"
        y1="27.5"
        x2="27.5"
        y2="27.5"
        stroke="#d71921"
        strokeWidth="2.4"
        strokeLinecap="round"
      />

      {/* Micro corner index — technical product cue */}
      <circle cx="32.5" cy="7.5" r="1.25" fill="#d71921" />
    </svg>
  );
}

export function Logo({ className, size = "lg", markOnly = false }: LogoProps) {
  const markSize = size === "lg" ? "h-9 w-9 sm:h-10 sm:w-10" : "h-8 w-8";
  const typeSize =
    size === "lg" ? "text-[1.65rem] sm:text-[1.85rem]" : "text-[1.35rem]";

  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 sm:gap-3",
        className,
      )}
    >
      <Mark className={markSize} />
      {!markOnly && (
        <span
          className={cn(
            "font-mono leading-none tracking-[-0.03em] text-white",
            typeSize,
          )}
        >
          <span className="font-normal text-white/90">mem</span>
          <span className="font-bold text-accent">01</span>
        </span>
      )}
    </span>
  );
}
