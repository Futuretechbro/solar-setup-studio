import { Calculator, CheckCheck, FileText, MessageCircle, Receipt } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "./SectionHeading";
import { whatsappLink } from "@/lib/site";

const USES = [
  {
    icon: Calculator,
    title: "Calculator in chat",
    body: "Type what you want to power — “2 fans, 1 TV, fridge” — and Egbon replies with your setup.",
  },
  {
    icon: FileText,
    title: "Quotes in seconds",
    body: "Send items and prices, get back a neat PDF quote you can forward to your customer.",
  },
  {
    icon: Receipt,
    title: "Invoices on the go",
    body: "Close the job from site. Egbon generates the invoice right there in the chat.",
  },
];

type Msg = { from: "me" | "bot"; text: string; time: string };

const CHAT: Msg[] = [
  { from: "me", text: "Hi Egbon 👋", time: "9:41" },
  {
    from: "bot",
    text: "Welcome! What do you want to do?\n\n1️⃣ Solar calculator\n2️⃣ Make a quote\n3️⃣ Make an invoice",
    time: "9:41",
  },
  { from: "me", text: "1 — 4 bulbs, 2 fans, TV and fridge", time: "9:42" },
  {
    from: "bot",
    text: "☀️ Your setup:\n• 1.5kVA inverter (24V)\n• 1 × 5kWh lithium battery\n• 3 × 550W panels\n\nWant a quote from a vetted installer?",
    time: "9:42",
  },
];

export function WhatsAppBot() {
  return (
    <section id="bot" className="scroll-mt-16 overflow-hidden bg-secondary py-24">
      <div className="mx-auto grid max-w-7xl items-center gap-16 px-5 lg:grid-cols-2">
        <div>
          <SectionHeading eyebrow="The Egbon WhatsApp bot" title="All three tools, right inside WhatsApp.">
            No app to download, no data-heavy website. Just chat with Egbon like you'd chat with
            your big brother who knows solar.
          </SectionHeading>
          <ul className="mt-10 space-y-5">
            {USES.map(({ icon: Icon, title, body }) => (
              <li key={title} className="flex gap-4">
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-forest text-sun">
                  <Icon className="size-5" />
                </span>
                <div>
                  <h3 className="text-lg font-bold text-forest">{title}</h3>
                  <p className="mt-1 text-muted-foreground">{body}</p>
                </div>
              </li>
            ))}
          </ul>
          <Button asChild variant="whatsapp" size="xl" className="mt-10">
            <a href={whatsappLink("Hi Egbon 👋")} target="_blank" rel="noreferrer">
              <MessageCircle /> Start chatting with Egbon
            </a>
          </Button>
        </div>

        {/* Phone mockup */}
        <div className="relative mx-auto w-full max-w-sm">
          <div className="absolute -inset-10 -z-0 rounded-full bg-sun/30 blur-3xl" />
          <div className="relative animate-float rounded-[2.75rem] border-8 border-forest bg-forest p-1 shadow-soft">
            <div className="overflow-hidden rounded-[2.1rem] bg-muted">
              <div className="flex items-center gap-3 bg-forest px-5 pb-4 pt-6 text-forest-foreground">
                <span className="grid size-10 place-items-center rounded-full bg-gradient-sun font-display font-bold text-sun-foreground">
                  e
                </span>
                <div>
                  <p className="font-semibold leading-tight">Egbon</p>
                  <p className="text-xs text-forest-foreground/60">online</p>
                </div>
              </div>
              <div className="space-y-3 px-4 py-5">
                {CHAT.map((m, i) => (
                  <div key={i} className={`flex ${m.from === "me" ? "justify-end" : "justify-start"}`}>
                    <div
                      className={`max-w-[82%] whitespace-pre-line rounded-2xl px-3.5 py-2.5 text-sm text-forest shadow-sm ${m.from === "me" ? "rounded-tr-sm bg-chat-out" : "rounded-tl-sm bg-chat-in"}`}
                    >
                      {m.text}
                      <span className="mt-1 flex items-center justify-end gap-1 text-[10px] text-muted-foreground">
                        {m.time} {m.from === "me" && <CheckCheck className="size-3 text-leaf" />}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <div className="m-3 rounded-full bg-card px-4 py-3 text-sm text-muted-foreground">
                Type a message…
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
