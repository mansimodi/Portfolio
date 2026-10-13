import { motion } from 'motion/react';
import TextReveal from './TextReveal';
import SectionLabel from './SectionLabel';

export const HOBBIES = [
  {
    title: 'Underwater Hockey',
    tag: 'Signature',
    description:
      'Competitive pool sport that demands strategy, breath control, and reading the field three dimensions at once — not unlike finding signal in noisy data.',
    image: '/life/underwater-hockey.jpg',
    alt: 'Mansi playing underwater hockey at the 2022 Underwater Hockey Nationals in Thornton, Colorado (photo © Yori V. Huynh)',
  },
  {
    title: 'Fitness',
    tag: 'Routine',
    description:
      'Strength training and staying active — the discipline of showing up consistently, applied outside the office.',
    image: '/life/fitness.jpg',
    alt: 'Mansi in a side-plank yoga pose on a mat in a sunlit park',
  },
  {
    title: 'Travel',
    tag: 'Explore',
    description:
      'New cities, new coastlines, new perspectives. Travel resets how I see patterns — in places and in people.',
    image: '/life/travel.jpg',
    alt: 'Mansi in a yellow knit hat looking up at the northern lights over a snowy pine forest',
  },
  {
    title: 'Crochet',
    tag: 'Craft',
    description:
      'Slow, iterative work with your hands. There is something grounding about building one loop at a time.',
    image: '/life/crochet.jpg',
    alt: 'Mansi smiling in a chunky mustard knit beanie on a windy sea-cliff walk',
  },
  {
    title: 'Painting',
    tag: 'Create',
    description:
      'Color, composition, and patience. A different kind of problem-solving — less precise, more expressive.',
    image: '/life/painting.jpg',
    alt: "Mansi's acrylic painting of the northern lights over snowy mountains and a lake",
  },
];

export default function Life() {
  return (
    <section id="life" className="relative z-20 scroll-mt-24">
      <div className="surface-transition h-24 md:h-32" aria-hidden="true" />

      <div className="bg-life px-4 py-16 md:px-24 md:py-24">
        <div className="mx-auto max-w-6xl">
          <SectionLabel id="life" label="Beyond Work" variant="surface" />

          <TextReveal className="mb-8">
            <h2 className="font-serif text-3xl font-light tracking-tight text-life-foreground sm:text-4xl md:text-5xl">
              The person behind the{' '}
              <span className="italic text-life-accent">soundings</span>
            </h2>
          </TextReveal>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
            viewport={{ once: true }}
            className="mb-16 max-w-2xl font-sans text-lg font-light leading-relaxed text-life-muted"
          >
            Product and data are what I do professionally. These are the things that keep
            me curious, grounded, and human, and I'm as happy to talk about them over
            coffee as about product roadmaps.
          </motion.p>

          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {HOBBIES.map((hobby, index) => (
              <motion.article
                key={hobby.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.7, delay: index * 0.08, ease: [0.215, 0.61, 0.355, 1] }}
                className={`group overflow-hidden rounded-2xl border border-life-accent/15 bg-life-surface shadow-sm ${
                  index === 0 ? 'sm:col-span-2 lg:col-span-1 lg:row-span-1' : ''
                }`}
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={hobby.image}
                    alt={hobby.alt}
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-life-foreground/50 to-transparent" />
                  <span className="absolute left-4 top-4 rounded-full bg-life-surface/90 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-life-accent">
                    {hobby.tag}
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-serif text-xl text-life-foreground">{hobby.title}</h3>
                  <p className="mt-3 font-sans text-sm font-light leading-relaxed text-life-muted">
                    {hobby.description}
                  </p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
