import { ImageResponse } from "@vercel/og";

export function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 128,
          background: "lavender",
        }}
      >
        Hello!
      </div>
    )
  );
}

