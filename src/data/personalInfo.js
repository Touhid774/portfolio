// ─────────────────────────────────────────────────────────────
//  EDIT ME — everything personal lives here.
//  Empty strings ('') mean "not provided yet": the related button is
//  shown in a disabled state instead of linking to a fake address.
// ─────────────────────────────────────────────────────────────
export const personalInfo = {
  name: "Touhidul Islam",
  preferredName: "Touhid",
  logo: "TOUHID",
  location: "Bangladesh",
  title: "Full-Stack Web Developer",

  greeting: "Hi, I'm Touhid",
  headline: "Building Modern, Scalable Web Experiences.",
  subtitle: "Full-Stack Web Developer | React.js | Node.js | IoT Enthusiast",
  intro:
    "I enjoy building responsive, secure and maintainable web applications — from React interfaces to Node.js and Express APIs — and connecting software with real devices through IoT projects.",

  // TODO: add your real links
  email: "touhidul7a2a8@gmail.com", // e.g. 'you@example.com'
  github: "https://github.com/Touhid774", // e.g. 'https://github.com/your-username'
  linkedin: "www.linkedin.com/in/touhidul-islam4", // e.g. 'https://www.linkedin.com/in/your-profile'

  // Hero portrait. Use a PNG or WebP with a TRANSPARENT background (a "cutout"),
  // portrait orientation (4:5, about 800×1000), head and shoulders.
  // Save it as public/images/profile.png (or change the path below).
  // If the file is missing, a clean "TI" monogram is shown instead.
  profileImage: "/images/profile.png",
  profileAlt: "Portrait of Touhidul Islam",

  // Put your real PDF in /public and keep the name in sync with `url`.
  resume: {
    url: "/resume.pdf",
    filename: "Touhidul-Islam-Resume.pdf",
  },

  // Set to a short string like 'Open to junior full-stack roles' ONLY if it is accurate.
  // Leave as null to hide the availability indicator.
  availability: null,

  // Contact form endpoint comes from .env (VITE_CONTACT_ENDPOINT), e.g. a Formspree URL.
  contactEndpoint: import.meta.env.VITE_CONTACT_ENDPOINT || "",
};

export const navLinks = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "skills", label: "Skills" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "contact", label: "Contact" },
];

// Facts shown in the About section (all from verified information).
export const quickFacts = [
  { label: "Location", value: "Bangladesh" },
  { label: "Education", value: "Diploma in Computer Engineering (2026)" },
  { label: "Experience", value: "Junior Developer · 6 months" },
  { label: "Focus", value: "Full-stack web & IoT" },
];
