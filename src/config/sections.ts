import { cves, ui, type Lang } from '../i18n/locales';

export interface TimelineItem {
  date: string;
  desc: string;
}

export interface CVEGroup {
  vendor: string;
  ids: ReadonlyArray<{
    id: string;
    url: string;
  }>;
}

interface SectionBase {
  id: string;
  title: string;
  index: string;
}

export interface AboutSection extends SectionBase {
  kind: 'about';
  paragraphs: ReadonlyArray<string>;
  focuses: ReadonlyArray<{
    title: string;
    desc: string;
  }>;
}

export interface TimelineSection extends SectionBase {
  kind: 'timeline';
  items: ReadonlyArray<TimelineItem>;
}

export interface ProseSection extends SectionBase {
  kind: 'prose';
  paragraphs: ReadonlyArray<string>;
}

export interface CVESection extends SectionBase {
  kind: 'cves';
  groups: ReadonlyArray<CVEGroup>;
}

export type PageSection = AboutSection | TimelineSection | ProseSection | CVESection;
export type ContentSection = Exclude<PageSection, AboutSection>;
type TranslationKey = keyof (typeof ui)['zh'];

type SectionDefinition =
  | {
      id: string;
      kind: 'about';
      titleKey: TranslationKey;
      contentKey: TranslationKey;
      focusesKey: TranslationKey;
    }
  | {
      id: string;
      kind: 'timeline' | 'prose';
      titleKey: TranslationKey;
      contentKey: TranslationKey;
    }
  | {
      id: string;
      kind: 'cves';
      titleKey: TranslationKey;
    };

// Add, remove, or reorder chapters here. The page and both navigation menus
// are generated from this list; localized content remains in i18n/locales.ts.
const sectionDefinitions: ReadonlyArray<SectionDefinition> = [
  {
    id: 'about',
    kind: 'about',
    titleKey: 'nav.about',
    contentKey: 'about.content',
    focusesKey: 'about.focuses',
  },
  {
    id: 'education',
    kind: 'timeline',
    titleKey: 'nav.education',
    contentKey: 'education.items',
  },
  {
    id: 'experience',
    kind: 'timeline',
    titleKey: 'nav.experience',
    contentKey: 'experience.items',
  },
  {
    id: 'awards',
    kind: 'timeline',
    titleKey: 'nav.awards',
    contentKey: 'awards.items',
  },
  {
    id: 'cves',
    kind: 'cves',
    titleKey: 'nav.cves',
  },
];

export function getPageSections(lang: Lang): PageSection[] {
  const locale = ui[lang];

  return sectionDefinitions.map((definition, position) => {
    const base: SectionBase = {
      id: definition.id,
      title: locale[definition.titleKey] as string,
      index: String(position + 1).padStart(2, '0'),
    };

    if (definition.kind === 'about') {
      return {
        ...base,
        kind: definition.kind,
        paragraphs: locale[definition.contentKey] as ReadonlyArray<string>,
        focuses: locale[definition.focusesKey] as ReadonlyArray<{ title: string; desc: string }>,
      };
    }

    if (definition.kind === 'timeline') {
      return {
        ...base,
        kind: definition.kind,
        items: locale[definition.contentKey] as ReadonlyArray<TimelineItem>,
      };
    }

    if (definition.kind === 'prose') {
      return {
        ...base,
        kind: definition.kind,
        paragraphs: locale[definition.contentKey] as ReadonlyArray<string>,
      };
    }

    return {
      ...base,
      kind: definition.kind,
      groups: cves,
    };
  });
}
