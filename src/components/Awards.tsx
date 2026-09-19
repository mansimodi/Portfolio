import { motion } from 'motion/react';
import { Award, Star } from 'lucide-react';
import TextReveal from './TextReveal';
import SectionLabel from './SectionLabel';

const AWARDS = [
  {
    title: 'AT&T Connection Award',
    description:
      'Recognized for taking leadership in data analysis for AT&T chat product, optimizing overall analytics process and mentoring fellow teammates.',
    year: 'AT&T',
  },
  {
    title: 'AT&T We Care Award',
    description:
      'Recognized for driving innovation in digital channel (chat) analytics, challenging conventional approaches, and mentoring teammates to enhance data insights and professional growth.',
    year: 'AT&T',
  },
];

export default function Awards() {
  return (
    <section className="relative z-20 bg-background px-4 py-16 md:px-24">
      <div className="mx-auto max-w-5xl">
        <SectionLabel depth="−140m" label="Recognition" />

        <TextReveal className="mb-16">
          <h2 className="font-serif text-3xl font-light tracking-tight text-foreground sm:text-4xl md:text-5xl">
            Honors & <span className="italic text-muted">Awards</span>
          </h2>
        </TextReveal>

        <div className="grid gap-8 md:grid-cols-2">
          {AWARDS.map((award, index) => (
            <motion.div
              key={award.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative rounded-2xl border border-contour/30 bg-surface/50 p-8 transition-colors hover:border-accent/30 hover:bg-surface"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-accent/10 text-accent">
                <Award className="h-6 w-6" />
              </div>
              <div className="flex items-start justify-between">
                <h3 className="font-serif text-xl text-foreground">{award.title}</h3>
                <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-muted">
                  <Star className="h-3 w-3 fill-current text-life-accent-soft" />
                  {award.year}
                </span>
              </div>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-muted">
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
