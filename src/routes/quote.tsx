import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { DocumentMaker } from "@/components/tools/DocumentMaker";
import { ToolPageHeader } from "@/components/tools/ToolPageHeader";

export const Route = createFileRoute("/quote")({
  head: () => ({
    meta: [
      { title: "Free Quotation Maker for Solar Installers | Egbon" },
      {
        name: "description",
        content: "Create professional solar quotations in naira for free. Add items, VAT and discounts, then print or save as PDF.",
      },
      { property: "og:title", content: "Free Quotation Maker | Egbon" },
      {
        property: "og:description",
        content: "Make clean, professional quotes in naira in seconds — free, no sign-up.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: QuotePage,
});

function QuotePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ToolPageHeader
          title="Quotation maker"
          body="Fill in your details on the left and watch your quote come together. Print it or save as PDF when you're done."
          botPrompt="Hi Egbon, I want to make a quote"
        />
        <DocumentMaker kind="quote" />
      </main>
      <SiteFooter />
    </>
  );
}
