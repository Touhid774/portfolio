import { motion } from 'motion/react';
import { Cpu, ExternalLink, Info, Play, Star } from 'lucide-react';
import ProjectVisual from './ProjectVisual.jsx';
import LinkButton from './LinkButton.jsx';
import { GithubIcon } from './Icons.jsx';

export default function ProjectCard({ project, onOpen }) {
  const isIoT = project.category === 'IoT';
  const hasVideo = Boolean(project.video);

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.97 }}
      transition={{ duration: 0.35 }}
      whileHover={{ y: -4 }}
      className={`group card flex flex-col overflow-hidden hover:border-accent/50 ${
        project.featured ? 'lg:col-span-2 lg:flex-row' : ''
      } ${isIoT ? 'border-accent/30 shadow-glow' : ''}`}
    >
      <div className={project.featured ? 'lg:w-1/2' : ''}>
        <ProjectVisual project={project} />
      </div>

      <div className={`flex flex-1 flex-col p-5 sm:p-6 ${project.featured ? 'lg:justify-center lg:p-8' : ''}`}>
        <div className="mb-3 flex flex-wrap items-center gap-2">
          <span
            className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold ${
              isIoT ? 'bg-accent text-accent-ink' : 'border border-line bg-surface2 text-muted'
            }`}
          >
            {isIoT && <Cpu className="h-3 w-3" aria-hidden="true" />}
            {project.category}
          </span>
          {project.featured && (
            <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/40 bg-accent/10 px-2.5 py-1 text-xs font-semibold text-accent">
              <Star className="h-3 w-3" aria-hidden="true" />
              Featured project
            </span>
          )}
        </div>

        <h3 className="text-xl font-bold tracking-tight sm:text-2xl">{project.title}</h3>
        <p className="mt-1 text-sm font-medium text-accent">{project.subtitle}</p>
        <p className="mt-3 flex-1 text-sm leading-relaxed text-muted sm:text-base">{project.summary}</p>

        <ul className="mt-4 flex flex-wrap gap-2" aria-label={`${project.title} technologies`}>
          {project.tech.map((item) => (
            <li key={item} className="badge">
              {item}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap gap-2">
          <LinkButton href={project.liveUrl} icon={ExternalLink} variant="primary" unavailableHint="Live demo not available yet">
            Live Demo
          </LinkButton>
          <LinkButton href={project.repoUrl} icon={GithubIcon} unavailableHint="Repository link not added yet">
            GitHub
          </LinkButton>
          {hasVideo && (
            <LinkButton href={project.video} icon={Play}>
              Demo Video
            </LinkButton>
          )}
          <button type="button" onClick={() => onOpen(project)} className="btn btn-ghost" aria-haspopup="dialog">
            <Info className="h-4 w-4" aria-hidden="true" />
            View Details
            <span className="sr-only"> of {project.title}</span>
          </button>
        </div>
      </div>
    </motion.article>
  );
}
