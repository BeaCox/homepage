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

Create a Markdown file with the same filename in each language directory:

```md
---
title: Projects
order: 60
kind: prose
---

Write normal **Markdown** here.
```

The filename becomes the section anchor, for example `projects.md` becomes
`#projects`. Change `order` to reorder chapters, or set `draft: true` to hide
one temporarily.

Supported layouts:

- `about` — the profile introduction; use blockquotes for focus cards
- `prose` — normal Markdown, suitable for arbitrary new chapters
- `timeline` — write each date as `###`, followed by its description
- `cves` — write each vendor as `###`, followed by a Markdown link list

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
