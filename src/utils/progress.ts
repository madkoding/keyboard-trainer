/**
 * Sistema de progreso con XP y niveles
 */

import type { PlayerProgress, Achievement, AchievementTier } from '../types';

const STORAGE_KEY = 'keyboard-trainer-progress';
const ACHIEVEMENTS_KEY = 'keyboard-trainer-achievements';

/** XP necesario por nivel (fórmula: base * nivel ^ exponent) */
const XP_BASE = 100;
const XP_EXPONENT = 1.5;

/** Calcular XP necesario para subir de nivel */
export function getXpForLevel(level: number): number {
  return Math.floor(XP_BASE * Math.pow(level, XP_EXPONENT));
}

/** Obtener progreso inicial */
export function getInitialProgress(): PlayerProgress {
  return {
    level: 1,
    xp: 0,
    totalXp: 0,
    xpToNextLevel: getXpForLevel(2),
    wordsTyped: 0,
    totalPlayTime: 0,
    bestStreak: 0,
    bestWpm: 0,
    totalErrors: 0,
    accuracy: 100,
    gamesPlayed: 0,
    lastPlayed: new Date().toISOString(),
    preferredKeyboard: 'corne',
  };
}

/** Cargar progreso del localStorage */
export function loadProgress(): PlayerProgress {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      return { ...getInitialProgress(), ...JSON.parse(saved) };
    }
  } catch {
    // Error al cargar, usar inicial
  }
  return getInitialProgress();
}

/** Guardar progreso */
export function saveProgress(progress: PlayerProgress): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch {
    // Error al guardar
  }
}

/** Agregar XP y verificar subida de nivel */
export function addXp(progress: PlayerProgress, amount: number): { 
  newProgress: PlayerProgress; 
  leveledUp: boolean; 
  levelsGained: number 
} {
  const newProgress = { ...progress };
  newProgress.xp += amount;
  newProgress.totalXp += amount;
  
  let leveledUp = false;
  let levelsGained = 0;
  
  while (newProgress.xp >= newProgress.xpToNextLevel) {
    newProgress.xp -= newProgress.xpToNextLevel;
    newProgress.level++;
    newProgress.xpToNextLevel = getXpForLevel(newProgress.level + 1);
    leveledUp = true;
    levelsGained++;
  }
  
  saveProgress(newProgress);
  return { newProgress, leveledUp, levelsGained };
}

/** Calcular XP ganado por palabra */
export function calculateWordXp(word: string, wpm: number, accuracy: number, combo: number): number {
  const baseXp = word.length * 2;
  const wpmBonus = Math.max(0, (wpm - 30) * 0.5);
  const accuracyBonus = accuracy >= 95 ? 5 : accuracy >= 90 ? 3 : accuracy >= 80 ? 1 : 0;
  const comboBonus = Math.floor(combo / 10) * 2;
  
  return Math.floor(baseXp + wpmBonus + accuracyBonus + comboBonus);
}

/** Actualizar estadísticas después de una partida */
export function updateGameStats(
  progress: PlayerProgress,
  stats: {
    wordsTyped: number;
    playTime: number;
    streak: number;
    wpm: number;
    errors: number;
    keystrokes: number;
  }
): PlayerProgress {
  const newProgress = { ...progress };
  
  newProgress.wordsTyped += stats.wordsTyped;
  newProgress.totalPlayTime += stats.playTime;
  newProgress.bestStreak = Math.max(newProgress.bestStreak, stats.streak);
  newProgress.bestWpm = Math.max(newProgress.bestWpm, stats.wpm);
  newProgress.totalErrors += stats.errors;
  newProgress.gamesPlayed++;
  newProgress.lastPlayed = new Date().toISOString();
  
  // Recalcular precisión general
  const totalKeystrokes = newProgress.wordsTyped * 5; // aproximado
  newProgress.accuracy = Math.round(
    ((totalKeystrokes - newProgress.totalErrors) / totalKeystrokes) * 100
  );
  
  saveProgress(newProgress);
  return newProgress;
}

// ==================== SISTEMA DE LOGROS ====================

