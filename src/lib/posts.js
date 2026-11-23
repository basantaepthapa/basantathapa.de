const modules = import.meta.glob('../posts/*.md', { eager: true });
const trModules = import.meta.glob('../posts-tr/*.md', { eager: true });

const tr = Object.fromEntries(
  Object.entries(trModules).map(([path, mod]) => [path.split('/').pop().replace(/\.md$/, ''), mod]),
);

function excerpt(mod) {
  const raw = (mod.rawContent ? mod.rawContent() : '') || '';
  const txt = raw
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/!\[[^\]]*\]\([^)]*\)/g, ' ')
    .replace(/\[([^\]]*)\]\([^)]*\)/g, '$1')
    .replace(/^#+\s.*$/gm, ' ')
    .replace(/[*_>`#]/g, '')
    .replace(/\s+/g, ' ').trim();
  if (txt.length <= 190) return txt;
  return txt.slice(0, 190).replace(/\s+\S*$/, '') + ' …';
}

const CAT = {
  Academia: ['Wissenschaft', 'Research'], outreach: ['Vorträge und Veranstaltungen', 'Talks and events'],
  publication: ['Publikationen', 'Publications'], work: ['Arbeit', 'Work'], Consulting: ['Beratung', 'Consulting'],
  Media: ['Medien', 'Media'], 'IT Stuff': ['IT', 'IT'], Wordpress: ['IT', 'IT'], Drupal: ['IT', 'IT'],
  trainings: ['Weiterbildung', 'Training'], Travels: ['Reisen', 'Travel'], Teaching: ['Lehre', 'Teaching'],
  causes: ['Engagement', 'Causes'], ASA: ['Engagement', 'Causes'],
};
export function cats(p, lang) {
  const i = lang === 'de' ? 0 : 1;
  return [...new Set((p.categories || []).map((c) => (CAT[c] || [c, c])[i]))];
}

export const allPosts = Object.entries(modules)
  .map(([path, mod]) => {
    const slug = path.split('/').pop().replace(/\.md$/, '');
    const fm = mod.frontmatter;
    const orig = fm.lang || 'en';
    const other = orig === 'de' ? 'en' : 'de';
    const t = tr[slug];
    const v = {
      [orig]: { title: fm.title, Content: mod.Content, translated: false, excerpt: excerpt(mod) },
    };
    if (t) v[other] = { title: t.frontmatter.title, Content: t.Content, translated: true, excerpt: excerpt(t) };
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
