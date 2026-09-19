import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getLenis } from '../hooks/useLenis';

/** Real routed pages need what anchor-scrolling gave us for free: landing at
 * the top of the new page. Lenis virtualizes the scroll position, so a plain
 * window.scrollTo isn't enough — reset through the Lenis instance too. */
export default function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    const lenis = getLenis();
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return null;
}
