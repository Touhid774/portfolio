import Reveal from '../components/Reveal.jsx';
import SectionHeading from '../components/SectionHeading.jsx';
import { quickFacts } from '../data/personalInfo.js';

export default function About() {
  return (
    <section id="about" aria-labelledby="about-title" className="section-pad">
      <div className="container-page">
        <SectionHeading id="about-title" eyebrow="About me" title="Developer with a full-stack mindset" />

        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr] lg:gap-14">
          <Reveal className="space-y-5 text-base leading-relaxed text-muted sm:text-lg">
            <p>
              I'm Touhid, a full-stack web developer from Bangladesh with a strong interest in modern web development.
              I enjoy turning ideas into clean, responsive interfaces and the APIs that power them.
            </p>
            <p>
              I work across the stack: React.js on the frontend, and Node.js, Express.js and MongoDB on the backend,
              building REST APIs and authentication flows. My project work includes an e-commerce platform and a
              real-time chat application, where I've learned how the pieces of a full-stack product fit together.
            </p>
            <p>
              I'm also interested in IoT and smart home automation — connecting appliances and devices to a control
              interface is where software meets the physical world, and I enjoy working on both sides of that link.
            </p>
            <p>
              My goal is to build responsive, secure and maintainable applications, and to keep growing as a developer
              through real projects and real teams.
            </p>
          </Reveal>

          <Reveal delay={0.1}>
            <dl className="card divide-y divide-line">
              {quickFacts.map((fact) => (
                <div key={fact.label} className="flex flex-col gap-1 p-5 sm:flex-row sm:items-baseline sm:justify-between sm:gap-6">
                  <dt className="text-sm text-muted">{fact.label}</dt>
                  <dd className="font-medium sm:text-right">{fact.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
