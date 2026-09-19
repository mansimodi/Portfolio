import { motion } from 'motion/react';
import TextReveal from './TextReveal';
import SectionLabel from './SectionLabel';

export default function Bio() {
  return (
    <section className="relative z-20 bg-background px-4 py-16 md:px-24 md:py-20">
      <div className="mx-auto max-w-5xl">
        <SectionLabel depth="−120m" label="Introduction" />

        <TextReveal className="space-y-8">
          <h2 className="font-serif text-2xl font-light leading-snug tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
            I build data systems that{' '}
            <span className="italic text-accent">make hard decisions easier.</span>
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
                Eight years in, I've learned that the best analysis isn't the most
                sophisticated one — it's the one that actually changes what leadership
                does next. I work at the intersection of machine learning, product
                strategy, and storytelling, turning customer behavior, revenue signals,
                and operational noise into clarity.
              </p>
            </div>
            <div className="space-y-6">
              <p className="font-sans text-lg font-light leading-relaxed text-muted">
                My toolkit spans Python, SQL, Snowflake, and Power BI, with deep
                experience in time series modeling, anomaly detection, and AI-driven
                analytics. And when the model is done, I don't stop at the output — I
                bring findings to AVPs, directors, and cross-functional teams in a
                language that drives decisions, not just discussions.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
