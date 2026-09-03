/**
 * Renders a schema.org JSON-LD block.
 *
 * `<` is escaped to its unicode form so a string containing "</script>" can
 * never close the tag early — the standard guard for inlined JSON-LD.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, "\\u003c"),
      }}
    />
  );
}
