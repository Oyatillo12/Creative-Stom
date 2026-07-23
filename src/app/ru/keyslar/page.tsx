import CasesIndexView, { casesIndexMetadata } from "@/views/cases-index";

export const metadata = casesIndexMetadata("ru");

export default function Page() {
  return <CasesIndexView locale="ru" />;
}
