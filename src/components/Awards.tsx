import { motion } from 'motion/react';
import { Award, Star } from 'lucide-react';
import TextReveal from './TextReveal';

const AWARDS = [
  {
    title: "AT&T Connection Award",
    description: "Recognized for taking leadership in data analysis for AT&T chat product, optimizing overall analytics process and mentoring fellow teammates.",
    year: "AT&T"
  },
  {
    title: "AT&T We Care Award",
    description: "Recognized for driving innovation in digital channel (chat) analytics, challenging conventional approaches, and mentoring teammates to enhance data insights and professional growth.",
    year: "AT&T"
  }
];

export default function Awards() {
  return (
    <section className="relative z-20 bg-background px-4 py-8 md:px-24">
      <div className="mx-auto max-w-5xl">
        <div className="mb-12 flex items-center gap-4">
          <div className="h-[1px] w-12 bg-white/20" />
          <p className="font-mono text-xs uppercase tracking-widest text-white/40">Recognition</p>
        </div>

        <TextReveal className="mb-16">
          <h2 className="font-sans text-3xl font-light tracking-tighter text-white/90 sm:text-4xl md:text-5xl">
            Honors & <span className="italic text-white/50">Awards</span>
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
              className="relative rounded-2xl border border-white/5 bg-white/[0.02] p-8 transition-colors hover:bg-white/[0.04]"
            >
              <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 text-white/60">
                <Award className="h-6 w-6" />
              </div>
              <div className="flex items-start justify-between">
                <h3 className="font-sans text-xl font-medium text-white">{award.title}</h3>
                <span className="flex items-center gap-1 font-mono text-[10px] uppercase tracking-widest text-white/20">
                  <Star className="h-3 w-3 fill-current" />
                  {award.year}
                </span>
              </div>
              <p className="mt-4 font-sans text-sm font-light leading-relaxed text-white/40">
                {award.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
