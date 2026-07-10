/** Fixed ambient stage — Nothing mono + red atmosphere */
export function SiteBackground() {
  return (
    <div className="site-stage" aria-hidden>
      <div className="stage-glow" />
      <div className="stage-orb stage-orb-a" />
      <div className="stage-orb stage-orb-b" />
      <div className="stage-orb stage-orb-c" />
      <div className="stage-mesh" />
      <div className="stage-dots" />
      <div className="stage-floor" />
      <div className="stage-noise" />
    </div>
  );
}
