import ClinicView, { clinicMetadata } from "@/views/clinic";

export const metadata = clinicMetadata("ru");

export default function Page() {
  return <ClinicView locale="ru" />;
}
