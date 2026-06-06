# Homepage

Astro-based bilingual personal homepage with a fixed profile sidebar, generated
section navigation, dark/light themes, and responsive layouts.

**Live:** [beacox.space](https://beacox.space)

## Content

Most text and data lives in:

- `src/i18n/locales.ts` — Chinese and English content, CVEs, and profile data
- `src/config/sections.ts` — chapter order, IDs, titles, and renderer types

The desktop directory, mobile navigation, and page sections are generated from
the same section configuration.

## Add A Chapter

1. Add the Chinese and English title/content keys to `src/i18n/locales.ts`.
2. Add one entry to `sectionDefinitions` in `src/config/sections.ts`.
3. Choose a supported `kind`:
   - `timeline` — dated entries with `date` and HTML-enabled `desc`
   - `prose` — an array of HTML-enabled paragraphs
   - `cves` — the shared CVE group list

Reordering or removing a chapter only requires changing `sectionDefinitions`.
Navigation numbering and active-section behavior update automatically.

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
src/config/sections.ts Chapter configuration and section types
src/i18n/locales.ts    Bilingual content and site data
src/assets/            Images processed by Astro
src/pages/             Chinese and English routes
src/styles/global.css  Theme and responsive styles
public/                Static assets
vercel.json            Vercel build and output settings
```

## License

[MIT](LICENSE)
