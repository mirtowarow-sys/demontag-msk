type Block =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[] };

function normalizeText(raw: string) {
  return raw
    .replaceAll("\r\n", "\n")
    .replace(/\s+\n/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/\.([А-ЯA-ZЁ])/g, ". $1")
    .replace(/,([А-ЯA-ZЁа-яa-z])/g, ", $1")
    .replace(/—([А-ЯA-ZЁа-яa-z])/g, "— $1")
    .replace(/-([А-ЯA-ZЁа-яa-z])/g, "- $1")
    .replace(/\s{2,}/g, " ")
    .trim();
}

function toBlocks(raw: string): Block[] {
  const text = normalizeText(raw);
  const lines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  const blocks: Block[] = [];
  let i = 0;

  const flushList = (type: "ul" | "ol", items: string[]) => {
    if (!items.length) return;
    blocks.push({ type, items });
  };

  while (i < lines.length) {
    const line = lines[i];
    if (!line) {
      i += 1;
      continue;
    }

    // Headings: either "Что-то" + next looks like list/paragraph start OR ends with ":"
    if (
      line.length <= 80 &&
      (line.endsWith(":") ||
        (i + 1 < lines.length &&
          (/^(\d+\.|•)\s*/.test(lines[i + 1] ?? "") || (lines[i + 1]?.length ?? 0) > 80)))
    ) {
      blocks.push({ type: "h3", text: line.replace(/:$/, "") });
      i += 1;
      continue;
    }

    // UL
    if (/^•\s*/.test(line) || /^·\s*/.test(line)) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (/^(•|·)\s*/.test(lines[i] ?? "") || (lines[i] ?? "").startsWith("•"))
      ) {
        items.push((lines[i] ?? "").replace(/^(•|·)\s*/, "").trim());
        i += 1;
      }
      flushList("ul", items);
      continue;
    }

    // OL "1. xxx" (including "1.xxx")
    if (/^\d+\.\s*/.test(line) || /^\d+\.[^\s]/.test(line)) {
      const items: string[] = [];
      while (
        i < lines.length &&
        (/^\d+\.\s*/.test(lines[i] ?? "") || /^\d+\.[^\s]/.test(lines[i] ?? ""))
      ) {
        items.push(
          (lines[i] ?? "")
            .replace(/^\d+\.\s*/, "")
            .replace(/^\d+\./, "")
            .trim(),
        );
        i += 1;
      }
      flushList("ol", items);
      continue;
    }

    blocks.push({ type: "p", text: line });
    i += 1;
  }

  return blocks;
}

export function TildaBody({ text }: { text: string }) {
  const blocks = toBlocks(text);

  return (
    <div className="space-y-4 text-sm leading-relaxed text-ink/80">
      {blocks.map((b, idx) => {
        if (b.type === "h3") {
          return (
            <h3 key={idx} className="text-base font-semibold text-ink">
              {b.text}
            </h3>
          );
        }
        if (b.type === "p") {
          return <p key={idx}>{b.text}</p>;
        }
        if (b.type === "ul") {
          return (
            <ul key={idx} className="space-y-2">
              {b.items.map((item) => (
                <li key={item} className="flex gap-2">
                  <span className="mt-2 size-1.5 shrink-0 rounded-full bg-brand" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          );
        }
        if (b.type === "ol") {
          return (
            <ol key={idx} className="list-decimal space-y-2 pl-5">
              {b.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          );
        }
        return null;
      })}
    </div>
  );
}
