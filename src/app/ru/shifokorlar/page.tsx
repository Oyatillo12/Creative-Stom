import DoctorsIndexView, { doctorsIndexMetadata } from "@/views/doctors-index";

export const metadata = doctorsIndexMetadata("ru");

export default function Page() {
  return <DoctorsIndexView locale="ru" />;
}
