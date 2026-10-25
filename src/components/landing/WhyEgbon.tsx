import { BadgeCheck, HeartHandshake, MessageCircle, Scale, ShieldCheck, Wallet } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const REASONS = [
  {
    icon: Scale,
    title: "Honest sizing",
    body: "No over-selling. We recommend what your home actually needs — nothing more.",
  },
  {
    icon: ShieldCheck,
    title: "Vetted installers",
    body: "Every installer is checked, reviewed and rated by real customers.",
  },
  {
    icon: BadgeCheck,
    title: "Genuine brands only",
    body: "Tier-1 panels, trusted inverters and batteries. No fake or refurbished products.",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp-first",
    body: "Everything works where you already are. No app, no long forms.",
  },
  {
    icon: Wallet,
    title: "Free, forever",
    body: "The calculator, quotation maker and invoice maker cost you nothing.",
  },
  {
    icon: HeartHandshake,
    title: "Big-brother support",
    body: "“Egbon” means big brother. We stay with you long after installation day.",
  },
];

export function WhyEgbon() {
  return (
    <section id="why" className="scroll-mt-16 bg-gradient-forest py-24 text-forest-foreground">
      <div className="mx-auto max-w-7xl px-5">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.6fr]">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading light eyebrow="Why ask Egbon?" title="Because everybody needs an Egbon who knows.">
              In Yoruba, Egbon is the elder sibling you go to for honest advice. That's exactly what
              we are for your power.
            </SectionHeading>
          </div>
          <ul className="grid gap-4 sm:grid-cols-2">
            {REASONS.map(({ icon: Icon, title, body }) => (
              <li
                key={title}
                className="rounded-3xl border border-forest-foreground/10 bg-forest-foreground/5 p-7 transition-colors hover:border-sun/40"
              >
                <Icon className="size-7 text-sun" />
                <h3 className="mt-5 text-xl font-bold">{title}</h3>
                <p className="mt-2 text-forest-foreground/70">{body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
