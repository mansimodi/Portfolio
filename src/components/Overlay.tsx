import { motion, useTransform, MotionValue } from 'motion/react';

interface OverlayProps {
  scrollYProgress: MotionValue<number>;
}

export default function Overlay({ scrollYProgress }: OverlayProps) {
  // Section 1: My Name (0% - 20%)
  const s1Opacity = useTransform(scrollYProgress, [0, 0.1, 0.15, 0.2], [0, 1, 1, 0]);
  const s1Scale = useTransform(scrollYProgress, [0, 0.2], [1, 1.1]);
  
  // Section 2: I build digital experiences (25% - 45%)
  const s2Opacity = useTransform(scrollYProgress, [0.25, 0.3, 0.4, 0.45], [0, 1, 1, 0]);
  const s2X = useTransform(scrollYProgress, [0.25, 0.45], [-30, 30]);

  // Section 3: Bridging design and engineering (55% - 75%)
  const s3Opacity = useTransform(scrollYProgress, [0.55, 0.6, 0.7, 0.75], [0, 1, 1, 0]);
  const s3X = useTransform(scrollYProgress, [0.55, 0.75], [30, -30]);

  return (
    <div className="pointer-events-none absolute inset-0 z-10 w-full h-screen">
      {/* Section 1: Landing */}
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
          <h1 className="font-sans text-4xl font-light tracking-tighter text-white sm:text-6xl md:text-7xl uppercase">
            Mansi <span className="italic text-white">Modi</span>
          </h1>
        </a>
        <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.6em] text-white/60">
          Lead Data Scientist
        </p>
      </motion.div>

      {/* Scroll Hint */}
      <motion.div
        style={{ opacity: s1Opacity }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.4em] text-white/40">Scroll to Explore</span>
        <div className="h-12 w-[1px] bg-linear-to-b from-white/40 to-transparent" />
      </motion.div>

      {/* Section 2: Left Align */}
      <motion.div 
        style={{ opacity: s2Opacity, x: s2X }}
        className="fixed inset-0 flex flex-col justify-center px-8 md:px-24"
      >
        <div className="max-w-2xl">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">The Mission</p>
          <h2 className="font-sans text-3xl font-medium leading-[1.1] sm:text-5xl md:text-6xl text-white/90">
            Building systems that <br /> 
            <span className="italic text-white">make hard decisions easier.</span>
          </h2>
        </div>
      </motion.div>

      {/* Section 3: Right Align */}
      <motion.div 
        style={{ opacity: s3Opacity, x: s3X }}
        className="fixed inset-0 flex flex-col items-end justify-center px-8 md:px-24"
      >
        <div className="max-w-2xl text-right">
          <p className="font-mono text-xs uppercase tracking-widest text-white/40 mb-4">The Approach</p>
          <h2 className="font-sans text-3xl font-medium leading-[1.1] sm:text-5xl md:text-6xl text-white/90">
            Turning behavioral data <br />
            <span className="text-white/60">into</span> strategic clarity.
          </h2>
        </div>
      </motion.div>
    </div>
  );
}
