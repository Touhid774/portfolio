# Touhid — Developer Portfolio

A premium, dark-first portfolio for **Touhidul Islam (Touhid)**, Full-Stack Web Developer.
Built with **React + Vite**, **Tailwind CSS**, **Motion for React** and **Lucide** icons.
It is frontend-only: no backend or database is needed.

## Status of this code

The source was written without being able to run `npm install` / `npm run build` in the authoring
environment (the package registry was blocked there). **Run the commands below once and fix anything
the build reports before publishing.**

## 1. Run it locally

Requires Node.js 18 or newer.

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # production build into /dist
npm run preview    # serve the production build locally
```

## 2. Add your real content (do this before publishing)

| What | Where |
| --- | --- |
| Name, headline, intro, **email, GitHub, LinkedIn**, resume path | `src/data/personalInfo.js` |
| Skills (only list what you can discuss in an interview) | `src/data/skills.js` |
| Projects: links, screenshots, features, tech, hardware, video | `src/data/projects.js` |
| Work experience (responsibilities, technologies) | `src/data/experience.js` |
| Education, internships, certificates | `src/data/education.js` |

Links left empty (`''` or `null`) are shown as **disabled buttons**, never as fake links.

### Review checklist — verify these match reality
- [ ] Each project's `features`, `tech` and `hardware` list only what you actually built.
      (Socket.io for the chat app and the generic feature lines were written from your descriptions — confirm them.)
- [ ] The Smart Home project lists the real hardware (ESP32/ESP8266, relays, sensors…) and protocol (MQTT/HTTP/WebSocket).
- [ ] Skills you marked "if used / if proficient" (Tailwind CSS, ESP32, Arduino, MQTT…) are added only if true — see the comments in `skills.js`.
- [ ] Experience `highlights` contain only verified responsibilities at Dalazu Technology Ltd.

### Resume
1. Export your resume as a PDF.
2. Save it as `public/resume.pdf` (or change `resume.url` in `personalInfo.js`).
3. The button checks that the file exists and shows a clear message if it does not.

### Hero photo (transparent background)
1. Use a **cutout** portrait: PNG or WebP with a transparent background, head and shoulders,
   portrait orientation (about 800×1000, 4:5). Free tools to remove a background: remove.bg, Adobe Express, or Photopea.
2. Save it as `public/images/profile.png` (or change `profileImage` in `src/data/personalInfo.js`).
3. It appears inside an arch-shaped panel, with the head rising above the top edge.
   If the file is missing, a "TI" monogram is shown instead, so the hero never looks broken.
4. A photo with a solid background will show as a rectangle — it must be a transparent cutout.

### Project screenshots
Add images to `public/images/` (16:10, about 1280×800, WebP/JPG) and set e.g.
`image: '/images/zen-closet.webp'` in `projects.js`. Until then a neutral placeholder is shown.
For the IoT project use `gallery` and `video` for hardware photos and a demo video.

### Social sharing image (optional)
Add a 1200×630 image at `public/og-image.png` and add these tags to `index.html`
(use your real domain):
```html
<meta property="og:image" content="https://YOUR-DOMAIN/og-image.png" />
<meta property="og:url" content="https://YOUR-DOMAIN/" />
```

## 3. Contact form

The form validates input on the client and works in three modes:

1. **Endpoint configured (recommended)** — messages are POSTed as JSON to `VITE_CONTACT_ENDPOINT`.
   Easiest option: create a free form at [formspree.io](https://formspree.io), copy its URL
   (`https://formspree.io/f/xxxxxxxx`) and put it in `.env`:
   ```bash
   cp .env.example .env
   # then edit .env
   VITE_CONTACT_ENDPOINT=https://formspree.io/f/xxxxxxxx
   ```
   On Vercel add the same variable under *Project → Settings → Environment Variables*.
2. **No endpoint, but `email` set** — the visitor's email app opens with the message pre-filled.
   The UI says so; it never claims the message was delivered.
3. **Nothing configured** — the form shows an honest "not configured yet" error.

Spam protection: a hidden honeypot field. Rate limiting is provided by the form service.
Never put secrets in `VITE_` variables — they are public in the built site.

## 4. Push to GitHub

```bash
git init
git add .
git commit -m "Initial portfolio"
git branch -M main
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```
`.env` is git-ignored; only `.env.example` is committed.

## 5. Deploy to Vercel (frontend)

1. Sign in at vercel.com with GitHub and click **Add New → Project**.
2. Import the repository. Vercel detects Vite automatically
   (Build command `npm run build`, Output directory `dist`).
3. Add `VITE_CONTACT_ENDPOINT` under **Environment Variables**.
4. Click **Deploy**. Every push to `main` redeploys automatically.

`vercel.json` adds basic security headers and long-term caching for built assets.
`public/404.html` is served for unknown URLs.

### Custom domain
1. Vercel project → **Settings → Domains → Add** and enter your domain.
2. At your registrar add the DNS records Vercel shows
   (usually an `A` record `76.76.21.21` for the apex domain and a `CNAME` to `cname.vercel-dns.com` for `www`;
   use exactly what the Vercel dashboard displays).
3. Wait for DNS propagation; HTTPS is issued automatically.

## 6. Backend (not included, on purpose)

Nothing here needs a server, so none was added. If you later want a
dashboard to edit content or store messages, add a separate `backend/` folder
(Express + Mongoose, hashed passwords, JWT auth, validation, rate limiting, env-based config)
and deploy it to **Render** as a Web Service with its secrets set in Render's environment settings.

## Project structure

```
src/
  components/   Navbar, Footer, ProjectCard, ProjectModal, ThemeToggle, LinkButton, …
  sections/     Hero, About, Skills, Projects, Experience, Education, Contact
  data/         personalInfo, skills, projects, experience, education
  hooks/        useTheme, useActiveSection
  utils/        scroll, validation
  styles/       index.css (theme tokens + Tailwind layers)
public/         favicon.svg, 404.html, images/, resume.pdf (you add this)
```

## Features
- Dark default theme with light mode toggle, saved in `localStorage`, no flash on reload
- Smooth-scroll navigation with active-section highlighting and an accessible mobile menu
- Project cards with working category filters (generated from your data) and a details dialog
- Respects `prefers-reduced-motion`; keyboard-accessible, skip link, visible focus states
- Semantic HTML, meta description, Open Graph tags, lazy-loaded images, custom 404 page
