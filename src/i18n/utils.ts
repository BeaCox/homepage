import { ui, defaultLang, type Lang } from './locales';

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang in ui) return lang as Lang;
  return defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: keyof (typeof ui)[typeof defaultLang]) {
    return ui[lang][key] ?? ui[defaultLang][key];
  };
}

export function getLocalePath(lang: Lang): string {
  return lang === defaultLang ? '/' : `/${lang}/`;
}

export function getSwitchLang(lang: Lang): Lang {
  return lang === 'zh' ? 'en' : 'zh';
}
