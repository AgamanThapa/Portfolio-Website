import { ImageResponse } from "next/og";

export const alt = "Agaman Thapa | Cybersecurity Student & Developer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background: "#060708",
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
          backgroundSize: "64px 64px",
          color: "#fff",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 16, color: "#5ee7ff", fontSize: 24, letterSpacing: 4 }}>
          <div style={{ width: 12, height: 12, borderRadius: 12, background: "#3dffa0" }} />
          SYSTEM: ONLINE · KATHMANDU, NP
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 120, fontWeight: 800, letterSpacing: -4, lineHeight: 1 }}>AGAMAN THAPA</div>
          <div style={{ fontSize: 40, marginTop: 24, color: "#a3aab8" }}>
            Cybersecurity Student · Developer · Builder
          </div>
        </div>
        <div style={{ fontSize: 24, color: "#7b8494", letterSpacing: 2 }}>
          Python · Software Development · Web Development
        </div>
      </div>
    ),
    size,
  );
}
