import ServicesIndexView, { servicesIndexMetadata } from "@/views/services-index";

export const metadata = servicesIndexMetadata("uz");

export default function Page() {
  return <ServicesIndexView locale="uz" />;
}
