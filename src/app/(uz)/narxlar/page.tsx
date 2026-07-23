import PricesView, { pricesMetadata } from "@/views/prices";

export const metadata = pricesMetadata("uz");

export default function Page() {
  return <PricesView locale="uz" />;
}
