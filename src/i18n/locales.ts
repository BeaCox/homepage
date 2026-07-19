export const ui = {
  zh: {
    'site.title': 'BeaCox | 软件安全与 AI for Security',
    'site.description': 'BeaCox 的个人主页，关注软件安全、程序分析、漏洞研究与 AI for Security。',
    'theme.light': '浅色',
    'theme.dark': '深色',
    'lang.switch': 'EN',
    'lang.switchTitle': 'Switch to English',
    'footer.source': '本站源码',
    'hero.role': '网络空间安全硕士研究生',
    'hero.affiliation': '上海交通大学',
    'resume.download': '下载简历',
    'resume.meta': 'PDF · 1 页',
  },
  en: {
    'site.title': 'BeaCox | Software Security & AI for Security',
    'site.description': 'The personal homepage of BeaCox, focused on software security, program analysis, vulnerability research, and AI for security.',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'lang.switch': '中文',
    'lang.switchTitle': '切换到中文',
    'footer.source': 'Source code',
    'hero.role': "Master's Candidate in Cyberspace Security",
    'hero.affiliation': 'Shanghai Jiao Tong University',
    'resume.download': 'Download résumé',
    'resume.meta': 'PDF · Chinese · 1 page',
  },
} as const;

export const profile = {
  handle: 'BeaCox',
  motto: 'Stay humble, remain critical.',
  startYear: 2022,
  url: 'https://beacox.space',
  sourceUrl: 'https://github.com/BeaCox/homepage',
  links: [
    { label: 'Blog', url: 'https://blog.beacox.space', icon: 'blog' },
    { label: 'GitHub', url: 'https://github.com/BeaCox', icon: 'github' },
    { label: 'Email', url: 'mailto:root@beacox.space', icon: 'email' },
    { label: 'RSS', url: 'https://blog.beacox.space/posts/index.xml', icon: 'rss' },
    { label: 'Discord', url: 'https://discord.com/users/1007900791954219028', icon: 'discord' },
  ],
};

export type Lang = keyof typeof ui;
export const defaultLang: Lang = 'zh';
