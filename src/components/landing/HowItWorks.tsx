import { ClipboardList, Handshake, MessagesSquare, Wrench } from "lucide-react";
import { SectionHeading } from "./SectionHeading";

const STEPS = [
  {
    icon: ClipboardList,
    title: "Tell Egbon what you power",
    body: "Use the calculator on this site or simply list your appliances in WhatsApp.",
  },
  {
    icon: MessagesSquare,
    title: "Get your setup & price",
    body: "See the exact inverter, battery and panel sizes plus a clear quote — no jargon.",
  },
  {
    icon: Handshake,
    title: "Meet a vetted installer",
    body: "We match you with a trusted, reviewed installer close to you who uses genuine products.",
  },
  {
    icon: Wrench,
    title: "Install & enjoy steady light",
    body: "Your system goes up, and Egbon stays on hand for maintenance and after-sales support.",
  },
];

export function HowItWorks() {
  return (
    <section id="how" className="scroll-mt-16 bg-background py-24">
      <div className="mx-auto max-w-7xl px-5">
        <SectionHeading center eyebrow="How it works" title="From “NEPA don take light” to steady power in 4 steps." />
        <ol className="relative mt-16 grid gap-8 md:grid-cols-4">
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-border md:block" />
          {STEPS.map(({ icon: Icon, title, body }, i) => (
            <li key={title} className="relative">
              <div className="flex items-center gap-3">
                <span className="relative grid size-14 place-items-center rounded-2xl bg-forest text-sun shadow-soft">
                  <Icon className="size-6" />
                  <span className="absolute -right-2 -top-2 grid size-6 place-items-center rounded-full bg-sun text-xs font-bold text-sun-foreground">
                    {i + 1}
                  </span>
                </span>
              </div>
              <h3 className="mt-6 text-xl font-bold text-forest">{title}</h3>
              <p className="mt-2 text-muted-foreground">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
