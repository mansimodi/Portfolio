import { motion } from 'motion/react';
import { Link } from 'react-router-dom';
import { ArrowUpRight, Mic } from 'lucide-react';
import TextReveal from './TextReveal';
import SectionLabel from './SectionLabel';
import { TALKS } from '../data/talks';

export default function Speaking() {
  return (
    <section id="speaking" className="relative z-20 scroll-mt-24 bg-background px-4 py-16 md:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionLabel id="speaking" label="Speaking" />

        <TextReveal className="mb-16">
          <h2 className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Talks & <span className="italic text-muted">Sessions</span>
          </h2>
        </TextReveal>

        <div className="grid gap-8">
          {TALKS.map((talk, index) => (
            <motion.div
              key={talk.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <Link
                to={`/talks/${talk.slug}`}
                className="group relative block rounded-2xl border border-contour/30 bg-surface/50 p-8 transition-colors hover:border-accent/40 hover:bg-surface focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent md:p-10"
              >
                <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                      <Mic className="h-6 w-6" />
                    </div>
                    <div>
                      <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-accent">
                        {talk.event}
                      </p>
                      <p className="mt-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                        {talk.dates} // {talk.format}
                      </p>
                    </div>
                  </div>
                  <div className="flex h-10 w-10 items-center justify-center rounded-full glass transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5">
                    <ArrowUpRight className="h-5 w-5 text-accent" />
                  </div>
                </div>

                <h3 className="max-w-3xl font-serif text-2xl font-light leading-snug text-foreground transition-colors group-hover:text-accent md:text-3xl">
                  {talk.title}
                </h3>
                <p className="mt-2 font-serif text-lg italic text-muted">{talk.subtitle}</p>
                <p className="mt-6 max-w-3xl font-sans text-sm font-light leading-relaxed text-muted">
                  {talk.summary}
                </p>
                <p className="mt-8 font-mono text-[10px] uppercase tracking-widest text-accent">
                  View the session, tools & prompt →
                </p>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
