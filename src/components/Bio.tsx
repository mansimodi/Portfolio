import { motion } from 'motion/react';
import TextReveal from './TextReveal';
import SectionLabel from './SectionLabel';

export default function Bio() {
  return (
    <section id="introduction" className="relative z-20 scroll-mt-24 bg-background px-4 py-16 md:px-24 md:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel id="introduction" label="Introduction" />

        <TextReveal className="space-y-8">
          <h2 className="font-serif text-2xl font-light leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            I find what customers struggle with,{' '}
            <span className="italic text-accent">and turn it into what the product does next.</span>
          </h2>
        </TextReveal>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.15 }}
          viewport={{ once: true }}
          className="mt-8"
        >
          <div className="grid gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <p className="font-sans text-lg font-light leading-relaxed text-muted">
                For eight years at AT&amp;T, I worked where customers, data, and product
                meet. I analyzed 100K+ customer chats a week with AI, found the problems
                behind them, and took product recommendations to leadership. I learned
                that the best analysis isn't the most sophisticated one. It's the one
                that changes what the product does next.
              </p>
            </div>
            <div className="space-y-6">
              <p className="font-sans text-lg font-light leading-relaxed text-muted">
                Now I'm moving into product management, focused on AI products. I bring
                a data scientist's rigor (Python, SQL, Snowflake, experimentation) and the
                habits a product team needs: start with the customer's problem, get
                cross-functional teams aligned (I led a 30+ stakeholder trial from idea
                to launch), and prove the impact with numbers.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
