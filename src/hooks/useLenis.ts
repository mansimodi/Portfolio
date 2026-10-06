import { useEffect } from 'react';
import Lenis from 'lenis';
import { ScrollTrigger } from '../lib/gsap';

/** Module-level handle so other parts of the app (route-change scroll reset)
 * can talk to the single Lenis instance without prop-drilling or context. */
let activeLenis: Lenis | null = null;

export function getLenis(): Lenis | null {
  return activeLenis;
}

/** Offset that keeps a scrolled-to section clear of the fixed nav. Lenis
 * already honors a target's CSS scroll-margin-top (our sections use
 * scroll-mt-24), so only add the nav clearance when the target has none —
 * otherwise the two stack and the section lands ~96px too low. */
export function navOffsetFor(target: HTMLElement): number {
  const margin = parseFloat(getComputedStyle(target).scrollMarginTop) || 0;
  return margin > 0 ? 0 : -96;
}

/** Smooth-scrolls to an in-page section (clearing the fixed nav) and records
 * it in the URL hash so the position is shareable, e.g. /speaking/x#tools. */
export function scrollToSection(id: string) {
  const target = document.getElementById(id);
  if (!target) return;

  if (activeLenis) {
    activeLenis.scrollTo(target, { offset: navOffsetFor(target) });
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
  window.history.replaceState(null, '', `#${id}`);
}

/**
 * Drives the whole page with Lenis's inertia-smoothed scroll and keeps GSAP's
 * ScrollTrigger in sync every frame. Native `scroll` events still fire (Lenis
 * updates real scrollTop under the hood), so libraries that already listen to
 * window scroll — like Framer Motion's useScroll and the nav's scroll backdrop —
 * keep working untouched.
 */
export function useLenis() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
      smoothWheel: true,
    });
    activeLenis = lenis;

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
      if (activeLenis === lenis) activeLenis = null;
    };
  }, []);
}
