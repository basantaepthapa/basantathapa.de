// Route pairs: every page knows its counterpart in the other language.
export const routes = {
  home:  { de: '/',               en: '/en/' },
  about: { de: '/ueber-mich/',    en: '/en/about/' },
  blog:  { de: '/blog/',          en: '/en/blog/' },
  pubs:  { de: '/publikationen/', en: '/en/publications/' },
  talks: { de: '/vortraege/',     en: '/en/talks/' },
  press: { de: '/presseschau/',   en: '/en/press/' },
  engagement: { de: '/engagement/', en: '/en/involvement/' },
  training: { de: '/weiterbildung/', en: '/en/training/' },
  studies: { de: '/studium/', en: '/en/studies/' },
  contact: { de: '/kontakt/',     en: '/en/contact/' },
  imprint: { de: '/impressum/',   en: '/en/legal-notice/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
};

export const t = {
  de: {
    nav: { home: 'Startseite', about: 'Über mich', blog: 'Blog', pubs: 'Publikationen', talks: 'Vorträge', press: 'Presse', engagement: 'Engagement', contact: 'Kontakt', profile: 'Profil und Stationen', training: 'Weiterbildung', studies: 'Kurse und Studienarbeiten', menu: 'Menü' },
    imprint: 'Impressum', privacy: 'Datenschutz', skip: 'Zum Inhalt springen',
    role: 'Geschäftsführer NEGZ · Berlin',
    latest: 'Neu im Blog', allPosts: 'Alle Beiträge', current: 'Aktuell',
    english: 'EN', switchTo: 'English', mailMe: 'E-Mail schreiben',
    archive: 'Archiv', back: 'Zurück zum Blog',
  },
  en: {
    nav: { home: 'Home', about: 'About', blog: 'Blog', pubs: 'Publications', talks: 'Talks', press: 'Press', engagement: 'Involvement', contact: 'Contact', profile: 'Profile and CV', training: 'Training', studies: 'Courses and papers', menu: 'Menu' },
    imprint: 'Legal notice', privacy: 'Privacy', skip: 'Skip to content',
    role: 'Managing Director, NEGZ · Berlin',
    latest: 'Latest posts', allPosts: 'All posts', current: 'Currently',
    english: '', switchTo: 'Deutsch', mailMe: 'Send an email',
    archive: 'Archive', back: 'Back to the blog',
  },
};

export const EMAIL = 'basanta@thapa.de';
export const SOCIAL = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/basantathapa/' },
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Basanta-Thapa-3' },
  // { label: 'Google Scholar', href: '' },  // Link fehlt noch
];
// nur für Suchmaschinen (JSON-LD sameAs), nicht sichtbar
export const SAME_AS = [...SOCIAL.map((l) => l.href), 'https://orcid.org/0000-0001-8392-5153'];

export function formatDate(iso, lang) {
  return new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
