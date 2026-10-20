import { Code2, Cpu, MessageSquare, ShoppingBag, UtensilsCrossed } from 'lucide-react';

const ICONS = {
  shopping: ShoppingBag,
  chat: MessageSquare,
  food: UtensilsCrossed,
  iot: Cpu,
};

/**
 * Shows the project screenshot (16:10) when `image` is set; otherwise a neutral
 * placeholder so the layout stays consistent until real screenshots are added.
 */
export default function ProjectVisual({ project, className = '' }) {
  const Icon = ICONS[project.icon] || Code2;

  if (project.image) {
    return (
      <div className={`aspect-[16/10] overflow-hidden bg-surface2 ${className}`}>
        <img
          src={project.image}
          alt={project.imageAlt || `${project.title} screenshot`}
          width="1280"
          height="800"
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
    );
  }

  return (
    <div
      role="img"
      aria-label={`${project.title} – screenshot coming soon`}
      className={`relative flex aspect-[16/10] items-center justify-center overflow-hidden bg-surface2 ${className}`}
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <div
        className="absolute inset-0"
        aria-hidden="true"
        style={{ background: 'radial-gradient(circle at 50% 40%, rgb(var(--accent) / 0.18), transparent 60%)' }}
      />
      <div className="relative flex flex-col items-center gap-3">
        <span className="flex h-16 w-16 items-center justify-center rounded-2xl border border-line bg-surface text-accent shadow-sm transition-transform duration-500 group-hover:scale-105">
          <Icon className="h-7 w-7" aria-hidden="true" />
        </span>
        <span className="text-xs text-muted">Screenshot coming soon</span>
      </div>
    </div>
  );
}
