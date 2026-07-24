import { ImageResponse } from "next/og";
import { getContent } from "@/content";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Brand card: violet field, coral dot, clinic name + localized tagline.
export default function OpengraphImage() {
  const site = getContent("ru");
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
          backgroundColor: "#5546E8",
          color: "#F6F7FE",
          fontFamily: "Arial, sans-serif",
        }}
      >
        <div style={{ width: 40, height: 40, borderRadius: 20, backgroundColor: "#FF6752", marginBottom: 40 }} />
        <div style={{ fontSize: 88, fontWeight: 700 }}>{site.clinic.name}</div>
        <div style={{ fontSize: 34, marginTop: 28, color: "#D8E9FF" }}>{site.homepage.hero.heading}</div>
      </div>
    ),
    size,
  );
}
