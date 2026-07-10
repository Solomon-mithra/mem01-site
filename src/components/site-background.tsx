"use client";

import { GrainGradient } from "@paper-design/shaders-react";

/**
 * Paper Design GrainGradient — vivid mem01 red, sphere shape.
 *
 * Why scale looked broken before:
 * 1. fit="cover" stretched the sphere to fill the viewport, so scale barely
 *    changed anything (still full-screen red).
 * 2. Grain noise is resolution-based and intentionally ignores scale
 *    (Paper docs: grains use gl_FragCoord, not UV scale).
 * 3. WebGL often needs a remount when tweaking scale in dev (key below).
 *
 * Use fit="contain" so scale zooms the sphere clearly (0.3–2.5 works well).
 * Tweak SCALE and hard-refresh if needed.
 */
const SCALE = 0.80;

export function SiteBackground() {
  return (
    <div className="site-stage" aria-hidden>
      <GrainGradient
        /* Force WebGL remount when scale changes (dev + HMR) */
        key={`grain-sphere-scale-${SCALE}`}
        className="stage-shader"
        width="100%"
        height="100%"
        /* contain = sphere can grow/shrink; cover hid scale changes */
        fit="contain"
        colors={["#d71921", "#ff4d6a", "#5c0a0e", "#ff8a80"]}
        colorBack="#000000"
        softness={0.55}
        intensity={0.38}
        noise={0.2}
        shape="sphere"
        speed={0.75}
        scale={SCALE}
        rotation={0}
        offsetX={0}
        offsetY={0}
      />
      <div className="stage-readability" />
    </div>
  );
}
