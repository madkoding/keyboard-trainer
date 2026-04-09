/**
 * Modos de juego disponibles
 */

import type { GameMode, GameModeInfo } from '../types';

export const GAME_MODES: GameModeInfo[] = [
  {
    id: 'practice',
    name: 'Práctica',
    description: 'Modo libre. Practica sin presión de tiempo',
    icon: '🎯',
    color: '#4ade80',
  },
  {
    id: 'timeAttack',
    name: 'Contrarreloj',
    description: '60 segundos. Escribe tantas palabras como puedas',
    icon: '⏱️',
    color: '#ff6b6b',
  },
  {
    id: 'survival',
    name: 'Supervivencia',
    description: 'Tienes 3 vidas. Cada error te cuesta una',
    icon: '❤️',
    color: '#ff00a0',
  },
  {
    id: 'zen',
    name: 'Zen',
    description: 'Sin errores, sin presión. Solo fluye',
    icon: '🧘',
    color: '#00d9ff',
  },
];

/** Configuración por modo */
export const GAME_MODE_CONFIG: Record<GameMode, {
  timeLimit: number | null;
  lives: number | null;
  penaltiesEnabled: boolean;
  comboMultiplier: number;
  xpMultiplier: number;
}> = {
  practice: {
    timeLimit: null,
    lives: null,
    penaltiesEnabled: false,
    comboMultiplier: 1,
    xpMultiplier: 1,
  },
  timeAttack: {
    timeLimit: 60,
    lives: null,
    penaltiesEnabled: true,
    comboMultiplier: 1.5,
    xpMultiplier: 1.5,
  },
  survival: {
    timeLimit: null,
    lives: 3,
    penaltiesEnabled: true,
    comboMultiplier: 2,
    xpMultiplier: 2,
  },
  zen: {
    timeLimit: null,
    lives: null,
    penaltiesEnabled: false,
    comboMultiplier: 1,
    xpMultiplier: 0.5,
  },
};

/** Obtener info de modo */
export function getGameModeInfo(mode: GameMode): GameModeInfo | undefined {
  return GAME_MODES.find(m => m.id === mode);
}

/** Calcular score por modo */
export function calculateScore(
  mode: GameMode,
  stats: {
    wordsTyped: number;
    keystrokes: number;
    errors: number;
    streak: number;
    timeElapsed: number;
  }
): number {
  const baseScore = stats.wordsTyped * 100 + stats.keystrokes * 2;
  const accuracy = stats.keystrokes > 0 
    ? (stats.keystrokes - stats.errors) / stats.keystrokes 
    : 1;
  const accuracyBonus = Math.floor(accuracy * 500);
  const streakBonus = stats.streak * 10;
  
  const config = GAME_MODE_CONFIG[mode];
  const multiplier = config.xpMultiplier;
  
  return Math.floor((baseScore + accuracyBonus + streakBonus) * multiplier);
}

/** Verificar condiciones de fin de juego */
export function checkGameOver(
  mode: GameMode,
  state: {
    timeLeft: number;
    lives: number;
  }
): { isGameOver: boolean; reason: string } {
  const config = GAME_MODE_CONFIG[mode];
  
  if (config.timeLimit && state.timeLeft <= 0) {
    return { isGameOver: true, reason: 'time' };
  }
  
  if (config.lives && state.lives <= 0) {
    return { isGameOver: true, reason: 'lives' };
  }
  
  return { isGameOver: false, reason: '' };
}
