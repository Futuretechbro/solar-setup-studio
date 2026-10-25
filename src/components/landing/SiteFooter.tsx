import { Link } from "@tanstack/react-router";
import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Logo } from "./SiteHeader";
import { whatsappLink } from "@/lib/site";

export function FinalCta() {
  return (
    <section className="no-print bg-background px-5 pb-24">
      <div className="relative mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] bg-forest px-8 py-16 text-center text-forest-foreground md:py-20">
        <div className="absolute inset-0 bg-grid-faint" />
        <div className="absolute left-1/2 top-0 size-80 -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/30 blur-3xl" />
        <div className="relative">
          <h2 className="mx-auto max-w-3xl text-3xl font-bold sm:text-4xl md:text-5xl">
            Ready to stop buying fuel? <span className="text-gradient-sun">Ask Egbon.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-forest-foreground/75">
            Size your setup now or say hi on WhatsApp — it takes less than a minute.
          </p>
          <div className="mt-9 flex flex-wrap justify-center gap-3">
            <Button asChild variant="sun" size="xl">
              <Link to="/" hash="calculator">Use the calculator</Link>
            </Button>
            <Button asChild variant="whatsapp" size="xl">
              <a href={whatsappLink("Hi Egbon 👋")} target="_blank" rel="noreferrer">
                <MessageCircle /> Chat on WhatsApp
              </a>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function SiteFooter() {
  return (
    <footer className="no-print bg-forest-deep text-forest-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 md:flex-row md:items-center md:justify-between">
        <div>
          <Logo light />
          <p className="mt-3 max-w-xs text-sm text-forest-foreground/60">
            Solar first, more hands later. Honest power advice for every Nigerian home.
          </p>
        </div>
        <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-forest-foreground/70">
          <Link to="/" hash="calculator" className="hover:text-sun">Calculator</Link>
          <Link to="/quote" className="hover:text-sun">Quotation maker</Link>
          <Link to="/invoice" className="hover:text-sun">Invoice maker</Link>
          <Link to="/" hash="bot" className="hover:text-sun">WhatsApp bot</Link>
        </nav>
      </div>
      <div className="border-t border-forest-foreground/10 py-5 text-center text-xs text-forest-foreground/50">
        © {new Date().getFullYear()} Egbon. All rights reserved.
      </div>
    </footer>
  );
}
