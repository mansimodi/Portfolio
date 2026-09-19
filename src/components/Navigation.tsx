import { useEffect } from 'react';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import MagneticLink from './MagneticLink';
import ThemeToggle from './ThemeToggle';

const NAV_ITEMS = [
  { key: 'h', label: 'Home', to: '/' },
  { key: 'w', label: 'Work', to: '/work' },
  { key: 'l', label: 'Life', to: '/life' },
  { key: 'c', label: 'Contact', to: '/contact' },
] as const;

/** Bracketed single-key shortcuts, à la a field log's index tabs — press the
 * letter to jump straight to that page, same as clicking its pill. */
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

export default function Navigation() {
  useNavShortcuts();

  return (
    <nav className="fixed top-0 left-0 z-[60] flex w-full items-start justify-between p-4 sm:p-6 md:p-8 pointer-events-none">
      <div className="pointer-events-auto">
        <Link to="/" className="depth-label whitespace-nowrap text-muted hover:text-foreground transition-colors">
          M. Modi <span className="hidden sm:inline">// 2026</span>
        </Link>
      </div>
      <div className="flex items-center gap-3 sm:gap-6 md:gap-10 pointer-events-auto">
        {NAV_ITEMS.map((item) => (
          <NavLink
            key={item.label}
            to={item.to}
            end={item.to === '/'}
            className={({ isActive }) =>
              `group relative overflow-hidden whitespace-nowrap font-sans text-xs uppercase tracking-widest transition-colors ${
                isActive ? 'text-foreground' : 'text-muted hover:text-foreground'
              }`
            }
          >
            {({ isActive }) => (
              <>
                <span className="font-mono text-accent/70 sm:mr-1">[{item.key}]</span>
                <span className="hidden sm:inline">{item.label}</span>
                <span
                  className={`absolute bottom-0 left-0 h-px bg-accent transition-all group-hover:w-full ${
                    isActive ? 'w-full' : 'w-0'
                  }`}
                />
              </>
            )}
          </NavLink>
        ))}
        <MagneticLink
          href="https://linkedin.com/in/mansimodi"
          target="_blank"
          rel="noopener noreferrer"
          strength={0.4}
          className="group relative hidden overflow-hidden font-sans text-xs uppercase tracking-widest text-muted hover:text-foreground transition-colors sm:inline-block"
        >
          LinkedIn
          <span className="absolute bottom-0 left-0 h-px w-0 bg-accent transition-all group-hover:w-full" />
        </MagneticLink>
        <ThemeToggle />
      </div>
    </nav>
  );
}
