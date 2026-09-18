import { motion, useScroll, useSpring } from 'motion/react';
import { useLenis } from './hooks/useLenis';
import ScrollyCanvas from './components/ScrollyCanvas';
import Overlay from './components/Overlay';
import Bio from './components/Bio';
import Impact from './components/Impact';
import Contact from './components/Contact';
import Awards from './components/Awards';
import Projects from './components/Projects';
import Skills from './components/Skills';
import MagneticLink from './components/MagneticLink';

function Navigation() {
  return (
    <nav className="fixed top-0 left-0 z-[60] w-full p-8 flex justify-between items-start pointer-events-none">
      <div className="pointer-events-auto">
        <p className="font-mono text-[10px] uppercase tracking-widest text-black/40">Portfolio // 2026</p>
      </div>
      <div className="flex gap-12 pointer-events-auto">
        {['Work', 'Contact'].map((item) => (
          <button key={item} className="group relative overflow-hidden font-sans text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors">
            {item}
            <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all group-hover:w-full" />
          </button>
        ))}
        <MagneticLink href="https://linkedin.com/in/mansimodi" target="_blank" rel="noopener noreferrer" strength={0.4} className="group relative overflow-hidden font-sans text-xs uppercase tracking-widest text-white/50 hover:text-white transition-colors inline-block">
          LinkedIn
          <span className="absolute bottom-0 left-0 h-[1px] w-0 bg-white transition-all group-hover:w-full" />
        </MagneticLink>
      </div>
    </nav>
  );
}

export default function App() {
  useLenis();

  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative bg-background font-sans selection:bg-black selection:text-white">
      {/* Subtle film-grain texture — adds tactile depth without gradients or glow */}
      <div className="grain-overlay" aria-hidden="true" />

      <Navigation />

      {/* Scroll Progress Indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 z-[70] h-[2px] bg-black origin-left"
        style={{ scaleX }}
      />

      <div className="relative">
        <ScrollyCanvas frameCount={120} />
      </div>

      <Bio />
      <Impact />
      <Contact />
      <Skills />
      <Awards />
      <Projects />

      <footer className="border-t border-white/5 bg-background px-4 py-12 md:px-24">
        <div className="flex flex-col items-center justify-between gap-12 md:flex-row">
          <div className="text-center md:text-left">
            <MagneticLink
              href="https://linkedin.com/in/mansimodi"
              target="_blank"
              rel="noopener noreferrer"
              strength={0.2}
              className="group inline-block"
            >
              <h2 className="font-sans text-3xl font-light tracking-tighter md:text-4xl mb-4 text-white">
                Mansi <span className="italic text-white">Modi</span>
              </h2>
            </MagneticLink>
            <p className="font-mono text-[10px] uppercase tracking-[0.5em] text-white/40 mb-2">
              Lead Data Scientist // San Francisco Bay Area
            </p>
            <p className="font-mono text-[8px] uppercase tracking-[0.2em] text-white/20">
              © 2026 All Rights Reserved
            </p>
          </div>

          <div className="flex gap-8">
            <MagneticLink href="https://linkedin.com/in/mansimodi" strength={0.4} className="font-sans text-xs uppercase tracking-widest text-white/40 hover:text-white transition-colors">LinkedIn</MagneticLink>
          </div>
        </div>
      </footer>
    </main>
  );
}
