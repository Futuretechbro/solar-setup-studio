import { createFileRoute } from "@tanstack/react-router";
import { SiteHeader } from "@/components/landing/SiteHeader";
import { SiteFooter } from "@/components/landing/SiteFooter";
import { DocumentMaker } from "@/components/tools/DocumentMaker";
import { ToolPageHeader } from "@/components/tools/ToolPageHeader";

export const Route = createFileRoute("/invoice")({
  head: () => ({
    meta: [
      { title: "Free Invoice Maker in Naira | Egbon" },
      {
        name: "description",
        content: "Create professional invoices in naira for free. Add VAT, discounts and bank details, then print or save as PDF.",
      },
      { property: "og:title", content: "Free Invoice Maker | Egbon" },
      {
        property: "og:description",
        content: "Bill customers properly with a clean invoice in naira — free, no sign-up.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: InvoicePage,
});

function InvoicePage() {
  return (
    <>
      <SiteHeader />
      <main>
        <ToolPageHeader
          title="Invoice maker"
          body="Add your items and payment details. Your invoice updates live — print it or save as PDF to send."
          botPrompt="Hi Egbon, I want to make an invoice"
        />
        <DocumentMaker kind="invoice" />
      </main>
      <SiteFooter />
    </>
  );
}
