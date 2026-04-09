/**
 * Hook para manejar el sistema de progreso
 */

import { useState, useCallback, useEffect } from 'react';
import type { PlayerProgress, Achievement } from '../types';
import {
  loadProgress,
  saveProgress,
  loadAchievements,
  checkAchievements,
  addXp,
  updateGameStats,
  calculateWordXp,
  getXpForLevel,
  ACHIEVEMENTS_DEFINITION,
} from '../utils/progress';
import { playSound } from '../utils/audio';

interface UseProgressReturn {
  progress: PlayerProgress;
  achievements: Achievement[];
  addExperience: (word: string, wpm: number, accuracy: number, combo: number) => { leveledUp: boolean; levelsGained: number };
  updateStats: (stats: {
    wordsTyped: number;
    playTime: number;
    streak: number;
    wpm: number;
    errors: number;
    keystrokes: number;
  }) => PlayerProgress;
  checkAndUnlockAchievements: (stats: {
    streak?: number;
    wpm?: number;
    accuracy?: number;
    wordsTyped?: number;
    level?: number;
    combo?: number;
    wordsWithoutErrors?: number;
  }) => Achievement[];
  getProgressPercentage: () => number;
  updatePreferredKeyboard: (keyboard: string) => void;
  resetProgress: () => void;
}

export function useProgress(): UseProgressReturn {
  const [progress, setProgress] = useState<PlayerProgress>(loadProgress);
  const [achievements, setAchievements] = useState<Achievement[]>(loadAchievements);

  // Guardar en localStorage cuando cambie
  useEffect(() => {
    saveProgress(progress);
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('keyboard-trainer-achievements', JSON.stringify(achievements));
  }, [achievements]);

  /** Agregar XP y manejar subida de nivel */
  const addExperience = useCallback((
    word: string,
    wpm: number,
    accuracy: number,
    combo: number
  ): { leveledUp: boolean; levelsGained: number } => {
    const xpToAdd = calculateWordXp(word, wpm, accuracy, combo);
    const result = addXp(progress, xpToAdd);

    setProgress(result.newProgress);

    if (result.leveledUp) {
      playSound('levelUp');
    }

    return { leveledUp: result.leveledUp, levelsGained: result.levelsGained };
  }, [progress]);

  /** Actualizar estadísticas del juego */
  const updateStats = useCallback((stats: {
    wordsTyped: number;
    playTime: number;
    streak: number;
    wpm: number;
    errors: number;
    keystrokes: number;
  }): PlayerProgress => {
    const newProgress = updateGameStats(progress, stats);
    setProgress(newProgress);
    return newProgress;
  }, [progress]);

  /** Verificar y desbloquear logros */
  const checkAndUnlockAchievements = useCallback((stats: {
    streak?: number;
    wpm?: number;
    accuracy?: number;
    wordsTyped?: number;
    level?: number;
    combo?: number;
    wordsWithoutErrors?: number;
  }): Achievement[] => {
    const { updated, newlyUnlocked } = checkAchievements(achievements, {
      ...stats,
      level: progress.level,
      wordsTyped: progress.wordsTyped,
    });

    setAchievements(updated);

    if (newlyUnlocked.length > 0) {
      playSound('achievement');
    }

    return newlyUnlocked;
  }, [achievements, progress]);

  /** Obtener porcentaje de progreso al siguiente nivel */
  const getProgressPercentage = useCallback((): number => {
    return (progress.xp / progress.xpToNextLevel) * 100;
  }, [progress]);

  /** Actualizar preferencia de teclado */
  const updatePreferredKeyboard = useCallback((keyboard: string) => {
    const newProgress = { ...progress, preferredKeyboard: keyboard as import('../types').KeyboardType };
    setProgress(newProgress);
    saveProgress(newProgress);
  }, [progress]);

  /** Resetear todo el progreso */
  const resetProgress = useCallback(() => {
    const initial: PlayerProgress = {
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
    setProgress(initial);
    setAchievements(ACHIEVEMENTS_DEFINITION.map(a => ({ ...a, current: 0, unlocked: false })));
    localStorage.removeItem('keyboard-trainer-progress');
    localStorage.removeItem('keyboard-trainer-achievements');
  }, []);

  return {
    progress,
    achievements,
    addExperience,
    updateStats,
    checkAndUnlockAchievements,
    getProgressPercentage,
    updatePreferredKeyboard,
    resetProgress,
  };
}
