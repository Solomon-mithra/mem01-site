/**
 * Ambient stage: two red glows + square cells with 6 dots each.
 */
export function SiteBackground() {
  return (
    <div className="site-stage" aria-hidden>
      <div className="stage-orb-wrap stage-orb-wrap-a">
        <div className="stage-orb-blob" />
      </div>
      <div className="stage-orb-wrap stage-orb-wrap-b">
        <div className="stage-orb-blob" />
      </div>
      <div className="stage-cells" />
      <div className="stage-floor" />
      <div className="stage-noise" />
    </div>
  );
}
