import { Link } from "@tanstack/react-router";
import { ArrowRight, BadgeCheck, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import heroImg from "@/assets/hero-solar.jpg";
import { whatsappLink } from "@/lib/site";

export function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-forest text-forest-foreground">
      <img
        src={heroImg}
        alt="Egbon technician inspecting rooftop solar panels at sunset"
        width={1600}
        height={1104}
        className="absolute inset-0 -z-20 h-full w-full object-cover object-[70%_center]"
      />
      <div className="absolute inset-0 -z-10 bg-hero-overlay" />

      <div className="mx-auto max-w-7xl px-5 pb-28 pt-20 md:pb-36 md:pt-28">
        <div className="max-w-2xl animate-rise">
          <span className="inline-flex items-center gap-2 rounded-full border border-sun/40 bg-sun/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-widest text-sun">
            <Zap className="size-3.5" /> Solar made simple for Nigerian homes
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-[1.05] sm:text-5xl md:text-6xl">
            Stop guessing your solar. <span className="text-gradient-sun">Ask Egbon.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg text-forest-foreground/80">
            Size the right inverter, batteries and panels in seconds, make quotes and invoices for
            free, and get matched with trusted installers — all on the web or right inside
            WhatsApp.
          </p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild variant="sun" size="xl">
              <Link to="/" hash="calculator">
                Size my solar <ArrowRight />
              </Link>
            </Button>
            <Button asChild variant="outline-light" size="xl">
              <a href={whatsappLink("Hi Egbon, I want to size my solar setup")} target="_blank" rel="noreferrer">
                <MessageCircle /> Use the WhatsApp bot
              </a>
            </Button>
          </div>
          <ul className="mt-10 flex flex-wrap gap-x-6 gap-y-2 text-sm text-forest-foreground/75">
            {["100% free tools", "Vetted installers", "Genuine brands only"].map((t) => (
              <li key={t} className="flex items-center gap-2">
                <BadgeCheck className="size-4 text-sun" /> {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
