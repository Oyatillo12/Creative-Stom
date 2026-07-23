import CasesIndexView, { casesIndexMetadata } from "@/views/cases-index";

export const metadata = casesIndexMetadata("uz");

export default function Page() {
  return <CasesIndexView locale="uz" />;
}
