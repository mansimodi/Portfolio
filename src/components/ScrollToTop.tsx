import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis, navOffsetFor } from '../hooks/useLenis';

/** Real routed pages need what anchor-scrolling gave us for free: landing at
 * the top of the new page — or, when a section pill link (or a shared
 * /work#recognition-style URL) carries a hash, landing on that section
 * instead. Lenis virtualizes the scroll position, so a plain window.scrollTo
 * isn't enough — reset/target through the Lenis instance too. */
export default function ScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    const lenis = getLenis();

    if (hash) {
      const id = hash.slice(1);
      const scrollToHash = () => {
        const target = document.getElementById(id);
        if (!target) return false;
        if (lenis) {
          lenis.scrollTo(target, { offset: navOffsetFor(target), immediate: true });
        } else {
          target.scrollIntoView({ block: 'start' });
        }
        return true;
      };

      // The target section may not be mounted/measured yet on first paint
      // (route just switched), so retry once shortly after.
      if (!scrollToHash()) {
        const timeout = setTimeout(scrollToHash, 120);
        return () => clearTimeout(timeout);
      }
      return;
    }

    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
