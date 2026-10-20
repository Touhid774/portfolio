import { useCallback, useMemo, useState } from 'react';
import { AnimatePresence } from 'motion/react';
import SectionHeading from '../components/SectionHeading.jsx';
import ProjectCard from '../components/ProjectCard.jsx';
import ProjectModal from '../components/ProjectModal.jsx';
import { projects } from '../data/projects.js';

const ALL = 'All Projects';

export default function Projects() {
  const [filter, setFilter] = useState(ALL);
  const [selected, setSelected] = useState(null);

  // Filters are generated from real data, so an empty category never appears.
  const categories = useMemo(() => [ALL, ...new Set(projects.map((project) => project.category))], []);
  const visible = filter === ALL ? projects : projects.filter((project) => project.category === filter);

  const closeModal = useCallback(() => setSelected(null), []);

  return (
    <section id="projects" aria-labelledby="projects-title" className="section-pad">
      <div className="container-page">
        <SectionHeading
          id="projects-title"
          eyebrow="Featured projects"
          title="Things I've built"
          description="Full-stack web applications and an IoT project that connects software with real devices."
        />

        <div role="group" aria-label="Filter projects by category" className="mb-8 flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = filter === category;
            return (
              <button
                key={category}
                type="button"
                aria-pressed={active}
                onClick={() => setFilter(category)}
                className={`min-h-[44px] rounded-full border px-4 text-sm font-medium transition-colors ${
                  active
                    ? 'border-accent bg-accent text-accent-ink'
                    : 'border-line bg-surface text-muted hover:border-accent/60 hover:text-ink'
                }`}
              >
                {category}
              </button>
            );
          })}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <AnimatePresence initial={false}>
            {visible.map((project) => (
              <ProjectCard
                key={project.id}
                project={{ ...project, featured: project.featured && filter === ALL }}
                onOpen={setSelected}
              />
            ))}
          </AnimatePresence>
        </div>
      </div>

      <AnimatePresence>
        {selected && <ProjectModal key={selected.id} project={selected} onClose={closeModal} />}
      </AnimatePresence>
    </section>
  );
}
