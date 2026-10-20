import { MotionConfig } from 'motion/react';
import Navbar from './components/Navbar.jsx';
import Footer from './components/Footer.jsx';
import Hero from './sections/Hero.jsx';
import About from './sections/About.jsx';
import Skills from './sections/Skills.jsx';
import Projects from './sections/Projects.jsx';
import Experience from './sections/Experience.jsx';
import Education from './sections/Education.jsx';
import Contact from './sections/Contact.jsx';
import { useTheme } from './hooks/useTheme.js';
import { useActiveSection } from './hooks/useActiveSection.js';

// Defined outside the component so the array identity is stable.
const SECTION_IDS = ['home', 'about', 'skills', 'projects', 'experience', 'education', 'contact'];

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const activeId = useActiveSection(SECTION_IDS);

  return (
    // reducedMotion="user" skips transform animations for visitors who prefer reduced motion.
    <MotionConfig reducedMotion="user">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-full focus:bg-accent focus:px-4 focus:py-2 focus:text-accent-ink"
      >
        Skip to content
      </a>

      <Navbar activeId={activeId} theme={theme} onToggleTheme={toggleTheme} />

      <main id="main">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Contact />
      </main>

      <Footer />
    </MotionConfig>
  );
}
