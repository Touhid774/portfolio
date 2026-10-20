import Reveal from './Reveal.jsx';

export default function SectionHeading({ eyebrow, title, description, id }) {
  return (
    <Reveal className="mb-12 max-w-2xl">
      <p className="mb-3 flex items-center gap-3 text-sm font-semibold text-accent">
        <span className="h-px w-8 bg-accent/60" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className="text-3xl font-extrabold tracking-tight sm:text-5xl">
        {title}
      </h2>
      {description && <p className="mt-4 text-base leading-relaxed text-muted sm:text-lg">{description}</p>}
    </Reveal>
  );
}
