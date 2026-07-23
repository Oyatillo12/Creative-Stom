import ImplantView, { implantMetadata } from "@/views/implant";

export const metadata = implantMetadata("ru");

export default function Page() {
  return <ImplantView locale="ru" />;
}
