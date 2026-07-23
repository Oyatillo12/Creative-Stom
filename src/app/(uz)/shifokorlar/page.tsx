import DoctorsIndexView, { doctorsIndexMetadata } from "@/views/doctors-index";

export const metadata = doctorsIndexMetadata("uz");

export default function Page() {
  return <DoctorsIndexView locale="uz" />;
}
