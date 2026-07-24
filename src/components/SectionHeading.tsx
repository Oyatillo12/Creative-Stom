type Tone = "light" | "dark";

// The site's single heading motif: a bordered pill eyebrow with a coral dot,
// then a chunky display heading. Left-aligned always.
export default function SectionHeading({
  eyebrow,
  heading,
  description,
  tone = "light",
  className = "",
}: {
  eyebrow: string;
  heading: string;
  description?: string;
  tone?: Tone;
  className?: string;
}) {
  const headingColor = tone === "dark" ? "text-paper" : "text-ink";
  const descriptionColor = tone === "dark" ? "text-paper/75" : "text-ink/70";
  const pillCls =
    tone === "dark"
      ? "border-paper/30 bg-violet-2 text-paper"
      : "border-ink/15 bg-card text-ink";

  return (
    <div className={`text-left ${className}`}>
      <span
        className={`inline-flex items-center gap-2.5 rounded-full border-[1.5px] px-4 py-2 font-body text-xs font-semibold uppercase tracking-[0.14em] ${pillCls}`}
      >
        <span aria-hidden="true" className="h-2 w-2 rounded-full bg-coral" />
        {eyebrow}
      </span>
      <h2
        className={`mt-6 font-display text-[1.7rem] leading-[1.15] font-medium md:text-4xl lg:text-[2.75rem] ${headingColor}`}
      >
        {heading}
      </h2>
      {description ? (
        <p className={`mt-5 max-w-xl font-body text-base leading-relaxed ${descriptionColor}`}>
          {description}
        </p>
      ) : null}
    </div>
  );
}
