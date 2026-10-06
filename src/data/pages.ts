export interface SitePage {
  /** Keyboard shortcut in the nav. */
  key: string;
  label: string;
  to: string;
  /** The question or invitation used when another page points here. */
  invite: string;
  /** One line on what the visitor finds on this page. */
  blurb: string;
}

/** The site's reading order. The nav lists pages in this order, and every
 * page ends with links to the page before and after it, so a visitor can
 * walk the whole story forward or back without hunting for the menu. */
export const SITE_PAGES: SitePage[] = [
  {
    key: 'h',
    label: 'Home',
    to: '/',
    invite: 'Back to the start',
    blurb: 'Who I am and what I bring to a product team.',
  },
  {
    key: 'w',
    label: 'Work',
    to: '/work',
    invite: 'Want to see how I work?',
    blurb: 'Five AT&T projects: the customer problem, the decision, and the result.',
  },
  {
    key: 's',
    label: 'Speaking',
    to: '/speaking',
    invite: 'Curious how I explain AI?',
    blurb: 'My talk, the four-part prompt formula, and a free AI toolkit.',
  },
  {
    key: 'l',
    label: 'Life',
    to: '/life',
    invite: 'Curious about life outside work?',
    blurb: 'Underwater hockey, painting, crochet, and travel.',
  },
  {
    key: 'c',
    label: 'Contact',
    to: '/contact',
    invite: "Let's talk product.",
    blurb: 'Open to product management roles. Email, LinkedIn, or my resume.',
  },
];

/** Which page a path belongs to (a talk page belongs to Speaking). */
export function pageIndexFor(pathname: string): number {
  if (pathname === '/') return 0;
  const index = SITE_PAGES.findIndex((page) => page.to !== '/' && pathname.startsWith(page.to));
  return index === -1 ? 0 : index;
}
