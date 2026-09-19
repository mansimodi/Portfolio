import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isLight = theme === 'light';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      title={isLight ? 'Switch to dark mode' : 'Switch to light mode'}
      className="group relative flex h-8 w-8 items-center justify-center rounded-full border border-contour/40 text-muted transition-colors hover:border-accent hover:text-accent"
    >
      <Sun
        className={`absolute h-3.5 w-3.5 transition-all duration-300 ${
          isLight ? 'scale-100 opacity-100 rotate-0' : 'scale-50 opacity-0 -rotate-90'
        }`}
      />
      <Moon
        className={`absolute h-3.5 w-3.5 transition-all duration-300 ${
          isLight ? 'scale-50 opacity-0 rotate-90' : 'scale-100 opacity-100 rotate-0'
        }`}
      />
    </button>
  );
}