/** Definición de todos los logros */
export const ACHIEVEMENTS_DEFINITION: Omit<Achievement, 'current' | 'unlocked' | 'unlockedAt'>[] = [
  // Logros de racha (streak)
  { id: 'streak_10', name: 'Calentamiento', description: 'Alcanza una racha de 10', icon: '🔥', tier: 'bronze', requirement: 10 },
  { id: 'streak_25', name: 'En Racha', description: 'Alcanza una racha de 25', icon: '🔥', tier: 'silver', requirement: 25 },
  { id: 'streak_50', name: 'Imparable', description: 'Alcanza una racha de 50', icon: '🔥', tier: 'gold', requirement: 50 },
  { id: 'streak_100', name: 'Leyenda', description: 'Alcanza una racha de 100', icon: '🔥', tier: 'platinum', requirement: 100 },
  { id: 'streak_200', name: 'Dios del Teclado', description: 'Alcanza una racha de 200', icon: '🔥', tier: 'diamond', requirement: 200 },
  
  // Logros de velocidad (WPM)
  { id: 'wpm_30', name: 'Principiante Veloz', description: 'Alcanza 30 PPM', icon: '⚡', tier: 'bronze', requirement: 30 },
  { id: 'wpm_50', name: 'Velocista', description: 'Alcanza 50 PPM', icon: '⚡', tier: 'silver', requirement: 50 },
  { id: 'wpm_70', name: 'Relámpago', description: 'Alcanza 70 PPM', icon: '⚡', tier: 'gold', requirement: 70 },
  { id: 'wpm_100', name: 'Sónico', description: 'Alcanza 100 PPM', icon: '⚡', tier: 'platinum', requirement: 100 },
  { id: 'wpm_120', name: 'Speed Demon', description: 'Alcanza 120 PPM', icon: '⚡', tier: 'diamond', requirement: 120 },
  
  // Logros de precisión
  { id: 'accuracy_95', name: 'Preciso', description: '95% de precisión en una partida', icon: '🎯', tier: 'bronze', requirement: 95 },
  { id: 'accuracy_98', name: 'Francotirador', description: '98% de precisión en una partida', icon: '🎯', tier: 'silver', requirement: 98 },
  { id: 'accuracy_100', name: 'Perfección', description: '100% de precisión en una partida', icon: '🎯', tier: 'gold', requirement: 100 },
  
  // Logros de volumen
  { id: 'words_100', name: 'Primeros Pasos', description: 'Escribe 100 palabras', icon: '📝', tier: 'bronze', requirement: 100 },
  { id: 'words_500', name: 'Escritor', description: 'Escribe 500 palabras', icon: '📝', tier: 'silver', requirement: 500 },
  { id: 'words_1000', name: 'Novelista', description: 'Escribe 1000 palabras', icon: '📝', tier: 'gold', requirement: 1000 },
  { id: 'words_5000', name: 'Maestro de la Palabra', description: 'Escribe 5000 palabras', icon: '📝', tier: 'platinum', requirement: 5000 },
  { id: 'words_10000', name: 'Biblioteca Humana', description: 'Escribe 10000 palabras', icon: '📝', tier: 'diamond', requirement: 10000 },
  
  // Logros especiales
  { id: 'level_5', name: 'Aprendiz', description: 'Alcanza nivel 5', icon: '⭐', tier: 'bronze', requirement: 5 },
  { id: 'level_10', name: 'Experto', description: 'Alcanza nivel 10', icon: '⭐', tier: 'silver', requirement: 10 },
  { id: 'level_25', name: 'Veterano', description: 'Alcanza nivel 25', icon: '⭐', tier: 'gold', requirement: 25 },
  { id: 'level_50', name: 'Élite', description: 'Alcanza nivel 50', icon: '⭐', tier: 'platinum', requirement: 50 },
  { id: 'combo_50', name: 'Combo Breaker', description: 'Combo x50', icon: '💥', tier: 'gold', requirement: 50 },
  { id: 'combo_100', name: 'Ultra Combo', description: 'Combo x100', icon: '💥', tier: 'platinum', requirement: 100 },
  { id: 'no_errors', name: 'Sin Error', description: 'Completa 10 palabras sin errores', icon: '✨', tier: 'silver', requirement: 10 },
];

/** Cargar logros del localStorage */
export function loadAchievements(): Achievement[] {
  try {
    const saved = localStorage.getItem(ACHIEVEMENTS_KEY);
    if (saved) {
      return JSON.parse(saved);
    }
  } catch {
    // Error al cargar
  }
  return ACHIEVEMENTS_DEFINITION.map(a => ({ ...a, current: 0, unlocked: false }));
}

/** Guardar logros */
export function saveAchievements(achievements: Achievement[]): void {
  try {
    localStorage.setItem(ACHIEVEMENTS_KEY, JSON.stringify(achievements));
  } catch {
    // Error al guardar
  }
}

/** Verificar y actualizar logros */
export function checkAchievements(
  achievements: Achievement[],
  stats: {
    streak?: number;
    wpm?: number;
    accuracy?: number;
    wordsTyped?: number;
    level?: number;
    combo?: number;
    wordsWithoutErrors?: number;
  }
): { updated: Achievement[]; newlyUnlocked: Achievement[] } {
  const updated = [...achievements];
  const newlyUnlocked: Achievement[] = [];
  
  updated.forEach(achievement => {
    if (achievement.unlocked) return;
    
    let shouldUnlock = false;
    
    switch (achievement.id.split('_')[0]) {
      case 'streak':
        if (stats.streak && stats.streak >= achievement.requirement) {
          shouldUnlock = true;
        }
        break;
      case 'wpm':
        if (stats.wpm && stats.wpm >= achievement.requirement) {
          shouldUnlock = true;
        }
        break;
      case 'accuracy':
        if (stats.accuracy && stats.accuracy >= achievement.requirement) {
          shouldUnlock = true;
        }
        break;
      case 'words':
        if (stats.wordsTyped && stats.wordsTyped >= achievement.requirement) {
          shouldUnlock = true;
        }
        break;
      case 'level':
        if (stats.level && stats.level >= achievement.requirement) {
          shouldUnlock = true;
        }
        break;
      case 'combo':
        if (stats.combo && stats.combo >= achievement.requirement) {
          shouldUnlock = true;
        }
        break;
      case 'no':
        if (stats.wordsWithoutErrors && stats.wordsWithoutErrors >= achievement.requirement) {
          shouldUnlock = true;
        }
        break;
    }
    
    if (shouldUnlock) {
      achievement.unlocked = true;
      achievement.unlockedAt = new Date().toISOString();
      achievement.current = achievement.requirement;
      newlyUnlocked.push(achievement);
    }
  });
  
  saveAchievements(updated);
  return { updated, newlyUnlocked };
}

/** Obtener color según tier */
export function getTierColor(tier: AchievementTier): string {
  const colors: Record<AchievementTier, string> = {
    bronze: '#cd7f32',
    silver: '#c0c0c0',
    gold: '#ffd700',
    platinum: '#e5e4e2',
    diamond: '#b9f2ff',
  };
  return colors[tier];
}

/** Resetear todo el progreso */
export function resetAllProgress(): void {
  localStorage.removeItem(STORAGE_KEY);
  localStorage.removeItem(ACHIEVEMENTS_KEY);
}
