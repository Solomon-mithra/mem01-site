"use client";

import { GrainGradient } from "@paper-design/shaders-react";

/**
 * Paper Design GrainGradient — full-page ambient background.
 * Settings match: shaders.paper.design/grain-gradient (corners shape)
 * Colors lean mem01 red on black.
 */
export function SiteBackground() {
  return (
    <div className="site-stage" aria-hidden>
      <GrainGradient
        className="stage-shader"
        width="100%"
        height="100%"
        fit="cover"
        /* Deeper / muted reds — less neon bloom */
        colors={["#9e1218", "#c43a3a", "#2a080a", "#6b1a1e"]}
        colorBack="#000000"
        softness={0.65}
        intensity={0.50}
        noise={0.30}
        shape="sphere"
        speed={0.55}
        scale={1}
        rotation={0}
        offsetX={0}
        offsetY={0}
      />
      {/* Stronger veil — keeps glow in the background */}
      <div className="stage-readability" />
    </div>
  );
}
