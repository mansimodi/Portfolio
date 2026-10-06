import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { gsap, useGSAP } from '../lib/gsap';

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
}

const STATS: Stat[] = [
  { value: 100, suffix: 'K+', label: 'Transcripts analyzed weekly' },
  { value: 10, suffix: '%', label: 'Higher chat resolve rate' },
  { value: 75, suffix: '%', label: 'Forecast accuracy improvement' },
  { value: 2, prefix: '$', suffix: 'M', label: 'Saved annually via routing fix' },
];

export default function Impact() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const counters = sectionRef.current?.querySelectorAll<HTMLElement>('[data-count]');
      counters?.forEach((el) => {
        const target = Number(el.dataset.count);
        const proxy = { val: 0 };
        gsap.to(proxy, {
          val: target,
          duration: 1.6,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: el,
            start: 'top 85%',
          },
          onUpdate: () => {
            el.textContent = Math.round(proxy.val).toString();
          },
        });
      });
    },
    { scope: sectionRef }
  );

  return (
    <section
      ref={sectionRef}
      className="relative z-20 bg-surface px-4 py-16 md:px-24"
      aria-label="Impact soundings"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-10 font-mono text-[10px] uppercase tracking-[0.35em] text-accent">
          Results at AT&amp;T
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l border-contour/50 pl-6 text-center sm:text-left">
              <p className="font-serif text-4xl font-light tracking-tight text-bay sm:text-5xl">
                {stat.prefix}
                <span data-count={stat.value}>0</span>
                {stat.suffix}
              </p>
              <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-contour/40 pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl font-sans text-base font-light leading-relaxed text-muted">
            Each number started as a customer problem hiding in the data, and ended as a
            change in how the product worked.
          </p>
          <Link
            to="/work"
            className="group inline-flex shrink-0 items-center gap-2 font-sans text-sm font-medium text-accent transition-colors hover:text-foreground"
          >
            See the projects behind these numbers
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </section>
  );
}
