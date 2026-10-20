import { Cpu, Database, Layout, Server, Wrench } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { skillCategories } from '../data/skills.js';

const ICONS = {
  frontend: Layout,
  backend: Server,
  database: Database,
  tools: Wrench,
  iot: Cpu,
};

export default function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="section-pad border-y border-line bg-surface/40">
      <div className="container-page">
        <SectionHeading
          id="skills-title"
          eyebrow="Skills & technologies"
          title="The tools I work with"
          description="Technologies I use in my projects and can talk through in detail."
        />

        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCategories.map((category, index) => {
            const Icon = ICONS[category.icon] || Layout;
            return (
              <Reveal as="li" key={category.id} delay={index * 0.06} className="card p-6 hover:border-accent/50">
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/10 text-accent">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </span>
                  <h3 className="font-semibold">{category.title}</h3>
                </div>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {category.items.map((skill) => (
                    <li key={skill} className="badge text-sm text-ink">
                      {skill}
                    </li>
                  ))}
                </ul>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
