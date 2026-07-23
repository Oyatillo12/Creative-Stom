import HomeView, { homeMetadata } from "@/views/home";

export const metadata = homeMetadata("uz");

export default function Page() {
  return <HomeView locale="uz" />;
}
