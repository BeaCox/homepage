# Homepage

A minimal, markdown-driven personal homepage with a two-column layout, dark/light theme, and bilingual (English/Chinese) support.

**Live:** [beacox.space](https://beacox.space)

## Features

- **Markdown-driven** — edit `config-zh.md` / `config-en.md` to update content, no build step needed
- **Two-column layout** — sticky sidebar with avatar, links, and section nav; scrollable content area
- **Dark / Light theme** — respects system preference, with manual toggle
- **i18n** — Chinese and English, switchable at runtime
- **Timeline, list, table, and paragraph** sections parsed from markdown
- **Responsive** — collapses to single-column on mobile

## Project Structure

```
index.html       — single-page app (parser + renderer)
style.css        — all styles, light/dark themes, responsive
config-zh.md     — Chinese content (frontmatter + markdown sections)
config-en.md     — English content
assets/          — avatar, favicons
vercel.json      — Vercel deployment config (static, no build)
```

## Usage

Serve the directory with any static file server:

```bash
# python
python3 -m http.server

# node
npx serve .
```

To customize, edit the `config-*.md` files. Frontmatter fields:

| Field       | Description              |
| ----------- | ------------------------ |
| `handle`    | Display name / username  |
| `name`      | Real name (optional)     |
| `avatar`    | Path to avatar image     |
| `motto`     | Tagline below the name   |
| `startYear` | Copyright start year     |
| `url`       | Link on the footer name  |

Sections are defined by `## Heading` blocks. Supported formats: timeline (`.timeline`), list, table, and paragraphs.

## Deployment

Deployed on [Vercel](https://vercel.com) as a static site — no build step required.

## License

[MIT](LICENSE)
