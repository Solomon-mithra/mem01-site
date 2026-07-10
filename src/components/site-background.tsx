/**
 * Premium ambient stage — soft red atmosphere only.
 * No busy grids / cell patterns.
 */
export function SiteBackground() {
  return (
    <div className="site-stage" aria-hidden>
      <div className="stage-vignette" />
      <div className="stage-orb-wrap stage-orb-wrap-a">
        <div className="stage-orb-blob" />
      </div>
      <div className="stage-orb-wrap stage-orb-wrap-b">
        <div className="stage-orb-blob" />
      </div>
      <div className="stage-hairline" />
      <div className="stage-noise" />
    </div>
  );
}
