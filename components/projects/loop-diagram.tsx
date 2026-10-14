const steps = ["plan", "shop", "stock", "eat", "track", "adjust"];
const center = 180;
const radius = 120;
const cycle = "12s";

const point = (degrees: number) => {
  const radians = (degrees * Math.PI) / 180;
  return {
    x: +(center + radius * Math.cos(radians)).toFixed(2),
    y: +(center + radius * Math.sin(radians)).toFixed(2),
  };
};

/** Opacity keyframes that flash a node as the token passes it. */
const flash = (index: number) => {
  const t = index / steps.length;
  if (index === 0) return { values: "1;0;0;1", keyTimes: "0;0.1;0.94;1" };
  return {
    values: "0;0;1;0;0",
    keyTimes: `0;${(t - 0.04).toFixed(3)};${t.toFixed(3)};${(t + 0.1).toFixed(3)};1`,
  };
};

/** CalTrack's weekly loop drawn as a cycle: each step feeds the state the next one reads. */
export function LoopDiagram() {
  const ring = `M${center},${center - radius} A${radius},${radius} 0 1,1 ${center},${center + radius} A${radius},${radius} 0 1,1 ${center},${center - radius}`;
  return (
    <figure className="loop">
      <svg
        viewBox="0 0 360 360"
        role="img"
        aria-label="A cycle: plan, shop, stock, eat, track, adjust, then back to plan."
      >
        <path d={ring} className="loop-ring" />
        {steps.map((_, index) => {
          const angle = -60 + index * 60;
          const { x, y } = point(angle);
          return (
            <path
              key={`edge-${index}`}
              d="M-4,-5 L3,0 L-4,5"
              className="loop-arrow"
              transform={`translate(${x} ${y}) rotate(${angle + 90})`}
            />
          );
        })}
        <circle r="5" className="loop-token">
          <animateMotion dur={cycle} repeatCount="indefinite" path={ring} />
        </circle>
        {steps.map((step, index) => {
          const { x, y } = point(-90 + index * 60);
          return (
            <g key={step} transform={`translate(${x} ${y})`}>
              <circle r="31" className="loop-node" />
              <circle r="31" className="loop-hit" opacity="0">
                <animate
                  attributeName="opacity"
                  dur={cycle}
                  repeatCount="indefinite"
                  {...flash(index)}
                />
              </circle>
              <text className="loop-label" dy="4">
                {step}
              </text>
            </g>
          );
        })}
        <text x={center} y={center - 4} className="loop-center">
          CalTrack
        </text>
        <text x={center} y={center + 16} className="loop-label loop-sub">
          while (true)
        </text>
      </svg>
      <figcaption>
        The loop CalTrack models. Each step changes the state the next one
        reads: shopping fills the pantry, the pantry shapes the next list.
      </figcaption>
    </figure>
  );
}
