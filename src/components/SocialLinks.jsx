import { Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "./Icons.jsx";
import { personalInfo } from "../data/personalInfo.js";

const base =
  "inline-flex h-11 w-11 items-center justify-center rounded-full border border-line bg-surface text-muted transition-colors";

function IconLink({ href, label, children, external = true }) {
  if (!href) {
    return (
      <button
        type="button"
        disabled
        aria-label={`${label} (link not added yet)`}
        title={`${label}: link not added yet`}
        className={`${base} cursor-not-allowed opacity-50`}
      >
        {children}
      </button>
    );
  }
  return (
    <a
      href={href}
      aria-label={label}
      title={label}
      className={`${base} hover:border-accent/60 hover:text-ink`}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

export default function SocialLinks({ className = "" }) {
  return (
    <div className={`flex hover:scale-0.3 items-center gap-2 ${className}`}>
      <IconLink href={personalInfo.github} label="GitHub profile">
        <GithubIcon className="h-[18px] w-[18px]" />
      </IconLink>
      <IconLink href={personalInfo.linkedin} label="LinkedIn profile">
        <LinkedinIcon className="h-[18px] w-[18px]" />
      </IconLink>
      <IconLink
        href={personalInfo.email ? `mailto:${personalInfo.email}` : ""}
        label="Send an email"
        external={false}
      >
        <Mail className="h-[18px] w-[18px]" aria-hidden="true" />
      </IconLink>
    </div>
  );
}
