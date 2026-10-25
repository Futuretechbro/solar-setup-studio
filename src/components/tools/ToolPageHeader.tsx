import { MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { whatsappLink } from "@/lib/site";

export function ToolPageHeader({ title, body, botPrompt }: { title: string; body: string; botPrompt: string }) {
  return (
    <section className="no-print bg-gradient-forest text-forest-foreground">
      <div className="mx-auto flex max-w-7xl flex-col gap-6 px-5 py-14 md:flex-row md:items-end md:justify-between">
        <div className="max-w-2xl">
          <p className="text-xs font-bold uppercase tracking-[0.25em] text-sun">Free Egbon tool</p>
          <h1 className="mt-3 text-4xl font-bold md:text-5xl">{title}</h1>
          <p className="mt-3 text-forest-foreground/75">{body}</p>
        </div>
        <Button asChild variant="whatsapp" size="lg">
          <a href={whatsappLink(botPrompt)} target="_blank" rel="noreferrer">
            <MessageCircle /> Do this on WhatsApp
          </a>
        </Button>
      </div>
    </section>
  );
}
