import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const projectItemSchema = z.object({
  repo: z.string(),
  logo: z.string().optional(),
  description: z.string(),
  language: z.string().optional(),
  stars: z.number().optional(),
  topics: z.array(z.string()).default([]),
});

const subsectionSchema = z.object({
  id: z.string(),
  title: z.string(),
});

const sectionSchema = z.object({
  title: z.string(),
  order: z.number(),
  kind: z.enum(['about', 'prose', 'timeline', 'cves', 'projects']).default('prose'),
  draft: z.boolean().default(false),
  subsections: z.array(subsectionSchema).optional(),
  projects: z.array(projectItemSchema).optional(),
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
