type JsonLdProps = {
  data: unknown;
};

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      // next/head isn't needed in App Router pages; script is fine.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
