/**
 * Tipos para el sistema de progreso y juego
 */

export type Finger = 0 | 1 | 2 | 3 | 4;
export type KeyCode = string;

/** Tipos de teclados soportados */
export type KeyboardType = 'corne' | 'sofle' | 'lily58' | 'ferris' | 'kyria' | 'custom';

/** Información del teclado */
export interface KeyboardInfo {
  id: KeyboardType;
  name: string;
  description: string;
  columns: number;
  rows: number;
  hasEncoder?: boolean;
}

export interface KeyData {
  code: KeyCode;
  label: string;
}

export interface HandLayout {
  left: KeyData[][];
  right: KeyData[][];
}

export interface FingerMap {
  left: Finger[][];
  right: Finger[][];
}

export interface Stats {
  totalKeystrokes: number;
  totalErrors: number;
  streak: number;
  startTime: number | null;
}

export interface ErrorData {
  [keyCode: string]: number;
}

export interface Suggestion {
  type: 'swap';
  key1: KeyCode;
  key2: KeyCode;
  reason: string;
}

/** Modos de juego disponibles */
export type GameMode = 'practice' | 'timeAttack' | 'survival' | 'zen';

/** Información del modo de juego */
export interface GameModeInfo {
  id: GameMode;
  name: string;
  description: string;
  icon: string;
  color: string;
}

/** Datos de progreso del jugador */
export interface PlayerProgress {
  level: number;
  xp: number;
  totalXp: number;
  xpToNextLevel: number;
  wordsTyped: number;
  totalPlayTime: number; // en segundos
  bestStreak: number;
  bestWpm: number;
  totalErrors: number;
  accuracy: number;
  gamesPlayed: number;
  lastPlayed: string;
  preferredKeyboard?: KeyboardType; // Guardar preferencia
}

/** Tipos de logros */
export type AchievementTier = 'bronze' | 'silver' | 'gold' | 'platinum' | 'diamond';

/** Logro individual */
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  tier: AchievementTier;
  requirement: number;
  current: number;
  unlocked: boolean;
  unlockedAt?: string;
}

/** Categorías de logros */
export type AchievementCategory = 'streak' | 'speed' | 'accuracy' | 'volume' | 'special';

/** Estado de combo actual */
export interface ComboState {
  count: number;
  multiplier: number;
  isActive: boolean;
  lastHitTime: number;
}

/** Partícula visual */
export interface Particle {
  id: string;
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
  color: string;
  size: number;
  type: 'spark' | 'glow' | 'trail' | 'explosion';
}

/** Evento de sonido */
export type SoundType = 'keyPress' | 'keyError' | 'combo' | 'levelUp' | 'achievement' | 'streak' | 'wordComplete' | 'gameOver' | 'click';

/** Configuración de audio */
export interface AudioConfig {
  enabled: boolean;
  volume: number;
}

/** Estado del juego */
export interface GameState {
  mode: GameMode;
  isPlaying: boolean;
  isPaused: boolean;
  score: number;
  timeLeft: number;
  lives: number;
  combo: ComboState;
}
