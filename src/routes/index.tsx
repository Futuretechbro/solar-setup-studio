import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { Hero } from "@/components/landing/Hero";
import { BrandsMarquee } from "@/components/landing/BrandsMarquee";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { FreeTools } from "@/components/landing/FreeTools";
import { SolarCalculator } from "@/components/landing/SolarCalculator";
import { WhatsAppBot } from "@/components/landing/WhatsAppBot";
import { WhyEgbon } from "@/components/landing/WhyEgbon";
import { MoreHands } from "@/components/landing/MoreHands";
import { FinalCta, SiteFooter } from "@/components/landing/SiteFooter";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Egbon — Solar Calculator, Quotes & Invoices on WhatsApp" },
      {
        name: "description",
        content:
          "Size your solar inverter, batteries and panels for free, make quotes and invoices, and get matched with vetted installers — on the web or WhatsApp.",
      },
      { property: "og:title", content: "Egbon — Stop guessing your solar. Ask Egbon." },
      {
        property: "og:description",
        content: "Free solar calculator, quotation maker and invoice maker for Nigerian homes and installers — also on WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <SiteHeader />
      <main>
        <Hero />
        <BrandsMarquee />
        <HowItWorks />
        <FreeTools />
        <SolarCalculator />
        <WhatsAppBot />
        <WhyEgbon />
        <MoreHands />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
