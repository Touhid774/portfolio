import { ArrowUp } from 'lucide-react';
import SocialLinks from './SocialLinks.jsx';
import { personalInfo } from '../data/personalInfo.js';
import { handleAnchorClick } from '../utils/scroll.js';

export default function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="container-page flex flex-col items-center justify-between gap-6 py-10 sm:flex-row">
        <div className="text-center sm:text-left">
          <p className="font-display text-base font-extrabold tracking-[0.14em]">
            {personalInfo.logo}
            <span className="text-accent">.</span>
          </p>
          <p className="mt-1 text-sm text-muted">
            © {new Date().getFullYear()} {personalInfo.name}. All rights reserved.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SocialLinks />
          <a
            href="#home"
            onClick={handleAnchorClick('home')}
            aria-label="Back to top"
            title="Back to top"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-accent text-accent-ink transition-opacity hover:opacity-90"
          >
            <ArrowUp className="h-[18px] w-[18px]" aria-hidden="true" />
          </a>
        </div>
      </div>
    </footer>
  );
}
