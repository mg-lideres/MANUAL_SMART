export function slugify(text: string): string {
  return text
    .toString()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

/**
 * Some modules repeat a heading verbatim (e.g. two "### Ejemplo" sections),
 * which would otherwise produce duplicate anchor ids / React keys. Call with
 * a fresh Map per document render so repeated headings get -2, -3, ... in
 * the same order the ModuleTOC extraction sees them.
 */
export function dedupeSlug(base: string, seen: Map<string, number>): string {
  const count = (seen.get(base) ?? 0) + 1;
  seen.set(base, count);
  return count === 1 ? base : `${base}-${count}`;
}
