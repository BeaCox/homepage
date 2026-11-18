export const formatStars = (n?: number) => typeof n === 'number'
  ? (n >= 1000 ? `${(n / 1000).toFixed(1)}k` : String(n))
  : '–';

export const langColors: Record<string, string> = {
  Swift: '#F05138',
  TypeScript: '#3178C6',
  JavaScript: '#F7DF1E',
  Python: '#3572A5',
  Go: '#00ADD8',
  Rust: '#DEA584',
  C: '#555555',
  'C++': '#F34B7D',
  Java: '#B07219',
  Shell: '#89E051',
  Kotlin: '#A97BFF',
};
