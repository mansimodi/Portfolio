import { Outlet } from 'react-router-dom';
import { motion, useScroll, useSpring } from 'motion/react';
import { useLenis } from '../hooks/useLenis';
import Navigation from './Navigation';
import ScrollToTop from './ScrollToTop';
import DiveBuddy from './DiveBuddy';
import MagneticLink from './MagneticLink';

export default function Layout() {
  useLenis();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <main className="relative bg-background font-sans">
      <div className="grain-overlay" aria-hidden="true" />

      <ScrollToTop />
      <Navigation />

      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-0.5 origin-left bg-accent"
        style={{ scaleX }}
        aria-hidden="true"
      />

      <Outlet />

      <footer className="border-t border-contour/30 bg-background px-4 py-12 md:px-24">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-12 md:flex-row">
          <div className="text-center md:text-left">
            <MagneticLink
              href="https://linkedin.com/in/mansimodi"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.2}
              className="group inline-block"
            >
              <h2 className="mb-4 font-serif text-3xl font-light tracking-tight text-foreground md:text-4xl">
                Mansi <span className="italic text-accent">Modi</span>
              </h2>
            </MagneticLink>
            <p className="mb-2 font-mono text-[10px] uppercase tracking-[0.5em] text-muted">
              Lead Data Scientist // San Francisco Bay Area
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-muted/60">
              © 2026 All Rights Reserved
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 md:gap-8">
            <a
              href="/resume.pdf"
              download="Mansi-Modi-Resume.pdf"
              className="font-sans text-xs uppercase tracking-widest text-muted transition-colors hover:text-accent"
            >
              Resume
            </a>
            <MagneticLink
              href="https://linkedin.com/in/mansimodi"
              strength={0.4}
              className="font-sans text-xs uppercase tracking-widest text-muted transition-colors hover:text-foreground"
            >
              LinkedIn
            </MagneticLink>
            <a
              href="mailto:mansimodi90@gmail.com"
              className="font-sans text-xs uppercase tracking-widest text-accent transition-colors hover:text-foreground"
            >
              Email
            </a>
          </div>
        </div>
      </footer>

      <DiveBuddy />
    </main>
  );
}
