/**
 * Componente de canvas para partículas
 */

import { useEffect, useRef } from 'react';
import type { Particle } from '../types';

interface ParticleCanvasProps {
  particles: Particle[];
}

export function ParticleCanvas({ particles }: ParticleCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Ajustar tamaño del canvas
    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    return () => window.removeEventListener('resize', resize);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Limpiar canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Dibujar partículas
    particles.forEach(particle => {
      const alpha = particle.life / particle.maxLife;
      ctx.globalAlpha = alpha;
      
      // Glow effect
      ctx.shadowBlur = particle.size * 2;
      ctx.shadowColor = particle.color;
      
      ctx.beginPath();
      ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      ctx.fillStyle = particle.color;
      ctx.fill();
      
      // Reset shadow
      ctx.shadowBlur = 0;
    });

    ctx.globalAlpha = 1;
  }, [particles]);

  return (
    <canvas
      ref={canvasRef}
      className="particles-container"
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 100,
      }}
    />
  );
}
