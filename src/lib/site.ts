export const BRAND = "Egbon";

// Placeholder until the real Egbon WhatsApp bot number is provided (digits only, no "+").
export const WHATSAPP_NUMBER = "2348000000000";

export function whatsappLink(message?: string) {
  const base = `https://wa.me/${WHATSAPP_NUMBER}`;
  return message ? `${base}?text=${encodeURIComponent(message)}` : base;
}

export function formatNaira(value: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: "NGN",
    maximumFractionDigits: 2,
  }).format(Number.isFinite(value) ? value : 0);
}
