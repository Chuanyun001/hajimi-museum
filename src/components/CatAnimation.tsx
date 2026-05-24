import { useEffect, useRef } from 'react';
import { registerInstance, unregisterInstance, setVisible } from '../animation/engine';
import type { AnimInstance, AnimScript } from '../animation/engine';

interface CatAnimationProps {
  script: AnimScript;
  width?: number;
  height?: number;
  className?: string;
}

export default function CatAnimation({
  script,
  width = 120,
  height = 80,
  className = '',
}: CatAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const instRef = useRef<AnimInstance | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    canvas.width = width;
    canvas.height = height;

    const inst = registerInstance(canvas, script);
    instRef.current = inst;

    const observer = new IntersectionObserver(
      ([entry]) => setVisible(inst, entry.isIntersecting),
      { threshold: 0.1 }
    );
    observer.observe(canvas);

    return () => {
      observer.disconnect();
      unregisterInstance(inst);
      instRef.current = null;
    };
  }, [script, width, height]);

  return (
    <canvas
      ref={canvasRef}
      className={`block ${className}`}
      style={{
        imageRendering: 'pixelated',
        width: `${width}px`,
        height: `${height}px`,
      }}
    />
  );
}
