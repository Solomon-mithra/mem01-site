/** Fixed ambient stage — two drifting red glows + visible glyph dots */
export function SiteBackground() {
  return (
    <div className="site-stage" aria-hidden>
      <div className="stage-orb stage-orb-a" />
      <div className="stage-orb stage-orb-b" />
      <div className="stage-mesh" />
      <div className="stage-dots" />
      <div className="stage-floor" />
      <div className="stage-noise" />
    </div>
  );
}
