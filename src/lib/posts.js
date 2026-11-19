const modules = import.meta.glob('../posts/*.md', { eager: true });

export const allPosts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    return { slug, url: `/blog/${slug}/`, ...mod.frontmatter, Content: mod.Content };
  })
  .sort((a, b) => (a.date < b.date ? 1 : -1));

export const posts = allPosts.filter((p) => !p.draft);

export function byYear(list) {
  const groups = new Map();
  for (const p of list) {
    const y = p.date.slice(0, 4);
    if (!groups.has(y)) groups.set(y, []);
    groups.get(y).push(p);
  }
  return [...groups.entries()];
}
