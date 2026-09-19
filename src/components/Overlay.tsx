import { motion, useTransform, MotionValue } from 'motion/react';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  const s1Opacity = useTransform(scrollYProgress, [0, 0.15, 0.2], [1, 1, 0]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.05]);

  const s2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const s2X = useTransform(scrollYProgress, [0.25, 0.45], [-30, 30]);

  const s3Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const s3X = useTransform(scrollYProgress, [0.55, 0.75], [30, -30]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 h-screen w-full">
      <motion.div
        style={{ opacity: s1Opacity, scale: s1Scale }}
        className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center"
      >
        <a
          href="https://linkedin.com/in/mansimodi"
          target="_blank"
          rel="noopener noreferrer"
          className="pointer-events-auto group transition-transform hover:scale-[1.01]"
        >
          <p className="mb-4 font-mono text-[10px] uppercase tracking-[0.5em] text-accent">
            Field Log // Descent
          </p>
          <h1 className="font-serif text-4xl font-light tracking-tight text-foreground sm:text-6xl md:text-7xl">
            Mansi <span className="italic text-accent">Modi</span>
          </h1>
        </a>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.6em] text-muted">
          Lead Data Scientist
        </p>
      </motion.div>

      <motion.div
        style={{ opacity: s1Opacity }}
        className="absolute bottom-12 left-1/2 flex -translate-x-1/2 flex-col items-center gap-4"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-muted">
          Scroll to descend
        </span>
        <div className="h-12 w-px bg-linear-to-b from-accent/60 to-transparent" />
      </motion.div>

      <motion.div
        style={{ opacity: s2Opacity, x: s2X }}
        className="fixed inset-0 flex flex-col justify-center px-8 md:px-24"
      >
        <div className="max-w-2xl">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">−80m // The Mission</p>
          <h2 className="font-serif text-3xl font-light leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            Building systems that <br />
            <span className="italic text-accent">make hard decisions easier.</span>
          </h2>
        </div>
      </motion.div>

      <motion.div
        style={{ opacity: s3Opacity, x: s3X }}
        className="fixed inset-0 flex flex-col items-end justify-center px-8 md:px-24"
      >
        <div className="max-w-2xl text-right">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-accent">−40m // The Approach</p>
          <h2 className="font-serif text-3xl font-light leading-[1.1] text-foreground sm:text-5xl md:text-6xl">
            Turning behavioral data <br />
            <span className="text-muted">into</span> strategic clarity.
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
