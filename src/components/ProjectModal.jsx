import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Check, ExternalLink, Play, X } from 'lucide-react';
import ProjectVisual from './ProjectVisual.jsx';
import LinkButton from './LinkButton.jsx';
import { GithubIcon } from './Icons.jsx';

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

export default function ProjectModal({ project, onClose }) {
  const dialogRef = useRef(null);
  const closeRef = useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    closeRef.current?.focus();

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        onClose();
        return;
      }
      if (event.key !== 'Tab' || !dialogRef.current) return;

      // Keep keyboard focus inside the dialog.
      const items = dialogRef.current.querySelectorAll(FOCUSABLE);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  const titleId = `project-title-${project.id}`;

  return (
    <motion.div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={(event) => event.target === event.currentTarget && onClose()}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="relative max-h-[92vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-line bg-surface sm:rounded-3xl"
      >
        <button
          ref={closeRef}
          type="button"
          onClick={onClose}
          aria-label="Close project details"
          className="absolute right-4 top-4 z-10 inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-canvas/90 text-ink backdrop-blur transition-colors hover:border-accent/60"
        >
          <X className="h-5 w-5" aria-hidden="true" />
        </button>

        <ProjectVisual project={project} />

        <div className="p-6 sm:p-8">
          <p className="text-sm font-semibold text-accent">{project.category}</p>
          <h3 id={titleId} className="mt-2 text-2xl font-bold tracking-tight sm:text-3xl">
            {project.title}
          </h3>
          <p className="mt-1 text-sm font-medium text-muted">{project.subtitle}</p>
          <p className="mt-4 leading-relaxed text-muted">{project.summary}</p>

          {project.features.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Features</h4>
              <ul className="mt-3 grid gap-2 sm:grid-cols-2">
                {project.features.map((feature) => (
                  <li key={feature} className="flex items-start gap-2 text-sm text-muted">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-accent" aria-hidden="true" />
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.tech.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Technologies</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.tech.map((item) => (
                  <li key={item} className="badge">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.hardware.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Hardware</h4>
              <ul className="mt-3 flex flex-wrap gap-2">
                {project.hardware.map((item) => (
                  <li key={item} className="badge">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {project.gallery.length > 0 && (
            <div className="mt-6">
              <h4 className="text-sm font-semibold uppercase tracking-wider">Gallery</h4>
              <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {project.gallery.map((shot) => (
                  <li key={shot.src} className="aspect-[16/10] overflow-hidden rounded-xl border border-line">
                    <img src={shot.src} alt={shot.alt} loading="lazy" decoding="async" className="h-full w-full object-cover" />
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            <LinkButton href={project.liveUrl} icon={ExternalLink} variant="primary" unavailableHint="Live demo not available yet">
              Live Demo
            </LinkButton>
            <LinkButton href={project.repoUrl} icon={GithubIcon} unavailableHint="Repository link not added yet">
              GitHub Repository
            </LinkButton>
            {project.video && (
              <LinkButton href={project.video} icon={Play}>
                Demo Video
              </LinkButton>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}
