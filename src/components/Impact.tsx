import { useRef } from 'react';
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
      className="relative z-20 border-y border-white/5 bg-background px-4 py-16 md:px-24"
    >
      <div className="mx-auto grid max-w-6xl gap-10 sm:grid-cols-2 lg:grid-cols-4">
        {STATS.map((stat) => (
          <div key={stat.label} className="text-center sm:text-left">
            <p className="font-sans text-4xl font-light tracking-tighter text-white sm:text-5xl">
              {stat.prefix}
              <span data-count={stat.value}>0</span>
              {stat.suffix}
            </p>
            <p className="mt-3 font-mono text-[10px] uppercase tracking-[0.2em] text-white/40">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
