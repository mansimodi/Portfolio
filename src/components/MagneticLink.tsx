import { useRef, type AnchorHTMLAttributes, type MouseEvent, type ReactNode } from 'react';
import { gsap } from '../lib/gsap';

interface MagneticLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  /** How strongly the element follows the cursor (0-1). */
  strength?: number;
  children?: ReactNode;
}

/**
 * A link that leans gently toward the cursor while hovered and springs back
 * on leave. Purposeful feedback for a click target, not decoration — the
 * kind of small, physically-grounded motion that reads as "polished" rather
 * than "animated for its own sake."
 */
export default function MagneticLink({
  strength = 0.35,
  className = '',
  children,
  ...props
}: MagneticLinkProps) {
  const ref = useRef<HTMLAnchorElement>(null);

  const handleMove = (e: MouseEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const relX = e.clientX - rect.left - rect.width / 2;
    const relY = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, {
      x: relX * strength,
      y: relY * strength,
      duration: 0.5,
      ease: 'power3.out',
    });
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <a
      ref={ref}
      className={className}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      {...props}
    >
      {children}
    </a>
  );
}
