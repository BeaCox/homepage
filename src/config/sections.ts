import { getCollection, render } from 'astro:content';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { Lang } from '../i18n/locales';

export type SectionKind = 'about' | 'prose' | 'timeline' | 'cves' | 'projects';

export interface ProjectItem {
  repo: string;
  logo?: string;
  description: string;
  language?: string;
  topics: string[];
}

export interface PageSection {
  id: string;
  title: string;
  order: number;
  index: string;
  kind: SectionKind;
  Content: AstroComponentFactory;
  projects?: ProjectItem[];
}

export async function getPageSections(lang: Lang): Promise<PageSection[]> {
  const entries = lang === 'zh'
    ? await getCollection('zh', ({ data }) => !data.draft)
    : await getCollection('en', ({ data }) => !data.draft);

  const sections = await Promise.all(entries.map(async (entry) => {
    const { Content } = await render(entry);

    return {
      id: entry.id.replace(/\.md$/, ''),
      title: entry.data.title,
      order: entry.data.order,
      kind: entry.data.kind,
      Content,
      projects: entry.data.projects,
    };
  }));

  return sections
    .sort((a, b) => a.order - b.order || a.id.localeCompare(b.id))
    .map((section, position) => ({
      ...section,
      index: String(position + 1).padStart(2, '0'),
    }));
}
