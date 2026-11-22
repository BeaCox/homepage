import { defineConfig } from 'astro/config';
import vercel from '@astrojs/vercel';
import sitemap from '@astrojs/sitemap';
import { rehypeSectionLayouts } from './src/config/rehype-section-layouts.mjs';

const siteOrigin = 'https://beacox.space';

const isExternalUrl = (href) => {
  if (!href || !/^https?:\/\//i.test(href)) return false;

  try {
    return new URL(href).origin !== siteOrigin;
  } catch {
    return false;
  }
};

const rehypeExternalLinks = () => (tree) => {
  const visit = (node) => {
    if (node?.type === 'element' && node.tagName === 'a' && isExternalUrl(node.properties?.href)) {
      node.properties.target = '_blank';
      node.properties.rel = 'noopener noreferrer';
    }

    node?.children?.forEach(visit);
  };

  visit(tree);
};

export default defineConfig({
  site: siteOrigin,
  adapter: process.env.VERCEL === '1' ? vercel() : undefined,
  markdown: {
    rehypePlugins: [rehypeSectionLayouts, rehypeExternalLinks],
  },
  integrations: [
    {
      name: 'project-metadata-route',
      hooks: {
        'astro:route:setup': ({ route }) => {
          if (route.component === 'src/pages/api/projects.json.ts') {
            route.prerender = process.env.VERCEL !== '1';
          }
        },
      },
    },
    sitemap({
      i18n: {
        defaultLocale: 'zh',
        locales: {
          zh: 'zh-CN',
          en: 'en',
        },
      },
    }),
  ],
  i18n: {
    defaultLocale: 'zh',
    locales: ['zh', 'en'],
    routing: {
      prefixDefaultLocale: false,
    },
  },
});
