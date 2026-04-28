import { ImageResponse } from "next/og";

import { pages } from "@/content/pages";
import { SITE_NAME } from "@/lib/site";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const url = `/articles/${slug}`;
  const p = pages.find((x) => x.url === url);
  const title = p?.title ?? "Статья";
  const description = p?.description ?? "Полезные материалы и новости по демонтажным работам.";

  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 64,
        background: "#0b0b0b",
        color: "#f3f3f3",
      }}
    >
      <div style={{ display: "flex", gap: 12, alignItems: "center" }}>
        <div
          style={{
            width: 14,
            height: 14,
            borderRadius: 999,
            background: "#ffcb2e",
          }}
        />
        <div style={{ fontSize: 28, fontWeight: 700 }}>{SITE_NAME}</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
        <div style={{ fontSize: 56, fontWeight: 800, lineHeight: 1.05 }}>{title}</div>
        <div style={{ fontSize: 28, opacity: 0.9, lineHeight: 1.3 }}>{description}</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", fontSize: 22, opacity: 0.8 }}>
        <div>Статьи</div>
        <div>demontagmsk.ru</div>
      </div>
    </div>,
    size,
  );
}
