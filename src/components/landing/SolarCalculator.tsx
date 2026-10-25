import { useMemo, useState } from "react";
import { Battery, Gauge, Grid3x3, MessageCircle, Minus, Plus, Sun, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { SectionHeading } from "./SectionHeading";
import { APPLIANCE_PRESETS, sizeSolarSystem, type Appliance, type BatteryType } from "@/lib/solar";
import { whatsappLink } from "@/lib/site";

let uid = 0;
const newId = () => `a${++uid}`;

const STARTER: Appliance[] = [
  { id: newId(), name: "LED bulb", watts: 10, qty: 6, hours: 6 },
  { id: newId(), name: "Standing fan", watts: 70, qty: 2, hours: 8 },
  { id: newId(), name: "LED TV (43\")", watts: 100, qty: 1, hours: 6 },
  { id: newId(), name: "Fridge", watts: 150, qty: 1, hours: 10 },
];

export function SolarCalculator() {
  const [items, setItems] = useState<Appliance[]>(STARTER);
  const [backupHours, setBackupHours] = useState(8);
  const [battery, setBattery] = useState<BatteryType>("lithium");

  const result = useMemo(
    () => sizeSolarSystem(items, { backupHours, battery }),
    [items, backupHours, battery],
  );

  const update = (id: string, patch: Partial<Appliance>) =>
    setItems((prev) => prev.map((a) => (a.id === id ? { ...a, ...patch } : a)));

  const addPreset = (p: (typeof APPLIANCE_PRESETS)[number]) =>
    setItems((prev) => {
      const existing = prev.find((a) => a.name === p.name);
      if (existing) return prev.map((a) => (a.id === existing.id ? { ...a, qty: a.qty + 1 } : a));
      return [...prev, { ...p, id: newId(), qty: 1 }];
    });

  const message = [
    "Hi Egbon, I used your solar calculator. Please quote this setup:",
    `• Inverter: ${result.inverterKva}kVA (${result.systemVolts}V)`,
    `• Batteries: ${result.batteryUnits} × ${result.batteryLabel}`,
    `• Panels: ${result.panelCount} × ${result.panelWatts}W`,
    "",
    "My appliances:",
    ...items.map((a) => `- ${a.qty} × ${a.name} (${a.watts}W, ${a.hours}h/day)`),
  ].join("\n");

  return (
    <section id="calculator" className="scroll-mt-16 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading eyebrow="Solar setup calculator" title="What size of solar do you really need?">
          Add the things you want to power. Egbon works out the inverter, batteries and panels —
          no technical knowledge needed.
        </SectionHeading>

        <div className="mt-12 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
          {/* Inputs */}
          <div className="rounded-3xl border border-border bg-card p-6 shadow-card md:p-8">
            <p className="text-sm font-semibold text-forest">Quick add</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {APPLIANCE_PRESETS.map((p) => (
                <button
                  key={p.name}
                  type="button"
                  onClick={() => addPreset(p)}
                  className="inline-flex items-center gap-1 rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-forest transition-colors hover:border-leaf hover:bg-accent"
                >
                  <Plus className="size-3" /> {p.name}
                </button>
              ))}
            </div>

            <div className="mt-8 hidden grid-cols-[1fr_90px_110px_80px_36px] gap-3 px-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground md:grid">
              <span>Appliance</span>
              <span>Watts</span>
              <span>Quantity</span>
              <span>Hrs/day</span>
              <span />
            </div>
            <ul className="mt-3 space-y-3">
              {items.map((a) => (
                <li
                  key={a.id}
                  className="grid grid-cols-2 gap-3 rounded-2xl bg-muted/60 p-3 md:grid-cols-[1fr_90px_110px_80px_36px] md:items-center"
                >
                  <input
                    aria-label="Appliance name"
                    value={a.name}
                    onChange={(e) => update(a.id, { name: e.target.value })}
                    className="col-span-2 h-10 rounded-xl border border-input bg-card px-3 text-sm font-medium text-forest outline-none focus:ring-2 focus:ring-ring md:col-span-1"
                  />
                  <NumberField
                    label="Watts"
                    value={a.watts}
                    onChange={(v) => update(a.id, { watts: v })}
                  />
                  <div className="flex h-10 items-center justify-between rounded-xl border border-input bg-card px-1">
                    <button
                      type="button"
                      aria-label="Decrease quantity"
                      onClick={() => update(a.id, { qty: Math.max(1, a.qty - 1) })}
                      className="grid size-8 place-items-center rounded-lg text-forest hover:bg-muted"
                    >
                      <Minus className="size-3.5" />
                    </button>
                    <span className="text-sm font-semibold text-forest">{a.qty}</span>
                    <button
                      type="button"
                      aria-label="Increase quantity"
                      onClick={() => update(a.id, { qty: a.qty + 1 })}
                      className="grid size-8 place-items-center rounded-lg text-forest hover:bg-muted"
                    >
                      <Plus className="size-3.5" />
                    </button>
                  </div>
                  <NumberField
                    label="Hours per day"
                    value={a.hours}
                    step={0.5}
                    max={24}
                    onChange={(v) => update(a.id, { hours: v })}
                  />
                  <button
                    type="button"
                    aria-label={`Remove ${a.name}`}
                    onClick={() => setItems((prev) => prev.filter((x) => x.id !== a.id))}
                    className="grid size-9 place-items-center justify-self-end rounded-lg text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                  >
                    <Trash2 className="size-4" />
                  </button>
                </li>
              ))}
              {items.length === 0 && (
                <li className="rounded-2xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                  Tap an appliance above to start.
                </li>
              )}
            </ul>

            <div className="mt-8 grid gap-6 md:grid-cols-2">
              <div>
                <div className="flex items-center justify-between text-sm font-semibold text-forest">
                  <span>Backup at night / during NEPA outage</span>
                  <span className="rounded-full bg-accent px-2.5 py-0.5">{backupHours} hrs</span>
                </div>
                <Slider
                  className="mt-4"
                  min={2}
                  max={16}
                  step={1}
                  value={[backupHours]}
                  onValueChange={(v) => setBackupHours(v[0])}
                  aria-label="Backup hours"
                />
              </div>
              <div>
                <p className="text-sm font-semibold text-forest">Battery type</p>
                <div className="mt-3 grid grid-cols-2 gap-2 rounded-full bg-muted p-1">
                  {(["lithium", "tubular"] as const).map((t) => (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setBattery(t)}
                      className={`h-9 rounded-full text-sm font-semibold capitalize transition-all ${battery === t ? "bg-forest text-forest-foreground shadow-soft" : "text-forest/70 hover:text-forest"}`}
                    >
                      {t}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="relative overflow-hidden rounded-3xl bg-gradient-forest p-6 text-forest-foreground shadow-soft md:p-8 lg:sticky lg:top-24 lg:self-start">
            <div className="absolute -right-16 -top-16 size-48 rounded-full bg-sun/20 blur-3xl" />
            <p className="text-xs font-bold uppercase tracking-[0.25em] text-sun">Your recommended setup</p>
            <div className="mt-4 flex gap-6 text-sm text-forest-foreground/70">
              <span>
                Load <b className="text-forest-foreground">{result.peakWatts.toLocaleString()}W</b>
              </span>
              <span>
                Daily use <b className="text-forest-foreground">{(result.dailyWh / 1000).toFixed(1)}kWh</b>
              </span>
            </div>

            <div className="mt-6 space-y-3">
              <ResultRow
                icon={<Gauge />}
                label="Inverter"
                value={result.inverterKva ? `${result.inverterKva} kVA` : "—"}
                note={result.inverterKva ? `${result.systemVolts}V system` : "Add appliances"}
              />
              <ResultRow
                icon={<Battery />}
                label="Batteries"
                value={result.batteryUnits ? `${result.batteryUnits} ×` : "—"}
                note={`${result.batteryLabel} · ${(result.batteryWh / 1000).toFixed(1)}kWh needed`}
              />
              <ResultRow
                icon={<Grid3x3 />}
                label="Solar panels"
                value={result.panelCount ? `${result.panelCount} ×` : "—"}
                note={`${result.panelWatts}W panels · ${(result.solarArrayWatts / 1000).toFixed(2)}kW total`}
              />
            </div>

            <Button asChild variant="sun" size="xl" className="mt-8 w-full">
              <a href={whatsappLink(message)} target="_blank" rel="noreferrer">
                <MessageCircle /> Get a quote on WhatsApp
              </a>
            </Button>
            <p className="mt-4 flex items-start gap-2 text-xs text-forest-foreground/60">
              <Sun className="mt-0.5 size-3.5 shrink-0 text-sun" />
              Estimate based on ~5 sun hours/day, typical for most of Nigeria. A vetted installer
              confirms final sizing on site.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function NumberField({
  label,
  value,
  onChange,
  step = 1,
  max,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  step?: number;
  max?: number;
}) {
  return (
    <label className="relative block">
      <span className="sr-only">{label}</span>
      <span className="pointer-events-none absolute -top-2 left-2 bg-card px-1 text-[10px] font-semibold uppercase text-muted-foreground md:hidden">
        {label}
      </span>
      <input
        type="number"
        min={0}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Math.max(0, Number(e.target.value) || 0))}
        className="h-10 w-full rounded-xl border border-input bg-card px-3 text-sm font-medium text-forest outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function ResultRow({
  icon,
  label,
  value,
  note,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  note: string;
}) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-forest-foreground/10 bg-forest-foreground/5 p-4">
      <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-sun text-sun-foreground [&_svg]:size-5">
        {icon}
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-xs uppercase tracking-wider text-forest-foreground/60">{label}</p>
        <p className="truncate text-xs text-forest-foreground/70">{note}</p>
      </div>
      <p className="font-display text-2xl font-bold text-forest-foreground">{value}</p>
    </div>
  );
}
