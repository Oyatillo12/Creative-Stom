import ClinicView, { clinicMetadata } from "@/views/clinic";

export const metadata = clinicMetadata("uz");

export default function Page() {
  return <ClinicView locale="uz" />;
}
