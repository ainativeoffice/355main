import { ImageResponse } from "next/og";

export const alt = "355 Main — Class A office suites in Armonk, New York";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const sourceImage =
  "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/355-main-office-gallery-01-big-7-vEDIaR402VeUc7p0UK3RbvXkSBdu6w.jpg";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        display: "flex",
        width: "100%",
        height: "100%",
        position: "relative",
        overflow: "hidden",
        backgroundColor: "#171a17",
        color: "#f4f1e8",
      }}
    >
      <img
        src={sourceImage}
        alt=""
        width="1200"
        height="630"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "center 55%",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(20,23,20,0.92) 0%, rgba(20,23,20,0.74) 38%, rgba(20,23,20,0.14) 72%, rgba(20,23,20,0.06) 100%)",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 28,
          display: "flex",
          border: "1px solid rgba(244,241,232,0.52)",
        }}
      />
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: 620,
          margin: "62px 0 62px 66px",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 19,
            letterSpacing: "0.16em",
            textTransform: "uppercase",
          }}
        >
          <span style={{ color: "#c96f45" }}>North Castle Ventures</span>
          <span style={{ color: "rgba(244,241,232,0.68)" }}>Armonk, New York</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontFamily: "Georgia, serif",
              fontSize: 108,
              lineHeight: 0.9,
              letterSpacing: "-0.055em",
            }}
          >
            355 Main
          </div>
          <div
            style={{
              display: "flex",
              width: 490,
              fontFamily: "Georgia, serif",
              fontSize: 39,
              lineHeight: 1.08,
              color: "rgba(244,241,232,0.92)",
            }}
          >
            A building for the work ahead.
          </div>
        </div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 18,
            fontSize: 18,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          <span>Class A office suites</span>
          <span style={{ color: "#c96f45" }}>Now leasing</span>
        </div>
      </div>
    </div>,
    size,
  );
}
