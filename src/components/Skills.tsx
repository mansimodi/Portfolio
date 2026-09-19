import { motion } from 'motion/react';
import SectionLabel from './SectionLabel';

const SKILLS = [
  {
    category: 'AI & Innovation',
    items: ['Gemini', 'Claude', 'ChatGPT', 'HeyGen', 'ElevenLabs', 'Perplexity', 'Google AI Studio'],
  },
  {
    category: 'Data & Cloud',
    items: ['Snowflake', 'Snowpark', 'Hive', 'Vertica', 'Toad', 'DataBricks'],
  },
  {
    category: 'Programming',
    items: ['Python', 'PySpark', 'R', 'SQL'],
  },
  {
    category: 'Visualization & PM',
    items: ['Power BI', 'Tableau', 'Agile', 'JIRA', 'itrack'],
  },
];

export default function Skills() {
  return (
    <section className="relative z-20 border-y border-contour/30 bg-surface px-4 py-16 md:px-24">
      <div className="mx-auto max-w-6xl">
        <SectionLabel depth="−180m" label="Toolkit" />
        <div className="grid gap-16 md:grid-cols-2 lg:grid-cols-4">
          {SKILLS.map((set, i) => (
            <motion.div
              key={set.category}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{
                duration: 1,
                delay: i * 0.15,
                ease: [0.215, 0.61, 0.355, 1],
              }}
            >
              <h3 className="mb-8 border-b border-contour/40 pb-4 font-mono text-[10px] uppercase tracking-[0.3em] text-muted">
                {set.category}
              </h3>
              <ul className="space-y-4">
                {set.items.map((skill) => (
                  <li
                    key={skill}
                    className="font-sans text-lg font-light tracking-tight text-foreground/80 transition-colors hover:text-accent"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
