/**
 * Hook para manejar el sistema de partículas
 */

import { useState, useCallback, useRef, useEffect } from 'react';
import type { Particle } from '../types';
import {
  updateParticles,
  createExplosion,
  createComboEffect,
  createLevelUpEffect,
  createErrorEffect,
  createStreakEffect,
  createTypingEffect,
} from '../utils/particles';

interface UseParticlesReturn {
  particles: Particle[];
  spawnExplosion: (x: number, y: number, color: string, count?: number) => void;
  spawnCombo: (x: number, y: number, combo: number) => void;
  spawnLevelUp: (x: number, y: number) => void;
  spawnError: (x: number, y: number) => void;
  spawnStreak: (x: number, y: number, streak: number) => void;
  spawnTyping: (x: number, y: number, color: string) => void;
  clearParticles: () => void;
}

export function useParticles(): UseParticlesReturn {
  const [particles, setParticles] = useState<Particle[]>([]);
  const animationRef = useRef<number | null>(null);
  
  // Loop de animación
  useEffect(() => {
    const animate = () => {
      setParticles(prev => updateParticles(prev));
      animationRef.current = requestAnimationFrame(animate);
    };
    
    animationRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);
  
  /** Crear explosión de partículas */
  const spawnExplosion = useCallback((
    x: number, 
    y: number, 
    color: string, 
    count: number = 8
  ) => {
    setParticles(prev => [...prev, ...createExplosion(x, y, color, count)]);
  }, []);
  
  /** Crear efecto de combo */
  const spawnCombo = useCallback((x: number, y: number, combo: number) => {
    setParticles(prev => [...prev, ...createComboEffect(x, y, combo)]);
  }, []);
  
  /** Crear efecto de level up */
  const spawnLevelUp = useCallback((x: number, y: number) => {
    setParticles(prev => [...prev, ...createLevelUpEffect(x, y)]);
  }, []);
  
  /** Crear efecto de error */
  const spawnError = useCallback((x: number, y: number) => {
    setParticles(prev => [...prev, ...createErrorEffect(x, y)]);
  }, []);
  
  /** Crear efecto de racha */
  const spawnStreak = useCallback((x: number, y: number, streak: number) => {
    setParticles(prev => [...prev, ...createStreakEffect(x, y, streak)]);
  }, []);
  
  /** Crear efecto de typing */
  const spawnTyping = useCallback((x: number, y: number, color: string) => {
    setParticles(prev => [...prev, ...createTypingEffect(x, y, color)]);
  }, []);
  
  /** Limpiar todas las partículas */
  const clearParticles = useCallback(() => {
    setParticles([]);
  }, []);
  
  return {
    particles,
    spawnExplosion,
    spawnCombo,
    spawnLevelUp,
    spawnError,
    spawnStreak,
    spawnTyping,
    clearParticles,
  };
}
