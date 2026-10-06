import { Link, useLocation } from 'react-router-dom';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import { SITE_PAGES, pageIndexFor, type SitePage } from '../data/pages';

function NavCard({ page, direction }: { page: SitePage; direction: 'previous' | 'next' }) {
  const isNext = direction === 'next';

  return (
    <Link
      to={page.to}
      className={`group flex h-full flex-col gap-3 rounded-2xl border p-7 transition-colors md:p-8 ${
        isNext
          ? 'border-accent/40 bg-accent/5 hover:border-accent hover:bg-accent/10 md:items-end md:text-right'
          : 'border-contour/40 bg-surface/50 hover:border-contour hover:bg-surface'
      }`}
    >
      <span className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-accent">
        {!isNext && <ArrowLeft className="h-3.5 w-3.5 transition-transform group-hover:-translate-x-0.5" />}
        {isNext ? 'Next' : 'Previous'} · {page.label}
        {isNext && <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />}
      </span>
      <span className="font-serif text-2xl font-light text-foreground transition-colors group-hover:text-accent md:text-3xl">
        {page.invite}
      </span>
      <span className="font-sans text-sm font-light leading-relaxed text-muted">{page.blurb}</span>
    </Link>
  );
}

/** "Where to next" at the bottom of every page: the page before and after
 * this one in the site's reading order. Home has no previous page, and
 * Contact's next page loops back to Home. */
export default function PageNav() {
  const { pathname } = useLocation();
  const index = pageIndexFor(pathname);
  const previous = index > 0 ? SITE_PAGES[index - 1] : null;
  const next = SITE_PAGES[(index + 1) % SITE_PAGES.length];

  return (
    <nav aria-label="Previous and next page" className="relative z-20 border-t border-contour/30 bg-background px-4 py-16 md:px-24">
      <div className="mx-auto grid max-w-6xl gap-4 md:grid-cols-2">
        {previous ? <NavCard page={previous} direction="previous" /> : <div className="hidden md:block" />}
        <NavCard page={next} direction="next" />
      </div>
    </nav>
  );
}
