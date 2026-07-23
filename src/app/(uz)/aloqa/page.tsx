import ContactView, { contactMetadata } from "@/views/contact";

export const metadata = contactMetadata("uz");

export default function Page() {
  return <ContactView locale="uz" />;
}
