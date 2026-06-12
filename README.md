# Homepage

Astro-powered bilingual personal homepage for [BeaCox](https://beacox.space).
Content is written in Markdown, then rendered into a fixed profile sidebar,
generated section navigation, project cards, timeline sections, CVE lists,
dark/light themes, and responsive layouts.

**Live:** [beacox.space](https://beacox.space)

## Features

- Chinese and English routes: `/` and `/en/`
- Content-driven sections from `src/content/{zh,en}`
- Sticky profile sidebar with generated desktop and mobile navigation
- Markdown layouts for about, prose, timeline, CVEs, and projects
- Lazy GitHub metadata refresh for project stars, language, and topics
- Dark/light theme toggle with local preference persistence
- Footer source link configured from shared profile data

## Content Model

Page chapters live in paired Markdown files:

```text
src/content/zh/*.md
src/content/en/*.md
```

Each file starts with frontmatter:

```md
---
title: Projects
order: 45
kind: projects
draft: false
---
```

Frontmatter fields:

- `title` — section heading and navigation label
- `order` — numeric section order; it does not need to be consecutive
- `kind` — section layout; one of `about`, `prose`, `timeline`, `cves`, `projects`
- `draft` — optional; set to `true` to hide the section
- `projects` — required only for `kind: projects`

Use the same filename and similar `order` values in both language directories.
The filename becomes the section anchor: `projects.md` becomes `#projects`.

Shared profile and interface text lives in `src/i18n/locales.ts`.

## Layouts

### About

Each language must contain exactly one `kind: about` section. Paragraphs form
the intro, and blockquotes render as compact focus cards:

```md
> ## Software Security
>
> Program analysis and vulnerability research.
```

### Prose

Use `kind: prose` for ordinary Markdown content. Headings, paragraphs, links,
lists, emphasis, and blockquotes are supported.

### Timeline

Use `kind: timeline`. Each level-three heading is treated as the date, and the
following paragraph is treated as the entry body:

```md
### 2025–2027

Shanghai Jiao Tong University  
**M.Eng.** in Cyberspace Security
```

### CVEs

Use `kind: cves`. Each level-three heading is a vendor, followed by a Markdown
list of CVE links:

```md
### D-Link

- [CVE-2024-7357](https://www.cve.org/CVERecord?id=CVE-2024-7357)
- [CVE-2025-4841](https://www.cve.org/CVERecord?id=CVE-2025-4841)
```

### Projects

Use `kind: projects` and define cards in frontmatter:

```yaml
---
title: Projects
order: 45
kind: projects
projects:
  - repo: BeaCox/PastePilot
    logo: /projects/pastepilot.png
    description: A lightweight macOS clipboard manager built for developers.
    language: Swift
    topics:
      - clipboard
      - macos-app
      - swift
---
```

Project logos live under `src/assets/projects/` and use their filename in
frontmatter, so `pastepilot.png` maps to
`src/assets/projects/pastepilot.png`. Astro optimizes these images at build
time. Cards link to GitHub and refresh public repo metadata in the browser when
available. GitHub requests are lazy-loaded near the project cards, capped with a
short timeout, and cached in `localStorage` so slow or blocked API access does
not delay the page.

## Performance Notes

- The site uses system font stacks, avoiding render-blocking external font
  requests.
- GitHub API metadata is treated as progressive enhancement. Static frontmatter
  renders first; stars, language, and topics update only if the API responds
  quickly enough.
- Vercel cache headers keep hashed Astro assets and static project images cached
  for long-lived repeat visits.

## Development

```bash
npm install
npm run dev
```

Useful scripts:

```bash
npm run dev      # start Astro dev server
npm run build    # build static output into dist/
npm run preview  # preview the production build locally
```

## Deployment

The repository is configured for Vercel in `vercel.json`:

- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`

Import the repository into Vercel and deploy it without additional project
settings.

## Project Structure

```text
src/assets/            Images processed by Astro
src/components/        Page, section, and project renderers
src/config/sections.ts Markdown discovery and section sorting
src/content/           Bilingual Markdown content collections
src/i18n/              Shared locale and profile data
src/layouts/           Base HTML layout
src/pages/             Chinese and English routes
src/styles/global.css  Theme, layout, and responsive styles
public/                Static assets served as-is
vercel.json            Vercel build and output settings
```

## License

[MIT](LICENSE)
