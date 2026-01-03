interface SeoHeadProps {
  jsonLd?: Record<string, unknown>[];
}

export function SeoHead({ jsonLd = [] }: SeoHeadProps) {
  if (!jsonLd.length) return null;
  return (
    <>
      {jsonLd.map((entry, idx) => (
        <script
          dangerouslySetInnerHTML={{ __html: JSON.stringify(entry) }}
          key={idx}
          type="application/ld+json"
        />
      ))}
    </>
  );
}
