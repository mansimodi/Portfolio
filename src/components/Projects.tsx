import { motion } from 'motion/react';
import { ArrowUpRight } from 'lucide-react';
import TextReveal from './TextReveal';
import SectionLabel from './SectionLabel';

export const PROJECTS = [
  {
    title: 'AI-Powered Call & Chat Analytics',
    description:
      'Adopted AI tools to analyze 100k+ transcripts weekly. Improved resolve rate by 10% and reduced call handle time by 15% through deep sentiment and intent analysis.',
    category: 'ML & AI Analytics // 10% higher resolve rate',
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2670&auto=format&fit=crop',
    year: 'AT&T',
  },
  {
    title: 'Insurance Call Routing Optimization',
    description:
      'Identified underlying root causes to drive correct call routing. Redirecting insurance calls to the right department saved AT&T $2million annually.',
    category: 'Strategic Routing // $2M annual savings',
    image:
      'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=2670&auto=format&fit=crop',
    year: 'AT&T',
  },
  {
    title: 'Revenue Forecasting Pipeline',
    description:
      'Improved revenue forecasting accuracy by 75% for all AT&T lines of business using the Prophet model. Integrated end-to-end pipeline into KPI dashboards.',
    category: 'Prophet Forecasting // 75% accuracy gain',
    image:
      'https://images.unsplash.com/photo-1543286386-713bdd548da4?q=80&w=2670&auto=format&fit=crop',
    year: 'AT&T',
  },
  {
    title: 'Anomaly Detection System',
    description:
      'Reduced false anomalies by 30% using time series models. Resulted in 20% reduction in manual resolution hours, saving $0.5M annually.',
    category: 'Time Series ML // $0.5M saved annually',
    image:
      'https://images.unsplash.com/photo-1535303311164-664fc9ec6532?q=80&w=2670&auto=format&fit=crop',
    year: 'AT&T',
  },
  {
    title: 'Chronic Call Rerouting Trial',
    description:
      'Led trial from ideation to execution for 30+ stakeholders. Improved resolve rate by 6% for chronic calls through strategic rerouting logic.',
    category: 'Strategic Rerouting // +6% resolve rate',
    image:
      'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?q=80&w=2670&auto=format&fit=crop',
    year: 'AT&T',
  },
];

export default function Projects() {
  return (
    <section className="relative z-20 bg-background px-4 py-16 md:px-24">
      <div className="mb-16 flex flex-col items-start justify-between border-b border-contour/40 pb-12 md:flex-row md:items-end">
        <div>
          <SectionLabel depth="−200m" label="Highest Impact Projects" />
          <TextReveal>
            <h2 className="font-serif text-3xl font-light tracking-tight text-foreground md:text-5xl">
              Selected <span className="italic text-muted">Milestones</span>
            </h2>
          </TextReveal>
        </div>
        <div className="mt-8 md:mt-0">
          <p className="max-w-xs font-sans text-sm font-light leading-relaxed text-muted">
            A career focused on turning operational noise into clarity through machine
            learning, product strategy, and storytelling.
          </p>
        </div>
      </div>

      <div className="grid gap-x-12 gap-y-20 sm:grid-cols-2">
        {PROJECTS.map((project, index) => (
          <motion.div
            key={project.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className="group relative cursor-pointer"
          >
            <div className="relative mb-8 aspect-[16/10] overflow-hidden rounded-2xl border border-contour/30 bg-surface transition-transform duration-700 ease-out group-hover:scale-[0.98]">
              <img
                src={project.image}
                alt=""
                referrerPolicy="no-referrer"
                className="h-full w-full object-cover opacity-50 grayscale transition-all duration-1000 ease-out group-hover:scale-110 group-hover:opacity-90 group-hover:grayscale-0"
              />
              <div className="absolute inset-0 bg-linear-to-t from-background to-transparent opacity-90" />

              <div className="absolute right-6 top-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-full glass opacity-0 transition-all duration-300 group-hover:opacity-100">
                  <ArrowUpRight className="h-5 w-5 text-accent" />
                </div>
              </div>
            </div>

            <div className="px-2">
              <div className="mb-4 flex items-start justify-between">
                <h3 className="font-serif text-xl font-light text-foreground transition-colors group-hover:text-accent">
                  {project.title}
                </h3>
                <p className="mt-2 font-mono text-[10px] uppercase tracking-widest text-muted/60">
                  {project.year}
                </p>
              </div>
              <p className="mb-3 font-mono text-xs uppercase tracking-widest text-accent/80">
                {project.category}
              </p>
              <p className="font-sans text-sm font-light leading-relaxed text-muted transition-colors group-hover:text-foreground/80">
                {project.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
