const modules = import.meta.glob('../posts/*.md', { eager: true });
const trModules = import.meta.glob('../posts-tr/*.md', { eager: true });

const tr = Object.fromEntries(
  Object.entries(trModules).map(([path, mod]) => [path.split('/').pop().replace(/\.md$/, ''), mod]),
);

export const allPosts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const fm = mod.frontmatter;
    const orig = fm.lang || 'en';
    const other = orig === 'de' ? 'en' : 'de';
    const t = tr[slug];
    const v = {
      [orig]: { title: fm.title, Content: mod.Content, translated: false },
    };
    if (t) v[other] = { title: t.frontmatter.title, Content: t.Content, translated: true };
    const pick = (lang) => v[lang] || v[orig];
    return {
      slug, ...fm, orig, Content: mod.Content,
      url: `/blog/${slug}/`, urlEn: `/en/blog/${slug}/`,
      v: pick, has: (lang) => !!v[lang],
      urlFor: (lang) => (lang === 'de' ? `/blog/${slug}/` : `/en/blog/${slug}/`),
    };
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
