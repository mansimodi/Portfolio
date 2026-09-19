import { useRef } from 'react';
import { gsap, useGSAP } from '../lib/gsap';

interface Stat {
  value: number;
  prefix?: string;
  suffix?: string;
  label: string;
  depth: string;
}

const STATS: Stat[] = [
  { value: 100, suffix: 'K+', label: 'Transcripts analyzed weekly', depth: '−340m' },
  { value: 10, suffix: '%', label: 'Higher chat resolve rate', depth: '−280m' },
  { value: 75, suffix: '%', label: 'Forecast accuracy improvement', depth: '−220m' },
  { value: 2, prefix: '$', suffix: 'M', label: 'Saved annually via routing fix', depth: '−160m' },
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
          Field Soundings
        </p>
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {STATS.map((stat) => (
            <div key={stat.label} className="border-l border-contour/50 pl-6 text-center sm:text-left">
              <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-accent/70">
                {stat.depth}
              </p>
              <p className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-5xl">
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
      </div>
    </section>
  );
}
