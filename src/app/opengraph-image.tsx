import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { ImageResponse } from "next/og";
import { SITE_URL, displayUrl } from "@/data/contact";

// Social preview (LinkedIn, WhatsApp, X…): name + title on the left, unda's weekly
// view in a browser frame on the right. Text is language-neutral, so one image
// serves both locales.

export const alt =
  "Laura Pommarés — Full Stack Developer · Next.js & UX/UI, junto a la vista semanal de unda";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const ink = "#111111";
const muted = "#6b7280";
const accent = "#0d9488";
const line = "#e5e7eb";

export default async function Image() {
  const screenshot = await readFile(
    join(process.cwd(), "public/projects/unda/og-vista-semanal.jpg"),
  );
  const screenshotSrc = `data:image/jpeg;base64,${screenshot.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          background: "#ffffff",
          padding: "0 0 0 72px",
          borderTop: `10px solid ${accent}`,
        }}
      >
        <div style={{ display: "flex", flexDirection: "column", width: 500 }}>
          <div style={{ fontSize: 30, fontWeight: 700, color: ink, letterSpacing: -0.5 }}>
            Laura Pommarés
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              marginTop: 28,
              fontSize: 62,
              fontWeight: 700,
              lineHeight: 1.02,
              letterSpacing: -2,
              color: ink,
            }}
          >
            <span>Full Stack</span>
            <span>Developer</span>
            <span style={{ color: accent, fontStyle: "italic" }}>Next.js & UX/UI</span>
          </div>
          <div style={{ marginTop: 32, fontSize: 22, color: muted, lineHeight: 1.4 }}>
            React · Next.js · TypeScript · PostgreSQL · Figma
          </div>
          <div style={{ marginTop: 40, fontSize: 20, color: accent }}>
            {displayUrl(SITE_URL)}
          </div>
        </div>

        {/* Browser frame, bleeding off the right edge */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            marginLeft: 48,
            width: 640,
            border: `1px solid ${line}`,
            borderRight: "none",
            borderRadius: "12px 0 0 12px",
            overflow: "hidden",
            boxShadow: "0 20px 50px rgba(0,0,0,0.12)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              height: 40,
              padding: "0 16px",
              background: "#f9f9f9",
              borderBottom: `1px solid ${line}`,
            }}
          >
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#d1d5db", marginRight: 6 }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#d1d5db", marginRight: 6 }} />
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#d1d5db", marginRight: 16 }} />
            <div
              style={{
                display: "flex",
                padding: "4px 12px",
                fontSize: 14,
                color: muted,
                background: "#ffffff",
                border: `1px solid ${line}`,
                borderRadius: 4,
              }}
            >
              agendaunda.com
            </div>
          </div>
          <img src={screenshotSrc} width={640} height={400} alt="" style={{ objectFit: "cover" }} />
        </div>
      </div>
    ),
    size,
  );
}
