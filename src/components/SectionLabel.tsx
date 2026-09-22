import type { MouseEvent } from 'react';
import { getLenis } from '../hooks/useLenis';

interface SectionLabelProps {
  /** Anchor id of the section this label marks — doubles as its jump target
   * so the pill is a real, shareable in-page link (e.g. /work#recognition). */
  id: string;
  label: string;
  variant?: 'deep' | 'surface';
}

export default function SectionLabel({ id, label, variant = 'deep' }: SectionLabelProps) {
  const isSurface = variant === 'surface';

  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    const target = document.getElementById(id);
    if (!target) return;

    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(target, { offset: -96 });
    } else {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
    window.history.replaceState(null, '', `#${id}`);
  };

  return (
    <div className="mb-12 flex items-center gap-4">
      <div
        className={`h-px w-8 ${isSurface ? 'bg-life-accent/40' : 'bg-contour'}`}
        aria-hidden="true"
      />
      <a
        href={`#${id}`}
        onClick={handleClick}
        className={`inline-flex items-center rounded-full border px-3.5 py-1.5 font-mono text-[10px] uppercase tracking-[0.25em] transition-colors ${
          isSurface
            ? 'border-life-accent/30 text-life-accent hover:border-life-accent hover:bg-life-accent/10'
            : 'border-contour text-accent hover:border-accent hover:bg-accent/10'
        }`}
      >
        {label}
      </a>
    </div>
  );
}
