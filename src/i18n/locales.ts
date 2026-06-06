export const ui = {
  zh: {
    'site.title': 'BeaCox',
    'site.description': 'BeaCox 的个人主页',
    'nav.about': '关于',
    'nav.education': '教育经历',
    'nav.experience': '工作经历',
    'nav.awards': '荣誉奖项',
    'nav.cves': '漏洞披露',
    'theme.light': '浅色',
    'theme.dark': '深色',
    'lang.switch': 'EN',
    'lang.switchTitle': 'Switch to English',
    'footer.copyright': '版权所有',
    'hero.role': '网络空间安全硕士研究生',
    'hero.affiliation': '上海交通大学',
    'section.about.subtitle': '简要介绍',
    'section.education.subtitle': '学术背景',
    'section.education.desc': '本硕均就读于上海交通大学。',
    'section.experience.subtitle': '职业经历',
    'section.experience.desc': '实习与工作经历。',
    'section.awards.subtitle': '荣誉',
    'section.awards.desc': '竞赛成绩与认证。',
    'section.cves.subtitle': '安全研究',
    'section.cves.desc': '独立发现并获得 CVE 编号的安全漏洞。',
    'about.content': [
      '<strong>上海交通大学</strong>网络空间安全硕士在读，研究方向为<strong>软件安全</strong>和 <strong>AI for Security</strong>。网名 <strong>BeaCox</strong>，可以拆成 "Be a cox"，意思是自己掌舵而不随波逐流。',
      '偶尔跟着 <a href="https://ctftime.org/team/55197/" target="_blank" rel="noopener">Ph0t1n1a</a> 战队打 <strong>CTF</strong>，纯菜 pwn 手。',
    ],
    'about.focuses': [
      { title: 'Software Security', desc: '程序分析、漏洞挖掘与软件安全。' },
      { title: 'AI for Security', desc: '面向安全分析的智能辅助方法。' },
    ],
    'education.items': [
      { date: '2025–2027', desc: '上海交通大学<br><span>网络空间安全 · <strong>工学硕士</strong></span>' },
      { date: '2021–2025', desc: '上海交通大学<br><span>信息安全 · <strong>工学学士</strong></span>' },
    ],
    'experience.items': [
      { date: '2025.06–2025.09', desc: '安全研究实习生<br><span><a href="https://www.cetc.com.cn/" target="_blank" rel="noopener">中国电科</a></span>' },
    ],
    'awards.items': [
      { date: '2024-04', desc: '<a href="https://play.0ops.sjtu.cn" target="_blank" rel="noopener">SJTU CTF 2024</a> 第六名' },
      { date: '2024-03', desc: '<a href="https://pwn.college/hacker/33306" target="_blank" rel="noopener">pwn.college</a> 蓝带' },
    ],
  },
  en: {
    'site.title': 'BeaCox',
    'site.description': "BeaCox's Homepage",
    'nav.about': 'About',
    'nav.education': 'Education',
    'nav.experience': 'Experience',
    'nav.awards': 'Awards',
    'nav.cves': 'CVEs',
    'theme.light': 'Light',
    'theme.dark': 'Dark',
    'lang.switch': '中文',
    'lang.switchTitle': '切换到中文',
    'footer.copyright': 'Copyright',
    'hero.role': "Master's Candidate in Cyberspace Security",
    'hero.affiliation': 'Shanghai Jiao Tong University',
    'section.about.subtitle': 'Brief Introduction',
    'section.education.subtitle': 'Academic Background',
    'section.education.desc': 'Degrees and formal study history.',
    'section.experience.subtitle': 'Professional',
    'section.experience.desc': 'Internships and work experience.',
    'section.awards.subtitle': 'Honors',
    'section.awards.desc': 'Competitions and certifications.',
    'section.cves.subtitle': 'Security Research',
    'section.cves.desc': 'Independently discovered vulnerabilities assigned CVE IDs.',
    'about.content': [
      'I\'m a master\'s student at <strong>Shanghai Jiao Tong University</strong>, working on <strong>software security</strong> and <strong>AI for security</strong>. I go by <strong>BeaCox</strong> — short for "Be a cox" — a reminder to steer my own course.',
      'I dabble in <strong>CTF</strong> as a pwn player with <a href="https://ctftime.org/team/55197/" target="_blank" rel="noopener">Ph0t1n1a</a>.',
    ],
    'about.focuses': [
      { title: 'Software Security', desc: 'Program analysis and vulnerability research.' },
      { title: 'AI for Security', desc: 'Learning-assisted approaches to security analysis.' },
    ],
    'education.items': [
      { date: '2025–2027', desc: 'Shanghai Jiao Tong University<br><span><strong>M.Eng.</strong> in Cyberspace Security</span>' },
      { date: '2021–2025', desc: 'Shanghai Jiao Tong University<br><span><strong>B.Eng.</strong> in Information Security</span>' },
    ],
    'experience.items': [
      { date: '2025.06–2025.09', desc: 'Security Researcher Intern<br><span><a href="https://www.cetc.com.cn/" target="_blank" rel="noopener">CETC</a></span>' },
    ],
    'awards.items': [
      { date: '2024-04', desc: '<a href="https://play.0ops.sjtu.cn" target="_blank" rel="noopener">SJTU CTF 2024</a> 6th place' },
      { date: '2024-03', desc: 'Blue Belt from <a href="https://pwn.college/hacker/33306" target="_blank" rel="noopener">pwn.college</a>' },
    ],
  },
} as const;

export const cves = [
  {
    vendor: 'D-Link',
    ids: [
      { id: 'CVE-2024-7357', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7357' },
      { id: 'CVE-2025-4841', url: 'https://www.cve.org/CVERecord?id=CVE-2025-4841' },
      { id: 'CVE-2025-4842', url: 'https://www.cve.org/CVERecord?id=CVE-2025-4842' },
      { id: 'CVE-2025-4843', url: 'https://www.cve.org/CVERecord?id=CVE-2025-4843' },
    ],
  },
  {
    vendor: 'Tenda',
    ids: [
      { id: 'CVE-2024-7581', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7581' },
      { id: 'CVE-2024-7582', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7582' },
      { id: 'CVE-2024-7583', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7583' },
      { id: 'CVE-2024-7584', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7584' },
      { id: 'CVE-2024-7585', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7585' },
      { id: 'CVE-2024-7613', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7613' },
      { id: 'CVE-2024-7614', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7614' },
      { id: 'CVE-2024-7615', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7615' },
    ],
  },
  {
    vendor: 'TOTOLINK',
    ids: [
      { id: 'CVE-2024-7907', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7907' },
      { id: 'CVE-2024-7908', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7908' },
      { id: 'CVE-2024-7909', url: 'https://www.cve.org/CVERecord?id=CVE-2024-7909' },
    ],
  },
];

export const profile = {
  handle: 'BeaCox',
  motto: 'Stay humble, remain critical.',
  startYear: 2022,
  url: 'https://beacox.space',
  links: [
    { label: 'Blog', url: 'https://blog.beacox.space', icon: 'blog' },
    { label: 'GitHub', url: 'https://github.com/BeaCox', icon: 'github' },
    { label: 'Email', url: 'mailto:root@beacox.space', icon: 'email' },
    { label: 'RSS', url: 'https://blog.beacox.space/posts/index.xml', icon: 'rss' },
    { label: 'Discord', url: 'http://discordapp.com/users/1007900791954219028', icon: 'discord' },
  ],
};

export type Lang = keyof typeof ui;
export const defaultLang: Lang = 'zh';
