import {
  Camera,
  Droplets,
  Fan,
  Hammer,
  Paintbrush,
  PlugZap,
  Sparkles,
  Sun,
  Wrench,
  Cog,
} from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const SERVICES = [
  { icon: PlugZap, name: "Electricians" },
  { icon: Droplets, name: "Plumbers" },
  { icon: Fan, name: "AC & fridge repair" },
  { icon: Cog, name: "Generator mechanics" },
  { icon: Camera, name: "CCTV & security" },
  { icon: Wrench, name: "Borehole & pumps" },
  { icon: Paintbrush, name: "Painters" },
  { icon: Hammer, name: "Carpenters & tilers" },
  { icon: Sparkles, name: "Cleaning & fumigation" },
];

export function MoreHands() {
  return (
    <section id="more" className="scroll-mt-16 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHeading eyebrow="Solar first, more hands later" title="Today, solar. Tomorrow, every hand your home needs.">
            We're starting with solar and getting it right. Next, Egbon will connect you with other
            trusted artisans — same honesty, same WhatsApp ease.
          </SectionHeading>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="flex flex-col justify-between rounded-3xl bg-gradient-sun p-7 text-sun-foreground shadow-sun lg:row-span-2">
            <Sun className="size-10" />
            <div className="mt-10">
              <span className="rounded-full bg-forest px-3 py-1 text-xs font-bold uppercase tracking-wider text-forest-foreground">
                Live now
              </span>
              <h3 className="mt-4 text-3xl font-bold">Solar installers</h3>
              <p className="mt-2 text-sun-foreground/80">Sizing, quotes, installation & support.</p>
            </div>
          </div>
          {SERVICES.map(({ icon: Icon, name }) => (
            <div
              key={name}
              className="flex flex-col justify-between rounded-3xl border border-dashed border-border bg-card p-6"
            >
              <Icon className="size-6 text-leaf" />
              <div className="mt-8">
                <p className="text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
                  Coming soon
                </p>
                <h3 className="mt-1 text-lg font-bold text-forest">{name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
