import { getCollection, render } from 'astro:content';
import type { AstroComponentFactory } from 'astro/runtime/server/index.js';
import type { Lang } from '../i18n/locales';

export type SectionKind = 'about' | 'prose' | 'timeline' | 'cves' | 'projects';

export interface ProjectItem {
  repo: string;
  logo?: string;
  description: string;
  language?: string;
  stars?: number;
  topics: string[];
}

export interface SectionSubsection {
  id: string;
  title: string;
}

export interface PageSection {
  id: string;
  title: string;
  shortTitle?: string;
  order: number;
  index: string;
  kind: SectionKind;
  Content: AstroComponentFactory;
  disclosureCount?: number;
  subsections?: SectionSubsection[];
  projects?: ProjectItem[];
}

export async function getPageSections(lang: Lang): Promise<PageSection[]> {
  const entries = lang === 'zh'
    ? await getCollection('zh', ({ data }) => !data.draft)
    : await getCollection('en', ({ data }) => !data.draft);

  const sections = await Promise.all(entries.map(async (entry) => {
    const { Content, remarkPluginFrontmatter } = await render(entry);
    const { disclosureCount } = remarkPluginFrontmatter;

    return {
      id: entry.id.replace(/\.md$/, ''),
      title: entry.data.title,
      shortTitle: entry.data.shortTitle,
      order: entry.data.order,
      kind: entry.data.kind,
      Content,
      disclosureCount: typeof disclosureCount === 'number' ? disclosureCount : undefined,
      subsections: entry.data.subsections,
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
