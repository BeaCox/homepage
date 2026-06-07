import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const sectionSchema = z.object({
  title: z.string(),
  order: z.number(),
  kind: z.enum(['about', 'prose', 'timeline', 'cves']).default('prose'),
  draft: z.boolean().default(false),
});

export const collections = {
  zh: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/zh' }),
    schema: sectionSchema,
  }),
  en: defineCollection({
    loader: glob({ pattern: '**/*.md', base: './src/content/en' }),
    schema: sectionSchema,
  }),
};
