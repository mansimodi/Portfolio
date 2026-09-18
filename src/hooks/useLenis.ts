import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '../lib/gsap';

/**
 * Drives the whole page with Lenis's inertia-smoothed scroll and keeps GSAP's
 * ScrollTrigger in sync every frame. Native `scroll` events still fire (Lenis
 * updates real scrollTop under the hood), so libraries that already listen to
 * window scroll — like Framer Motion's useScroll in ScrollyCanvas/Overlay —
 * keep working untouched.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });

    let rafId: number;
    const raf = (time: number) => {
      lenis.raf(time);
      ScrollTrigger.update();
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);
}
