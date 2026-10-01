import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE } from "@/lib/site";

// Social share card (1200×630), used by Open Graph and, as a fallback, X/Twitter.
// ImageResponse can't read CSS variables, so the brand colours are literal here (they mirror app/globals.css).

export const alt = "Youth for Challenge — your virtual job fair";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const COLORS = { bg: "#0c081f", surface: "#18152a", border: "#2f2c3f", fg: "#f1f1f3", muted: "#bcbac5", primary: "#cc525f" };

export default async function OpengraphImage() {
  // Inter as TTF (ImageResponse can't read the woff2 files next/font produces). Licence: SIL OFL.
  const [icon, inter400, inter700] = await Promise.all([
    readFile(join(process.cwd(), "app/icon.svg"), "utf8"),
    readFile(join(process.cwd(), "assets/fonts/Inter-400.ttf")),
    readFile(join(process.cwd(), "assets/fonts/Inter-700.ttf")),
  ]);
  const iconSrc = `data:image/svg+xml;base64,${Buffer.from(icon).toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: `radial-gradient(circle at 85% 20%, rgba(204,82,95,0.35), transparent 55%), ${COLORS.bg}`,
          color: COLORS.fg,
          fontFamily: "Inter",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 24 }}>
          {/* eslint-disable-next-line @next/next/no-img-element -- ImageResponse renders plain <img> */}
          <img src={iconSrc} width={88} height={88} alt="" />
          <span style={{ fontSize: 34, fontWeight: 700, letterSpacing: 2 }}>YOUTH FOR CHALLENGE</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <span style={{ fontSize: 84, fontWeight: 700, lineHeight: 1.05, letterSpacing: -2 }}>Your virtual job fair</span>
          <span style={{ fontSize: 32, color: COLORS.muted, maxWidth: 900, lineHeight: 1.35 }}>{SITE.description}</span>
        </div>

        <div style={{ display: "flex", gap: 16 }}>
          {["Reception", "Conferences", "Lounge"].map((label, i) => (
            <span
              key={label}
              style={{
                display: "flex",
                padding: "12px 26px",
                borderRadius: 12,
                fontSize: 26,
                border: `2px solid ${i === 2 ? COLORS.primary : COLORS.border}`,
                background: i === 2 ? COLORS.primary : COLORS.surface,
                color: COLORS.fg,
              }}
            >
              {label}
            </span>
          ))}
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Inter", data: inter400, style: "normal", weight: 400 },
        { name: "Inter", data: inter700, style: "normal", weight: 700 },
      ],
    },
  );
}
