import { ImageResponse } from "next/og";

// Route segment config
export const runtime = "edge";

// Image metadata
export const size = {
  width: 32,
  height: 32,
};
export const contentType = "image/png";

// Dynamic Favicon Generator with a stylish "R"
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: "#111111", // Sleek dark minimalist background
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#f8fafc", // Clean soft white text
          fontWeight: 700,
          fontFamily: "system-ui, sans-serif",
          borderRadius: "8px",
          border: "1.5px solid #3b82f6", // Electric blue highlight border
        }}
      >
        R
      </div>
    ),
    {
      ...size,
    }
  );
}
