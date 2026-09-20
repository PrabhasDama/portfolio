import { capabilities } from "@/data/capabilities";

export function Capabilities() {
  return (
    <section
      className="capabilities-section section reveal"
      aria-labelledby="capabilities-title"
    >
      <div className="capabilities-heading">
        <h2 id="capabilities-title">The tools behind the work.</h2>
        <p>A focused stack, chosen to build.</p>
      </div>
      <div className="capabilities-grid">
        {capabilities.map((group) => (
          <div key={group.category}>
            <h3>{group.category}</h3>
            <ul>
              {group.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
