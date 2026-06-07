# Homepage

Astro-based bilingual personal homepage with a fixed profile sidebar, generated
section navigation, dark/light themes, and responsive layouts.

**Live:** [beacox.space](https://beacox.space)

## Content

Page chapters live in Markdown:

- `src/content/zh/*.md` — Chinese chapters
- `src/content/en/*.md` — English chapters
- `src/i18n/locales.ts` — shared profile and interface text

The desktop directory, mobile navigation, numbering, and page sections are all
generated from these files.

## Add A Chapter

Create a Markdown file with the same filename in both language directories. For
example:

```text
src/content/zh/projects.md
src/content/en/projects.md
```

Each file starts with frontmatter:

```md
---
title: Projects
order: 60
kind: prose
draft: false
---

Write normal **Markdown** here.
```

The filename becomes the section anchor, for example `projects.md` becomes
`#projects`.

Frontmatter fields:

- `title` — text displayed in the section heading and navigation
- `order` — numeric chapter order; it does not need to be consecutive
- `kind` — section layout; defaults to `prose`
- `draft` — optional; set to `true` to hide the chapter

Use the same filename and `order` for corresponding Chinese and English
chapters so language switching keeps the page structure consistent.

## Section Layouts

### Prose

Use `kind: prose` for ordinary Markdown content. Headings, paragraphs, links,
lists, emphasis, and blockquotes are supported.

### Timeline

Use `kind: timeline`. Each level-three heading is rendered as a date, and the
following paragraph is rendered as its description:

```md
### 2025–2027

Shanghai Jiao Tong University<br>
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

### About

Each language must contain exactly one `kind: about` chapter. Normal paragraphs
form the introduction, while blockquotes are displayed as research focus cards:

```md
> ## Software Security
>
> Program analysis and vulnerability research.
```

## Development

```bash
npm install
npm run dev
```

Build the static site with:

```bash
npm run build
```

The generated output is written to `dist/`.

## Deployment

The repository is configured for Vercel in `vercel.json`:

- Framework: Astro
- Build command: `npm run build`
- Output directory: `dist`

Import the repository into Vercel and deploy it without additional project
settings. Local Vercel state under `.vercel/` is ignored by Git.

## Project Structure

```text
src/components/        Page and content renderers
src/config/sections.ts Markdown discovery and section types
src/content/           Bilingual Markdown chapters
src/i18n/locales.ts    Shared interface and profile data
src/assets/            Images processed by Astro
src/pages/             Chinese and English routes
src/styles/global.css  Theme and responsive styles
public/                Static assets
vercel.json            Vercel build and output settings
```

## License

[MIT](LICENSE)
