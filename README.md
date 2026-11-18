# Homepage

Astro-powered bilingual personal homepage for [BeaCox](https://beacox.space).
Content is written in Markdown, then rendered into a profile introduction,
sticky chapter navigation, project cards, timeline sections, CVE lists,
dark/light themes, and responsive layouts.

**Live:** [beacox.space](https://beacox.space)

## Features

- Chinese and English routes: `/` and `/en/`
- Content-driven sections from `src/content/{zh,en}`
- Profile introduction with research interests and responsive chapter navigation
- Markdown layouts for about, prose, timeline, CVEs, and projects
- Shared CDN cache for GitHub stars, languages, and topics
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
- `subsections` — optional nested navigation items with stable `id` and localized `title`
- `projects` — required only for `kind: projects`

Use the same filename and similar `order` values in both language directories.
The filename becomes the section anchor: `projects.md` becomes `#projects`.

Shared profile and interface text lives in `src/i18n/locales.ts`.

## Layouts

### About

Each language must contain exactly one `kind: about` section. Its Markdown contains the introduction
and a short line of research interests displayed alongside the avatar.

### Prose

Use `kind: prose` for ordinary Markdown content. Headings, paragraphs, links,
lists, emphasis, and blockquotes are supported.

### Timeline

Use `kind: timeline`. Each level-three heading is treated as the date, and the
following paragraph is treated as the entry body:

```md
### 2025–2028

Shanghai Jiao Tong University  
**M.Eng.** in Cyberspace Security
```

### CVEs

Use `kind: cves`. Each level-three heading names a project or vendor and is
followed by a list of disclosure links.

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
time. Each card links to its GitHub repository and renders its localized
description and initial metadata from Markdown.

## Performance Notes

- The site uses system font stacks, avoiding render-blocking external font
  requests.
- When the cards approach the viewport, the browser requests
  `/api/projects.json` once for all projects. On Vercel this endpoint fetches
  the public GitHub REST API for the repositories listed in published project
  sections. Both languages share the response. Vercel caches a successful
  response for 12 hours and can serve it for a further day while a visit
  triggers revalidation. An upstream error can use a previously cached response
  for up to seven additional days.
- If some repositories fail, the endpoint returns the successful entries with
  a one-minute cache. A complete outage returns a 503. Cards without a result
  keep their Markdown metadata.
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
- The Vercel build (`VERCEL=1`) generates pre-rendered pages and a metadata
  function in `.vercel/output/`. Local static builds write `dist/` with a
  build-time metadata snapshot for `npm run preview`.

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
