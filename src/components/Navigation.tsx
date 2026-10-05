import { useEffect, useState } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { key: 'h', label: 'Home', to: '/' },
  { key: 'w', label: 'Work', to: '/work' },
  { key: 'l', label: 'Life', to: '/life' },
  { key: 'c', label: 'Contact', to: '/contact' },
] as const;

/** Keyboard shortcuts for the nav — press the letter to jump straight to
 * that page. Kept invisible (no on-screen bracket notation) so the nav reads
 * as plain labeled tabs rather than an index-tab affordance. */
function useNavShortcuts() {
  const navigate = useNavigate();

  useEffect(() => {
    const handler = (event: KeyboardEvent) => {
      if (event.metaKey || event.ctrlKey || event.altKey) return;
      const target = event.target as HTMLElement | null;
      const tag = target?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || target?.isContentEditable) return;

      const match = NAV_ITEMS.find((item) => item.key === event.key.toLowerCase());
      if (match) navigate(match.to);
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [navigate]);
}

/** True once the page has scrolled past the very top, so the fixed nav can
 * pick up a backdrop and stay legible over whatever content slides under it
 * (while staying fully transparent over the Home hero at rest). */
function useScrolled(threshold = 12) {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > threshold);
    update();
    window.addEventListener('scroll', update, { passive: true });
    return () => window.removeEventListener('scroll', update);
  }, [threshold]);

  return scrolled;
}

export default function Navigation() {
  useNavShortcuts();
  const scrolled = useScrolled();

  return (
    <nav
      className={`fixed top-0 left-0 z-[60] flex w-full items-center justify-between border-b px-4 transition-[background-color,border-color,padding,backdrop-filter] duration-300 sm:px-6 md:px-8 ${
        scrolled
          ? 'border-contour/40 bg-background/85 py-3 backdrop-blur-md sm:py-4 md:py-5'
          : 'pointer-events-none border-transparent bg-transparent py-4 sm:py-6 md:py-8'
      }`}
    >
      <div className="pointer-events-auto">
        <Link to="/" className="depth-label whitespace-nowrap text-muted hover:text-foreground transition-colors">
          M. Modi <span className="hidden sm:inline">// 2026</span>
        </Link>
      </div>
      <div className="flex items-center gap-4 sm:gap-6 md:gap-10 pointer-events-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `group relative overflow-hidden whitespace-nowrap font-sans text-xs uppercase tracking-wide sm:tracking-widest transition-colors ${
                isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                {item.label}
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent transition-all group-hover:w-full ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
        <ThemeToggle />
      </div>
    </nav>
  );
}
