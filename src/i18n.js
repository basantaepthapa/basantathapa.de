// Route pairs: every page knows its counterpart in the other language.
export const routes = {
  home:  { de: '/',               en: '/en/' },
  about: { de: '/ueber-mich/',    en: '/en/about/' },
  blog:  { de: '/blog/',          en: '/en/blog/' },
  pubs:  { de: '/publikationen/', en: '/en/publications/' },
  talks: { de: '/vortraege/',     en: '/en/talks/' },
  press: { de: '/presseschau/',   en: '/en/press/' },
  engagement: { de: '/engagement/', en: '/en/involvement/' },
  contact: { de: '/kontakt/',     en: '/en/contact/' },
  imprint: { de: '/impressum/',   en: '/en/legal-notice/' },
  privacy: { de: '/datenschutz/', en: '/en/privacy/' },
};

export const t = {
  de: {
    nav: { home: 'Startseite', about: 'Über mich', blog: 'Blog', pubs: 'Publikationen', talks: 'Vorträge', press: 'Presseschau', engagement: 'Engagement', contact: 'Kontakt' },
    imprint: 'Impressum', privacy: 'Datenschutz', skip: 'Zum Inhalt springen',
    role: 'Geschäftsführer NEGZ · Berlin',
    latest: 'Neu im Blog', allPosts: 'Alle Beiträge', current: 'Aktuell',
    english: 'EN', switchTo: 'English', mailMe: 'E-Mail schreiben',
    archive: 'Archiv', back: 'Zurück zum Blog',
  },
  en: {
    nav: { home: 'Home', about: 'About', blog: 'Blog', pubs: 'Publications', talks: 'Talks', press: 'Press', engagement: 'Involvement', contact: 'Contact' },
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
  { label: 'ResearchGate', href: 'https://www.researchgate.net/profile/Basanta_Thapa' },
];

export function formatDate(iso, lang) {
  return new Date(iso + 'T12:00:00').toLocaleDateString(lang === 'de' ? 'de-DE' : 'en-GB', { day: 'numeric', month: 'long', year: 'numeric' });
}
