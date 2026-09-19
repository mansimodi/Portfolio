import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, useSpring, MotionValue } from 'motion/react';
import Overlay from './Overlay';

interface ScrollyCanvasProps {
  frameCount: number;
}

export default function ScrollyCanvas({ frameCount }: ScrollyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [progress, setProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Smooth out the scroll progress for buttery movement
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const frameIndex = useTransform(smoothProgress, [0, 1], [0, frameCount - 1]);

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadedCount = 0;

    const sequencePath = (index: number) => {
      const idx = index.toString().padStart(3, '0');
      return `/sequence/frame_${idx}_delay-0.067s.webp`;
    };

    const preloadImages = async () => {
      for (let i = 0; i < frameCount; i++) {
        const img = new Image();
        img.src = sequencePath(i);
        img.onload = () => {
          loadedCount++;
          if (loadedCount === frameCount) {
            setIsLoaded(true);
          }
          setProgress((loadedCount / frameCount) * 100);
        };
        loadedImages[i] = img;
      }
      setImages(loadedImages);
    };

    preloadImages();
  }, [frameCount]);

  // Handle Resize & Render
  useEffect(() => {
    const render = () => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext('2d');
      if (!canvas || !ctx || images.length === 0) return;

      const currentFrame = Math.round(frameIndex.get());
      const img = images[currentFrame];

      if (!img || !img.complete) return;

      // Object-fit: cover logic with subtle zoom to crop watermarks
      const zoom = 1.08;
      const canvasAspectRatio = canvas.width / canvas.height;
      const imageAspectRatio = img.width / img.height;
      let drawWidth, drawHeight, offsetX, offsetY;

      if (canvasAspectRatio > imageAspectRatio) {
        drawWidth = canvas.width * zoom;
        drawHeight = (canvas.width / imageAspectRatio) * zoom;
      } else {
        drawWidth = (canvas.height * imageAspectRatio) * zoom;
        drawHeight = canvas.height * zoom;
      }

      offsetX = (canvas.width - drawWidth) / 2;
      offsetY = (canvas.height - drawHeight) / 2;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    const handleResize = () => {
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
        render(); // Re-render on resize
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // Re-render when index changes
    const unsubscribe = frameIndex.on('change', () => {
      requestAnimationFrame(render);
    });

    return () => {
      window.removeEventListener('resize', handleResize);
      unsubscribe();
    };
  }, [images, frameIndex]);

  return (
    <div ref={containerRef} className="relative h-[220vh] bg-background">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!isLoaded && (
          <div className="absolute inset-0 z-50 flex flex-col items-center justify-center bg-background">
            <div className="mb-4 h-px w-48 bg-contour/40">
              <div
                className="h-full bg-accent transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted">
              Loading field sequence {Math.round(progress)}%
            </p>
          </div>
        )}

        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover"
          style={{ filter: isLoaded ? 'none' : 'blur(20px)' }}
        />
        <Overlay scrollYProgress={scrollYProgress} />
      </div>
    </div>
  );
}
