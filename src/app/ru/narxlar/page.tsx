import PricesView, { pricesMetadata } from "@/views/prices";

export const metadata = pricesMetadata("ru");

export default function Page() {
  return <PricesView locale="ru" />;
}
