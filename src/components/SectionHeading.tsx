type Tone = "light" | "dark";

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
  const eyebrowColor = tone === "dark" ? "text-gold" : "text-gold-dark";
  const headingColor = tone === "dark" ? "text-ivory" : "text-navy";
  const descriptionColor = tone === "dark" ? "text-ivory/70" : "text-muted";

  return (
    <div className={`text-left ${className}`}>
      <span className={`font-body text-xs font-semibold uppercase tracking-[0.24em] ${eyebrowColor}`}>
        {eyebrow}
      </span>
      <div className="mt-5 mb-7 h-0.5 w-14 bg-gold" />
      <h2 className={`font-display text-4xl leading-tight md:text-5xl lg:text-6xl ${headingColor}`}>
        {heading}
      </h2>
      {description ? (
        <p className={`mt-6 max-w-xl text-base leading-relaxed ${descriptionColor}`}>{description}</p>
      ) : null}
    </div>
  );
}
