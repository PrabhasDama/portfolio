const items = [
  ["Nutrition targets", "daily"],
  ["Meal plan + prep", "weekly"],
  ["Pantry inventory", "live"],
  ["Grocery list", "auto"],
  ["Store compare / split cart", "2+"],
  ["Budget + receipts", "$"],
  ["Progress + adherence", "trend"],
];
const stack = [
  "Next.js",
  "React",
  "TypeScript",
  "Supabase",
  "PostgreSQL",
  "Vercel",
  "Resend",
];

/** CalTrack's feature set, set as a grocery receipt. Not a product screenshot. */
export function CalTrackReceipt() {
  return (
    <figure
      className="receipt"
      aria-label="What CalTrack covers, styled as a grocery receipt"
    >
      <div className="receipt-paper">
        <p className="receipt-store">CalTrack</p>
        <p className="receipt-center">one kitchen · one app</p>
        <hr />
        <ul>
          {items.map(([name, qty]) => (
            <li key={name}>
              <span>{name}</span>
              <span>{qty}</span>
            </li>
          ))}
        </ul>
        <hr />
        <dl>
          <dt>Stack</dt>
          <dd>{stack.join(" · ")}</dd>
        </dl>
        <hr />
        <p className="receipt-center">
          plan → shop → stock → eat → track → adjust
        </p>
        <p className="receipt-center receipt-thanks">Thank you, come again</p>
      </div>
    </figure>
  );
}
