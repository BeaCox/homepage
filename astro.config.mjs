import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

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
  markdown: {
    rehypePlugins: [rehypeExternalLinks],
  },
  integrations: [
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
