/**
 * Truncates text to at most `maxLength` characters, breaking on the last whole
 * word and appending "…". Used to derive a safe meta-description from a
 * longer body of copy (e.g. a show synopsis) when no dedicated short
 * description has been set.
 */
export function truncate(text: string, maxLength = 155): string {
  if (text.length <= maxLength) return text;

  const cut = text.slice(0, maxLength);
  const lastSpace = cut.lastIndexOf(' ');
  return `${(lastSpace > 0 ? cut.slice(0, lastSpace) : cut).trimEnd()}…`;
}
