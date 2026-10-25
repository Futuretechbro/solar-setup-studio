const BRANDS = [
  "Jinko Solar",
  "Canadian Solar",
  "LONGi",
  "Felicity Solar",
  "Luminous",
  "Growatt",
  "Victron Energy",
  "Deye",
  "Trina Solar",
  "Pylontech",
];

export function BrandsMarquee() {
  const row = [...BRANDS, ...BRANDS];
  return (
    <section aria-label="Brands we work with" className="border-b border-border bg-card py-10">
      <p className="mb-6 text-center text-xs font-semibold uppercase tracking-[0.25em] text-muted-foreground">
        Genuine brands we work with
      </p>
      <div className="mask-fade-x group overflow-hidden">
        <ul className="flex w-max animate-marquee gap-4 group-hover:[animation-play-state:paused]">
          {row.map((b, i) => (
            <li
              key={`${b}-${i}`}
              aria-hidden={i >= BRANDS.length}
              className="flex h-16 min-w-48 items-center justify-center rounded-2xl border border-border bg-background px-8 font-display text-lg font-bold text-forest/70 transition-colors hover:text-forest"
            >
              {b}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
