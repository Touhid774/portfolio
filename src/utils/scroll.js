const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/** Smoothly scroll to a section id and keep the URL hash in sync. */
export function scrollToId(id) {
  const el = document.getElementById(id);
  if (!el) return;
  el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' });
  if (window.history?.replaceState) window.history.replaceState(null, '', `#${id}`);
}

/** onClick helper for in-page anchors: <a href="#about" onClick={handleAnchorClick('about')}> */
export const handleAnchorClick = (id, after) => (event) => {
  event.preventDefault();
  scrollToId(id);
  if (after) after();
};
