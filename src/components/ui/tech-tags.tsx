type TechTagsProps = {
  items: string[];
  className?: string;
  /** `solid` reads a little stronger — used on detail pages. */
  variant?: "subtle" | "solid";
};

export function TechTags({
  items,
  className = "",
  variant = "subtle",
}: TechTagsProps) {
  const tone =
    variant === "solid"
      ? "border-line bg-ink-soft text-cream"
      : "border-line text-muted";

  return (
    <ul className={`flex flex-wrap gap-2 ${className}`}>
      {items.map((item) => (
        <li
          key={item}
          className={`rounded-full border px-3 py-1 text-[0.6875rem] tracking-wide ${tone}`}
        >
          {item}
        </li>
      ))}
    </ul>
  );
}
