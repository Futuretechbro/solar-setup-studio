import { Link } from "@tanstack/react-router";
import { MessageCircle, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

const NAV = [
  { label: "Calculator", hash: "calculator" },
  { label: "Free tools", hash: "tools" },
  { label: "WhatsApp bot", hash: "bot" },
  { label: "How it works", hash: "how" },
  { label: "Why Egbon", hash: "why" },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2">
      <span className="grid size-9 place-items-center rounded-full bg-gradient-sun shadow-sun">
        <Sun className="size-5 text-sun-foreground" strokeWidth={2.5} />
      </span>
      <span
        className={`font-display text-2xl font-bold tracking-tight ${light ? "text-forest-foreground" : "text-forest"}`}
      >
        egbon
      </span>
    </Link>
  );
}

export function SiteHeader() {
  return (
    <header className="no-print sticky top-0 z-50 border-b border-forest-foreground/10 bg-forest/90 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5">
        <Logo light />
        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.hash}
              to="/"
              hash={n.hash}
              className="text-sm font-medium text-forest-foreground/75 transition-colors hover:text-sun"
            >
              {n.label}
            </Link>
          ))}
        </nav>
        <Button asChild variant="sun" size="lg">
          <a href={whatsappLink("Hi Egbon 👋")} target="_blank" rel="noreferrer">
            <MessageCircle /> Ask Egbon
          </a>
        </Button>
      </div>
    </header>
  );
}
