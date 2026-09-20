import {
  Apple,
  CalendarDays,
  ShoppingBasket,
  Package,
  ChartNoAxesCombined,
  Wallet,
} from "lucide-react";

/** A conceptual workflow diagram, deliberately not a product screenshot. */
export function CalTrackVisual({ compact = false }: { compact?: boolean }) {
  return (
    <figure
      className={`caltrack-visual ${compact ? "is-compact" : ""}`}
      aria-label="CalTrack connects nutrition, meal planning, pantry, groceries, budgeting, and progress."
    >
      <div className="workflow-map" aria-hidden="true">
        <svg className="workflow-connectors" viewBox="0 0 560 410" fill="none">
          <path
            d="M280 205 L133 91 M280 205 L426 91 M280 205 L99 205 M280 205 L461 205 M280 205 L143 319 M280 205 L417 319"
            stroke="currentColor"
          />
          <circle
            cx="280"
            cy="205"
            r="106"
            stroke="currentColor"
            strokeDasharray="2 8"
          />
        </svg>
        <div className="workflow-core">
          <span className="caltrack-mark">
            c<span>t</span>
            <i />
          </span>
        </div>
        <div className="workflow-node node-nutrition">
          <Apple size={17} />
          <span>Nutrition</span>
        </div>
        <div className="workflow-node node-meals">
          <CalendarDays size={17} />
          <span>Meal planning</span>
        </div>
        <div className="workflow-node node-pantry">
          <Package size={17} />
          <span>Pantry</span>
        </div>
        <div className="workflow-node node-groceries">
          <ShoppingBasket size={17} />
          <span>Groceries</span>
        </div>
        <div className="workflow-node node-budget">
          <Wallet size={17} />
          <span>Budgeting</span>
        </div>
        <div className="workflow-node node-progress">
          <ChartNoAxesCombined size={17} />
          <span>Progress</span>
        </div>
      </div>
      <figcaption>
        ONE CONNECTED SYSTEM <span>·</span> CONCEPTUAL WORKFLOW
      </figcaption>
    </figure>
  );
}
