import { useState } from 'react';
import { motion } from 'motion/react';
import { Mail } from 'lucide-react';
import SocialLinks from '../components/SocialLinks.jsx';
import ResumeButton from '../components/ResumeButton.jsx';
import { personalInfo } from '../data/personalInfo.js';
import { projects } from '../data/projects.js';
import { experience } from '../data/experience.js';
import { education } from '../data/education.js';
import { handleAnchorClick } from '../utils/scroll.js';

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] } },
};

// Small floating labels around the portrait. Decorative, so hidden from screen readers.
const chips = [
  { label: 'React.js', className: 'left-[-2%] top-[18%]', delay: 0 },
  { label: 'Node.js', className: 'right-[-3%] top-[34%]', delay: 0.8 },
  { label: 'MongoDB', className: 'left-[-4%] bottom-[22%]', delay: 1.6 },
  { label: 'IoT', className: 'right-[2%] bottom-[10%]', delay: 2.4 },
];

function Portrait() {
  const [failed, setFailed] = useState(false);
  const src = personalInfo.profileImage;
  const hasPhoto = Boolean(src) && !failed;
  const initials = personalInfo.logo.slice(0, 1) + personalInfo.name.split(' ').slice(-1)[0].slice(0, 1);

  return (
    <div className="relative mx-auto aspect-[4/5] w-full max-w-[420px] sm:max-w-[460px]">
      {/* soft glow behind the arch */}
      <div
        aria-hidden="true"
        className="absolute inset-[-8%] -z-10 rounded-full blur-3xl"
        style={{ background: 'radial-gradient(circle at 50% 55%, rgb(var(--accent) / 0.28), transparent 66%)' }}
      />

      {/* arch panel – the photo's head rises above its top edge */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[7%] bottom-0 top-[14%] overflow-hidden rounded-t-[999px] rounded-b-[2rem] border border-line"
        style={{
          background:
            'linear-gradient(180deg, rgb(var(--accent) / 0.22) 0%, rgb(var(--surface-2)) 55%, rgb(var(--surface)) 100%)',
        }}
      >
        <div className="grid-bg absolute inset-0 opacity-60" />
      </div>

      {/* thin offset outline for depth */}
      <div
        aria-hidden="true"
        className="absolute inset-x-[7%] bottom-0 top-[14%] translate-x-3 translate-y-3 rounded-t-[999px] rounded-b-[2rem] border border-accent/30"
        style={{ zIndex: -1 }}
      />

      {hasPhoto ? (
        // Use a PNG/WebP with a transparent background so it blends into the arch.
        <img
          src={src}
          alt={personalInfo.profileAlt}
          width="800"
          height="1000"
          fetchpriority="high"
          decoding="async"
          onError={() => setFailed(true)}
          className="absolute bottom-0 left-1/2 h-[96%] w-auto max-w-none -translate-x-1/2 select-none object-contain object-bottom drop-shadow-[0_20px_30px_rgba(0,0,0,0.35)]"
        />
      ) : (
        <div
          role="img"
          aria-label={`${personalInfo.name} monogram`}
          className="absolute inset-x-[7%] bottom-0 top-[14%] flex items-center justify-center"
        >
          <span className="font-display text-[8rem] font-extrabold leading-none tracking-tighter text-ink/90 sm:text-[9rem]">
            {initials}
          </span>
        </div>
      )}

      {/* bottom fade so the cutout sits on the panel instead of floating */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-[7%] bottom-0 h-16 rounded-b-[2rem]"
        style={{ background: 'linear-gradient(to top, rgb(var(--surface) / 0.85), transparent)' }}
      />

      {chips.map((chip) => (
        <motion.div
          key={chip.label}
          aria-hidden="true"
          className={`absolute hidden items-center gap-2 rounded-full border border-line bg-surface/80 px-3.5 py-2 text-sm font-medium shadow-lg backdrop-blur-md sm:flex ${chip.className}`}
          animate={{ y: [0, -7, 0] }}
          transition={{ duration: 5.5, delay: chip.delay, repeat: Infinity, ease: 'easeInOut' }}
        >
          <span className="h-2 w-2 rounded-full bg-accent" />
          {chip.label}
        </motion.div>
      ))}
    </div>
  );
}

function Stats() {
  const job = experience[0];
  const degree = education[0];
  const stats = [
    job && { value: job.duration, label: `${job.role}, ${job.company}` },
    { value: String(projects.length), label: 'Featured projects, web and IoT' },
    degree && { value: degree.cgpa, label: `CGPA, ${degree.qualification} (${degree.year})` },
  ].filter(Boolean);

  return (
    <dl className="mt-12 grid max-w-2xl grid-cols-1 divide-y divide-line overflow-hidden rounded-2xl border border-line bg-surface/70 backdrop-blur-sm sm:grid-cols-3 sm:divide-x sm:divide-y-0">
      {stats.map((stat) => (
        <div key={stat.label} className="px-5 py-4">
          <dt className="sr-only">{stat.label}</dt>
          <dd className="font-display text-2xl font-bold tracking-tight">{stat.value}</dd>
          <p aria-hidden="true" className="mt-1 text-xs leading-snug text-muted">
            {stat.label}
          </p>
        </div>
      ))}
    </dl>
  );
}

export default function Hero() {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-24 sm:pt-28">
      {/* ambient background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="grid-bg absolute inset-x-0 top-0 h-[38rem] opacity-50" />
        <div
          className="absolute -left-40 top-10 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgb(var(--accent) / 0.16), transparent 65%)' }}
        />
        <div
          className="absolute -right-32 top-48 h-[26rem] w-[26rem] rounded-full blur-3xl"
          style={{ background: 'radial-gradient(circle, rgb(139 92 246 / 0.14), transparent 65%)' }}
        />
      </div>

      <div className="container-page grid items-center gap-12 pb-16 lg:min-h-[calc(100vh-3.5rem)] lg:grid-cols-[1.1fr_0.9fr] lg:gap-8 lg:pb-20">
        <motion.div variants={container} initial="hidden" animate="show">
          <motion.p
            variants={item}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface/80 py-1.5 pl-2 pr-4 text-sm text-muted backdrop-blur-sm"
          >
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-accent text-[11px] font-bold text-accent-ink" aria-hidden="true">
              T
            </span>
            {personalInfo.availability ? (
              <>
                <span className="h-2 w-2 rounded-full bg-emerald-500" aria-hidden="true" />
                {personalInfo.availability}
              </>
            ) : (
              personalInfo.greeting
            )}
          </motion.p>

          <motion.h1
            id="hero-title"
            variants={item}
            className="mt-6 font-display text-[2.6rem] font-extrabold leading-[1.04] tracking-tight sm:text-6xl lg:text-[4.25rem]"
          >
            {personalInfo.headline}
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-base font-medium text-accent sm:text-lg">
            {personalInfo.subtitle}
          </motion.p>

          <motion.p variants={item} className="mt-4 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {personalInfo.intro}
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-start gap-3">
            <a href="#projects" onClick={handleAnchorClick('projects')} className="btn btn-primary px-6 shadow-glow">
              Explore My Projects
            </a>
            <ResumeButton />
            <a href="#contact" onClick={handleAnchorClick('contact')} className="btn btn-ghost">
              <Mail className="h-4 w-4" aria-hidden="true" />
              Contact Me
            </a>
          </motion.div>

          <motion.div variants={item} className="mt-7">
            <SocialLinks />
          </motion.div>

          <motion.div variants={item}>
            <Stats />
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <Portrait />
        </motion.div>
      </div>
    </section>
  );
}
