import { ImageResponse } from "next/og";
import { getContent } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand card: navy field, gold rule, clinic name + localized tagline.
export default function OpengraphImage() {
  const site = getContent("uz");
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#10263B",
          color: "#F5F2EC",
          fontFamily: "Georgia, serif",
        }}
      >
        <div style={{ width: 72, height: 4, backgroundColor: "#C19A5B", marginBottom: 40 }} />
        <div style={{ fontSize: 96 }}>{site.clinic.name}</div>
        <div style={{ fontSize: 36, marginTop: 28, color: "#C19A5B" }}>{site.homepage.hero.heading}</div>
      </div>
    ),
    size,
  );
}
