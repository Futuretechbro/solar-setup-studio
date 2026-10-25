import { useMemo, useState, type ReactNode } from "react";
import { Plus, Printer, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { formatNaira } from "@/lib/site";

type Kind = "quote" | "invoice";
type Line = { id: number; description: string; qty: number; price: number };

const VAT_RATE = 0.075;

const today = () => new Date().toISOString().slice(0, 10);
const plusDays = (d: number) => new Date(Date.now() + d * 864e5).toISOString().slice(0, 10);

export function DocumentMaker({ kind }: { kind: Kind }) {
  const isQuote = kind === "quote";
  const label = isQuote ? "Quotation" : "Invoice";

  const [from, setFrom] = useState({ name: "", phone: "", email: "", address: "" });
  const [to, setTo] = useState({ name: "", phone: "", address: "" });
  const [meta, setMeta] = useState({
    number: isQuote ? "QT-001" : "INV-001",
    date: today(),
    due: plusDays(isQuote ? 14 : 7),
  });
  const [lines, setLines] = useState<Line[]>([
    { id: 1, description: "5kVA hybrid inverter", qty: 1, price: 0 },
    { id: 2, description: "5kWh lithium battery", qty: 2, price: 0 },
    { id: 3, description: "550W mono solar panel", qty: 8, price: 0 },
    { id: 4, description: "Installation & accessories", qty: 1, price: 0 },
  ]);
  const [vat, setVat] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [notes, setNotes] = useState(
    isQuote
      ? "Prices valid until the date above. 70% deposit before installation."
      : "Bank: — \nAccount name: — \nAccount number: —",
  );

  const totals = useMemo(() => {
    const subtotal = lines.reduce((s, l) => s + l.qty * l.price, 0);
    const afterDiscount = Math.max(0, subtotal - discount);
    const vatAmount = vat ? afterDiscount * VAT_RATE : 0;
    return { subtotal, vatAmount, total: afterDiscount + vatAmount };
  }, [lines, vat, discount]);

  const updateLine = (id: number, patch: Partial<Line>) =>
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, ...patch } : l)));

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-5 py-12 lg:grid-cols-[1fr_1.1fr]">
      {/* Editor */}
      <div className="no-print space-y-6">
        <Panel title="Your business">
          <Field label="Business name" value={from.name} onChange={(v) => setFrom({ ...from, name: v })} />
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Phone" value={from.phone} onChange={(v) => setFrom({ ...from, phone: v })} />
            <Field label="Email" value={from.email} onChange={(v) => setFrom({ ...from, email: v })} />
          </div>
          <Field label="Address" value={from.address} onChange={(v) => setFrom({ ...from, address: v })} />
        </Panel>

        <Panel title="Customer">
          <div className="grid gap-3 sm:grid-cols-2">
            <Field label="Customer name" value={to.name} onChange={(v) => setTo({ ...to, name: v })} />
            <Field label="Phone" value={to.phone} onChange={(v) => setTo({ ...to, phone: v })} />
          </div>
          <Field label="Address" value={to.address} onChange={(v) => setTo({ ...to, address: v })} />
        </Panel>

        <Panel title={`${label} details`}>
          <div className="grid gap-3 sm:grid-cols-3">
            <Field label={`${label} no.`} value={meta.number} onChange={(v) => setMeta({ ...meta, number: v })} />
            <Field label="Date" type="date" value={meta.date} onChange={(v) => setMeta({ ...meta, date: v })} />
            <Field
              label={isQuote ? "Valid until" : "Due date"}
              type="date"
              value={meta.due}
              onChange={(v) => setMeta({ ...meta, due: v })}
            />
          </div>
        </Panel>

        <Panel title="Items">
          <div className="space-y-3">
            {lines.map((l) => (
              <div key={l.id} className="grid grid-cols-[1fr_70px_120px_36px] items-end gap-2">
                <Field label="Description" value={l.description} onChange={(v) => updateLine(l.id, { description: v })} />
                <Field
                  label="Qty"
                  type="number"
                  value={String(l.qty)}
                  onChange={(v) => updateLine(l.id, { qty: Math.max(0, Number(v) || 0) })}
                />
                <Field
                  label="Unit price (₦)"
                  type="number"
                  value={String(l.price)}
                  onChange={(v) => updateLine(l.id, { price: Math.max(0, Number(v) || 0) })}
                />
                <button
                  type="button"
                  aria-label="Remove item"
                  onClick={() => setLines((p) => p.filter((x) => x.id !== l.id))}
                  className="grid size-10 place-items-center rounded-xl text-muted-foreground hover:bg-destructive/10 hover:text-destructive"
                >
                  <Trash2 className="size-4" />
                </button>
              </div>
            ))}
          </div>
          <Button
            variant="outline"
            className="mt-2 rounded-full"
            onClick={() =>
              setLines((p) => [...p, { id: Date.now(), description: "", qty: 1, price: 0 }])
            }
          >
            <Plus /> Add item
          </Button>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <Field
              label="Discount (₦)"
              type="number"
              value={String(discount)}
              onChange={(v) => setDiscount(Math.max(0, Number(v) || 0))}
            />
            <label className="flex h-full items-center justify-between gap-3 rounded-xl border border-input bg-card px-4 py-2.5 text-sm font-medium text-forest">
              Add VAT (7.5%)
              <Switch checked={vat} onCheckedChange={setVat} />
            </label>
          </div>
        </Panel>

        <Panel title="Notes / payment details">
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={4}
            className="w-full rounded-xl border border-input bg-card p-3 text-sm text-forest outline-none focus:ring-2 focus:ring-ring"
          />
        </Panel>
      </div>

      {/* Preview */}
      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="no-print mb-4 flex items-center justify-between">
          <p className="text-sm font-semibold text-muted-foreground">Live preview</p>
          <Button variant="forest" size="lg" onClick={() => window.print()}>
            <Printer /> Print / Save as PDF
          </Button>
        </div>
        <article className="print-area rounded-3xl border border-border bg-card p-8 text-card-foreground shadow-card md:p-10">
          <header className="flex flex-wrap items-start justify-between gap-6 border-b border-border pb-6">
            <div>
              <h2 className="text-2xl font-bold text-forest">{from.name || "Your Business Name"}</h2>
              <p className="mt-1 whitespace-pre-line text-sm text-muted-foreground">
                {[from.address, from.phone, from.email].filter(Boolean).join("\n") || "Address · Phone · Email"}
              </p>
            </div>
            <div className="text-right">
              <p className="font-display text-3xl font-bold uppercase tracking-tight text-leaf">{label}</p>
              <p className="mt-1 text-sm text-muted-foreground">#{meta.number}</p>
            </div>
          </header>

          <div className="grid gap-6 py-6 text-sm sm:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                {isQuote ? "Prepared for" : "Bill to"}
              </p>
              <p className="mt-1 font-semibold text-forest">{to.name || "Customer name"}</p>
              <p className="whitespace-pre-line text-muted-foreground">
                {[to.address, to.phone].filter(Boolean).join("\n")}
              </p>
            </div>
            <div className="sm:text-right">
              <p className="text-muted-foreground">
                Date: <span className="font-semibold text-forest">{meta.date}</span>
              </p>
              <p className="text-muted-foreground">
                {isQuote ? "Valid until" : "Due"}: <span className="font-semibold text-forest">{meta.due}</span>
              </p>
            </div>
          </div>

          <table className="w-full text-sm">
            <thead>
              <tr className="border-y border-border text-left text-xs uppercase tracking-wider text-muted-foreground">
                <th className="py-3 font-semibold">Item</th>
                <th className="py-3 text-right font-semibold">Qty</th>
                <th className="py-3 text-right font-semibold">Price</th>
                <th className="py-3 text-right font-semibold">Amount</th>
              </tr>
            </thead>
            <tbody>
              {lines.map((l) => (
                <tr key={l.id} className="border-b border-border/60">
                  <td className="py-3 pr-2 text-forest">{l.description || "—"}</td>
                  <td className="py-3 text-right">{l.qty}</td>
                  <td className="py-3 text-right">{formatNaira(l.price)}</td>
                  <td className="py-3 text-right font-semibold text-forest">{formatNaira(l.qty * l.price)}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <dl className="ml-auto mt-6 max-w-xs space-y-2 text-sm">
            <Row label="Subtotal" value={formatNaira(totals.subtotal)} />
            {discount > 0 && <Row label="Discount" value={`− ${formatNaira(discount)}`} />}
            {vat && <Row label="VAT (7.5%)" value={formatNaira(totals.vatAmount)} />}
            <div className="flex justify-between rounded-xl bg-forest px-4 py-3 text-base font-bold text-forest-foreground">
              <dt>Total</dt>
              <dd>{formatNaira(totals.total)}</dd>
            </div>
          </dl>

          {notes && (
            <div className="mt-8 border-t border-border pt-5">
              <p className="text-xs font-bold uppercase tracking-wider text-muted-foreground">Notes</p>
              <p className="mt-2 whitespace-pre-line text-sm text-forest">{notes}</p>
            </div>
          )}
          <p className="mt-8 text-center text-[11px] text-muted-foreground">Made free with Egbon</p>
        </article>
      </div>
    </div>
  );
}

function Panel({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section className="space-y-3 rounded-3xl border border-border bg-card p-6 shadow-card">
      <h2 className="text-base font-bold text-forest">{title}</h2>
      {children}
    </section>
  );
}

function Field({
  label,
  value,
  onChange,
  type = "text",
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  type?: string;
}) {
  return (
    <label className="block">
      <span className="mb-1 block text-xs font-semibold text-muted-foreground">{label}</span>
      <input
        type={type}
        value={value}
        min={type === "number" ? 0 : undefined}
        onChange={(e) => onChange(e.target.value)}
        className="h-10 w-full rounded-xl border border-input bg-background px-3 text-sm text-forest outline-none focus:ring-2 focus:ring-ring"
      />
    </label>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between text-muted-foreground">
      <dt>{label}</dt>
      <dd className="font-semibold text-forest">{value}</dd>
    </div>
  );
}
