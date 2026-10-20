import { GraduationCap } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import { education } from '../data/education.js';

export default function Education() {
  return (
    <section id="education" aria-labelledby="education-title" className="bg-surface/40 pb-20 pt-4 sm:pb-28">
      <div className="container-page">
        <Reveal>
          <h2 id="education-title" className="mb-6 text-2xl font-bold tracking-tight sm:text-3xl">
            Education
          </h2>
        </Reveal>

        <ul className="grid gap-5 sm:grid-cols-2">
          {education.map((entry) => (
            <Reveal as="li" key={entry.id} className="card p-6 hover:border-accent/50">
              <div className="flex items-start gap-3">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                  <GraduationCap className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <h3 className="text-lg font-semibold">{entry.qualification}</h3>
                  <p className="text-muted">{entry.institution}</p>
                </div>
              </div>
              <dl className="mt-5 grid grid-cols-2 gap-4 border-t border-line pt-4 text-sm">
                <div>
                  <dt className="text-sm text-muted">Completed</dt>
                  <dd className="mt-1 font-semibold">{entry.year}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">CGPA</dt>
                  <dd className="mt-1 font-semibold">{entry.cgpa}</dd>
                </div>
              </dl>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
