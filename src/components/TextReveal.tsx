import { useRef, type ReactNode } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

interface TextRevealProps {
  children: ReactNode;
  className?: string;
  /** Seconds to hold before the reveal starts (for staggering multiple reveals). */
  delay?: number;
}

/**
 * Wipes its contents into view with a clip-path mask as they scroll into the
 * viewport — a deliberate, single motion that clarifies "this section just
 * arrived" rather than a generic fade. Purely presentational: the wrapped
 * heading keeps its own semantics and classes.
 */
export default function TextReveal({ children, className = '', delay = 0 }: TextRevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;

      gsap.fromTo(
        el,
        { clipPath: 'inset(0 0 100% 0)', y: 28 },
        {
          clipPath: 'inset(0 0 0% 0)',
          y: 0,
          duration: 1.1,
          delay,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
        }
      );
    },
    { scope: ref }
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
