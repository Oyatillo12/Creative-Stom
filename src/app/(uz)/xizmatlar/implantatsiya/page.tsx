import ImplantView, { implantMetadata } from "@/views/implant";

export const metadata = implantMetadata("uz");

export default function Page() {
  return <ImplantView locale="uz" />;
}
