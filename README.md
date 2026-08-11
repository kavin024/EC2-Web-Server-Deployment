# KAVIN P — DevOps Portfolio

A production-quality, single-page personal portfolio for **KAVIN P — Entry-Level DevOps Engineer (AWS / Cloud / Automation)**.

Built with **only HTML5, CSS3 and vanilla JavaScript** — no frameworks, no build step, no dependencies.

---

## Run it locally

Just open `index.html` in any modern browser, or serve it with any static server:

```bash
# Python
python -m http.server 8000

# npx
npx serve .

# VS Code
# Use the "Live Server" extension, or `npx serve` above.
```

Then visit `http://localhost:8000`.

---

## Project structure

```
portfolio/
├── index.html          # All sections (semantic HTML, inline SVG icon sprite)
├── css/
│   └── style.css       # Design system, sections, animations, responsive, reduced-motion
├── js/
│   └── script.js       # Vanilla JS: nav, cursor, tilt, reveal, terminal, particles, form
├── assets/
│   ├── images/         # Put og-image.png here if desired
│   └── resume.pdf      # <-- REPLACE THIS with your real resume
└── README.md
```

---

## Before you publish — replace these placeholders

Everything below is a **clearly marked placeholder** — fill in your real values:

| Item | Where | What to do |
| --- | --- | --- |
| **Resume PDF** | `assets/resume.pdf` | Replace with your actual resume (keep the same filename) |
| **GitHub / LinkedIn URLs** | `index.html` — search for `href="#"` | Replace the `#` with your real profile URLs (hero, project buttons, contact list, footer) |
| **Portfolio domain** | `<meta property="og:url">` in `index.html` | Set to your live portfolio URL |
| **OG preview image** | `assets/images/og-image.png` | Optional 1200×630 image used when the link is shared |

Search the HTML for the comments `<!-- Replace ... -->` to find every spot.

---

## Content source of truth

All content comes from the uploaded resume (`KAVIN P`):

- **Role:** Entry-Level DevOps Engineer — AWS, Docker, CI/CD, Linux, Automation
- **Education:** B.E., Computer Science and Engineering, Chettinad College of Engineering and Technology (2022–2026)
- **Skills:** Docker, GitHub Actions, AWS (EC2, S3, RDS, DynamoDB, VPC, Lambda, IAM, CloudWatch, Cognito), Linux, Python, JavaScript, HTML, CSS, PHP, MySQL, GitHub, VS Code, Antigravity
- **Projects:** AWS Photos (serverless photo management) · Malli Coffee House (business website)
- **Achievements:** AMD Perspective AI Hackathon — National level, awarded AMD UM790 Pro Mini PC
- **Certifications:** Web Development (Novi Tech) · Deep Learning (NPTEL, IIT Ropar)
- **Hackathons:** AMD Perspective AI Hackathon (achievement) · Intel Gen-AI Hackathon · Smart India Hackathon (participant)

No job experience, metrics, awards or technologies beyond the resume were invented.

---

## Features

- Dark-first premium design (AWS orange / cyan / blue / purple accents)
- Sticky nav with active-section highlighting (IntersectionObserver) + mobile menu
- Hero with terminal typing animation and an animated Deployment Pipeline visual
- Scroll-reveal animations (fade / slide / stagger)
- Custom cursor, magnetic buttons, card tilt (desktop only)
- CSS-built project previews (no fake screenshots)
- Contact form → graceful `mailto:` (no backend needed)
- Fully responsive (320px → 1920px), keyboard-navigable, ARIA-aware
- `prefers-reduced-motion` support; zero external dependencies (fonts via Google Fonts CDN)

---

## Customization

- **Colors / fonts / radii:** edit the CSS custom properties at the top of `css/style.css`.
- **Terminal lines:** edit the `termScript` array in `js/script.js`.
- **Particles:** adjust count in `spawnParticles()` in `js/script.js`.
