/**
 * Sistema de partículas y efectos visuales
 */

import type { Particle } from '../types';

/** Generar ID único */
function generateId(): string {
  return `${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/** Crear partícula de explosión al acertar */
export function createExplosionParticle(x: number, y: number, color: string): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 2 + Math.random() * 4;
  
  return {
    id: generateId(),
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 1,
    maxLife: 1,
    color,
    size: 3 + Math.random() * 4,
    type: 'explosion',
  };
}

/** Crear partícula de brillo/glow */
export function createGlowParticle(x: number, y: number, color: string): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 0.5 + Math.random() * 1.5;
  
  return {
    id: generateId(),
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1,
    life: 1,
    maxLife: 1,
    color,
    size: 2 + Math.random() * 3,
    type: 'glow',
  };
}

/** Crear partícula de rastro/trail */
export function createTrailParticle(x: number, y: number, color: string): Particle {
  return {
    id: generateId(),
    x: x + (Math.random() - 0.5) * 10,
    y: y + (Math.random() - 0.5) * 10,
    vx: (Math.random() - 0.5) * 2,
    vy: (Math.random() - 0.5) * 2,
    life: 1,
    maxLife: 1,
    color,
    size: 2,
    type: 'trail',
  };
}

/** Crear partícula de chispa (para combos) */
export function createSparkParticle(x: number, y: number, color: string): Particle {
  const angle = Math.random() * Math.PI * 2;
  const speed = 5 + Math.random() * 8;
  
  return {
    id: generateId(),
    x,
    y,
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed,
    life: 0.8 + Math.random() * 0.4,
    maxLife: 1,
    color,
    size: 2 + Math.random() * 3,
    type: 'spark',
  };
}

/** Actualizar todas las partículas */
export function updateParticles(particles: Particle[]): Particle[] {
  return particles
    .map(p => ({
      ...p,
      x: p.x + p.vx,
      y: p.y + p.vy,
      vy: p.type === 'explosion' ? p.vy + 0.2 : p.vy, // gravedad para explosiones
      life: p.life - 0.02,
    }))
    .filter(p => p.life > 0);
}

/** Generar explosión completa con múltiples partículas */
export function createExplosion(
  x: number, 
  y: number, 
  color: string, 
  count: number = 8
): Particle[] {
  return Array.from({ length: count }, () => createExplosionParticle(x, y, color));
}

/** Generar efecto de combo con partículas radiantes */
export function createComboEffect(
  x: number, 
  y: number, 
  combo: number
): Particle[] {
  const colors = ['#ff00a0', '#00f0ff', '#ffd700', '#ff6b6b', '#4ade80'];
  const count = Math.min(15, 5 + Math.floor(combo / 10));
  
  return Array.from({ length: count }, (_, i) => {
    const angle = (i / count) * Math.PI * 2;
    const speed = 3 + Math.random() * 5;
    const color = colors[Math.floor(Math.random() * colors.length)];
    
    return {
      id: generateId(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 1,
      maxLife: 1,
      color,
      size: 4 + Math.random() * 4,
      type: 'spark',
    };
  });
}

/** Generar efecto de level up - explosión masiva */
export function createLevelUpEffect(x: number, y: number): Particle[] {
  const colors = ['#00f0ff', '#ff00a0', '#ffd700', '#fff'];
  const particles: Particle[] = [];
  
  // Múltiples ondas de explosión
  for (let wave = 0; wave < 3; wave++) {
    const count = 20;
    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2;
      const speed = 2 + wave * 2 + Math.random() * 3;
      const color = colors[wave % colors.length];
      
      particles.push({
        id: generateId(),
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        life: 1.5 - wave * 0.3,
        maxLife: 1.5,
        color,
        size: 3 + Math.random() * 5,
        type: 'explosion',
      });
    }
  }
  
  return particles;
}

/** Generar efecto de error - partículas rojas dispersas */
export function createErrorEffect(x: number, y: number): Particle[] {
  const colors = ['#ff3333', '#ff0000', '#cc0000'];
  
  return Array.from({ length: 12 }, () => {
    const angle = Math.random() * Math.PI * 2;
    const speed = 3 + Math.random() * 4;
    
    return {
      id: generateId(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed,
      life: 0.6,
      maxLife: 0.6,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 3 + Math.random() * 3,
      type: 'spark',
    };
  });
}

/** Generar efecto de racha - arco de partículas */
export function createStreakEffect(
  x: number, 
  y: number, 
  streak: number
): Particle[] {
  const colors = ['#ffd700', '#ffaa00', '#ff6b6b'];
  const count = Math.min(20, 8 + Math.floor(streak / 5));
  
  return Array.from({ length: count }, (_, i) => {
    const angle = -Math.PI / 2 + (i - count / 2) * 0.2;
    const speed = 2 + Math.random() * 3;
    
    return {
      id: generateId(),
      x,
      y,
      vx: Math.cos(angle) * speed,
      vy: Math.sin(angle) * speed - 1,
      life: 0.8,
      maxLife: 0.8,
      color: colors[Math.floor(Math.random() * colors.length)],
      size: 2 + Math.random() * 3,
      type: 'glow',
    };
  });
}

/** Crear efecto de typing - partículas suaves */
export function createTypingEffect(x: number, y: number, color: string): Particle[] {
  return Array.from({ length: 3 }, () => createGlowParticle(x, y, color));
}
