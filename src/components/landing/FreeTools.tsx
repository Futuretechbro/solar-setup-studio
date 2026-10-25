import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Calculator, FileText, Receipt } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const TOOLS = [
  {
    icon: Calculator,
    title: "Solar setup calculator",
    body: "List your appliances and get the right inverter, battery and panel sizes instantly.",
    cta: "Size my setup",
    to: "/" as const,
    hash: "calculator",
  },
  {
    icon: FileText,
    title: "Quotation maker",
    body: "Installers and vendors: create a clean, professional quote in naira and share it as PDF.",
    cta: "Make a quote",
    to: "/quote" as const,
  },
  {
    icon: Receipt,
    title: "Invoice maker",
    body: "Bill customers properly with VAT, discounts and payment details — ready to print or send.",
    cta: "Make an invoice",
    to: "/invoice" as const,
  },
];

export function FreeTools() {
  return (
    <section id="tools" className="scroll-mt-16 bg-forest py-24 text-forest-foreground">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading light eyebrow="Free tools on the site" title="Three tools. Zero naira.">
          Whether you're powering your home or running a solar business, Egbon's tools are free —
          no sign-up, no stress.
        </SectionHeading>
        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {TOOLS.map(({ icon: Icon, ...t }, i) => (
            <Link
              key={t.title}
              to={t.to}
              hash={"hash" in t ? t.hash : undefined}
              className="group relative flex flex-col overflow-hidden rounded-3xl border border-forest-foreground/10 bg-forest-deep p-8 transition-all hover:-translate-y-1 hover:border-sun/50"
            >
              <span className="font-display text-7xl font-bold text-forest-foreground/5 absolute right-6 top-4">
                0{i + 1}
              </span>
              <span className="grid size-14 place-items-center rounded-2xl bg-gradient-sun text-sun-foreground shadow-sun">
                <Icon className="size-6" />
              </span>
              <h3 className="mt-8 text-2xl font-bold">{t.title}</h3>
              <p className="mt-3 flex-1 text-forest-foreground/70">{t.body}</p>
              <span className="mt-8 inline-flex items-center gap-2 font-semibold text-sun">
                {t.cta}
                <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
