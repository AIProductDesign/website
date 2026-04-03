const BLUE_TINTS = [
  '#4B9FFF',
  '#7BBAFF',
  '#2E82E8',
  '#9DCCFF',
  '#3391F0',
  '#60AEFF',
  '#1E6ED4',
  '#85BFFF',
];

export function avatarColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return BLUE_TINTS[Math.abs(hash) % BLUE_TINTS.length];
}
