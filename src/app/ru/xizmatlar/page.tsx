import ServicesIndexView, { servicesIndexMetadata } from "@/views/services-index";

export const metadata = servicesIndexMetadata("ru");

export default function Page() {
  return <ServicesIndexView locale="ru" />;
}
