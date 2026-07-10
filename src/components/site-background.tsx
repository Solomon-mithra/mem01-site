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
        colors={["#d71921", "#ff4d6a", "#5c0a0e", "#ff8a80"]}
        colorBack="#000000"
        softness={0.5}
        intensity={0.5}
        noise={0.25}
        shape="corners"
        speed={1}
        scale={1}
        rotation={0}
        offsetX={0}
        offsetY={0}
      />
      {/* Readability veil so content stays crisp */}
      <div className="stage-readability" />
    </div>
  );
}
