import ContactView, { contactMetadata } from "@/views/contact";

export const metadata = contactMetadata("ru");

export default function Page() {
  return <ContactView locale="ru" />;
}
