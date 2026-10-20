import { Briefcase, Clock } from 'lucide-react';
import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { experience } from '../data/experience.js';

export default function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="section-pad border-t border-line bg-surface/40 pb-10 sm:pb-14">
      <div className="container-page">
        <SectionHeading id="experience-title" eyebrow="Experience" title="Professional experience" />

        <ol className="relative space-y-6 border-l border-line pl-6 sm:pl-8">
          {experience.map((job) => (
            <Reveal as="li" key={job.id} className="relative">
              <span
                className="absolute -left-[33px] top-6 flex h-4 w-4 items-center justify-center rounded-full border-2 border-accent bg-canvas sm:-left-[41px]"
                aria-hidden="true"
              />
              <article className="card p-6 hover:border-accent/50">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Briefcase className="h-5 w-5" aria-hidden="true" />
                    </span>
                    <div>
                      <h3 className="text-lg font-semibold">{job.role}</h3>
                      <p className="text-muted">{job.company}</p>
                    </div>
                  </div>
                  <span className="badge gap-1.5">
                    <Clock className="h-3 w-3" aria-hidden="true" />
                    {job.duration}
                  </span>
                </div>

                {job.summary && <p className="mt-4 text-muted">{job.summary}</p>}

                {job.highlights.length > 0 && (
                  <ul className="mt-4 list-disc space-y-1.5 pl-5 text-sm text-muted marker:text-accent">
                    {job.highlights.map((point) => (
                      <li key={point}>{point}</li>
                    ))}
                  </ul>
                )}

                {job.tech.length > 0 && (
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {job.tech.map((item) => (
                      <li key={item} className="badge">
                        {item}
                      </li>
                    ))}
                  </ul>
                )}
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
