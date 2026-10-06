import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const rise = (delay: number) => ({
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, delay, ease: [0.215, 0.61, 0.355, 1] as const },
});

export default function Hero() {
  return (
    <section className="relative z-20 bg-background px-4 pb-20 pt-28 md:px-24 md:pb-28 md:pt-36">
      <div className="mx-auto flex max-w-6xl flex-col lg:flex-row-reverse lg:items-start lg:justify-between lg:gap-16">
        <motion.img
          {...rise(0)}
          src="/headshot.jpg"
          alt="Mansi Modi"
          width={498}
          height={498}
          className="mb-8 h-24 w-24 shrink-0 rounded-2xl object-cover ring-1 ring-contour sm:h-28 sm:w-28 lg:mb-0 lg:h-64 lg:w-64 lg:rounded-[2rem] xl:h-72 xl:w-72"
        />

        <div className="min-w-0 max-w-3xl flex-1">
          <motion.p {...rise(0.05)} className="depth-label mb-6">
            Data scientist → Product manager · AI products
          </motion.p>

          <motion.h1
            {...rise(0.1)}
            className="font-serif text-5xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl lg:text-8xl"
          >
            Mansi <span className="italic text-accent">Modi</span>
          </motion.h1>

          <motion.p
            {...rise(0.18)}
            className="mt-8 max-w-2xl font-serif text-2xl font-light leading-snug text-foreground md:text-3xl"
          >
            I turn customer data into product decisions people act on.
          </motion.p>

          <motion.p
            {...rise(0.24)}
            className="mt-6 max-w-xl font-sans text-lg font-light leading-relaxed text-muted"
          >
            Eight years at AT&amp;T analyzing 100K+ customer conversations a week with AI. Now I'm
            bringing that customer focus to AI product management.
          </motion.p>

          <motion.div {...rise(0.3)} className="mt-10 flex flex-wrap items-center gap-4">
            <Link
              to="/work"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3 font-sans text-sm font-medium text-background transition-colors hover:bg-accent-dim"
            >
              See my work
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-full border border-contour px-6 py-3 font-sans text-sm font-medium text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Let's talk
            </Link>
          </motion.div>

          <motion.p
            {...rise(0.36)}
            className="mt-8 inline-flex items-center gap-2 font-mono text-[11px] uppercase tracking-widest text-muted"
          >
            <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
            Open to product management roles
          </motion.p>
        </div>
      </div>
    </section>
  );
}
