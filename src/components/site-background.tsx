/**
 * Ambient stage: two red glows (wrapper animated, blob blurred)
 * so transform motion stays visible on all browsers.
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
      <div className="stage-mesh" />
      <div className="stage-dots" />
      <div className="stage-floor" />
      <div className="stage-noise" />
    </div>
  );
}
