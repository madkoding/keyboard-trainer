/**
 * Definiciones completas de layouts para diferentes teclados split
 */

import type { HandLayout, FingerMap, KeyboardType, KeyboardInfo } from '../types';

// ==================== CORNE (CRKBD) ====================
// Layout completo: 3x5 + 3 thumb keys por mano
// Total: 42 teclas (21 por mano)

export const CORNE_LEFT = [
  // Fila superior (números/QWERTY)
  ['KC_Q', 'KC_W', 'KC_E', 'KC_R', 'KC_T'],
  // Fila home
  ['KC_A', 'KC_S', 'KC_D', 'KC_F', 'KC_G'],
  // Fila inferior
  ['KC_Z', 'KC_X', 'KC_C', 'KC_V', 'KC_B'],
  // Thumb cluster (3 teclas)
  ['KC_LCTL', 'KC_LALT', 'KC_LGUI'],
];

export const CORNE_RIGHT = [
  // Fila superior
  ['KC_Y', 'KC_U', 'KC_I', 'KC_O', 'KC_P'],
  // Fila home
  ['KC_H', 'KC_J', 'KC_K', 'KC_L', 'KC_SCLN'],
  // Fila inferior
  ['KC_N', 'KC_M', 'KC_COMM', 'KC_DOT', 'KC_SLSH'],
  // Thumb cluster
  ['KC_RGUI', 'KC_RALT', 'KC_RCTL'],
];

// Mapa de dedos para Corne
export const CORNE_FINGER_MAP_LEFT: FingerMap['left'] = [
  [0, 1, 2, 3, 4],      // QWERT
  [0, 1, 2, 3, 4],      // ASDFG
  [0, 1, 2, 3, 4],      // ZXCVB
  [4, 4, 4],            // Thumb cluster (todos pulgar)
];

export const CORNE_FINGER_MAP_RIGHT: FingerMap['right'] = [
  [4, 3, 2, 1, 0],      // YUIOP
  [4, 3, 2, 1, 0],      // HJKL;
  [4, 3, 2, 1, 0],      // NM,./
  [4, 4, 4],            // Thumb cluster
];

// ==================== SOFLE ====================
// Layout completo: 3x5 + 4 teclas (con encoder) por mano
// Total: 46 teclas (23 por mano)
// Incluye encoder en la posición superior derecha (mano derecha)

export const SOFLE_LEFT = [
  // Fila superior
  ['KC_Q', 'KC_W', 'KC_E', 'KC_R', 'KC_T'],
  // Fila home
  ['KC_A', 'KC_S', 'KC_D', 'KC_F', 'KC_G'],
  // Fila inferior
  ['KC_Z', 'KC_X', 'KC_C', 'KC_V', 'KC_B'],
  // Thumb cluster (4 teclas)
  ['KC_LSFT', 'KC_LCTL', 'KC_LALT', 'KC_LGUI'],
];

export const SOFLE_RIGHT = [
  // Fila superior (con espacio para encoder)
  ['KC_Y', 'KC_U', 'KC_I', 'KC_O', 'KC_P'],
  // Fila home
  ['KC_H', 'KC_J', 'KC_K', 'KC_L', 'KC_SCLN'],
  // Fila inferior
  ['KC_N', 'KC_M', 'KC_COMM', 'KC_DOT', 'KC_SLSH'],
  // Thumb cluster (4 teclas)
  ['KC_RGUI', 'KC_RALT', 'KC_RCTL', 'KC_RSFT'],
];

// Mapa de dedos para Sofle
export const SOFLE_FINGER_MAP_LEFT: FingerMap['left'] = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [4, 4, 4, 4],         // 4 thumb keys
];

export const SOFLE_FINGER_MAP_RIGHT: FingerMap['right'] = [
  [4, 3, 2, 1, 0],
  [4, 3, 2, 1, 0],
  [4, 3, 2, 1, 0],
  [4, 4, 4, 4],         // 4 thumb keys
];

// ==================== LILY58 ====================
// Layout completo: 4x6 por mano (más teclas que Corne)
// Total: 58 teclas incluyendo thumbs (29 por mano)
// 4 filas x 6 columnas + 1 thumb cluster

export const LILY58_LEFT = [
  // Fila superior (números y símbolos)
  ['KC_ESC', 'KC_1', 'KC_2', 'KC_3', 'KC_4', 'KC_5'],
  // Fila QWERTY
  ['KC_TAB', 'KC_Q', 'KC_W', 'KC_E', 'KC_R', 'KC_T'],
  // Fila home (con mods)
  ['KC_LSFT', 'KC_A', 'KC_S', 'KC_D', 'KC_F', 'KC_G'],
  // Fila inferior
  ['KC_LCTL', 'KC_Z', 'KC_X', 'KC_C', 'KC_V', 'KC_B'],
  // Thumb cluster (3 teclas)
  ['KC_LGUI', 'KC_LALT', 'KC_SPC'],
];

export const LILY58_RIGHT = [
  // Fila superior
  ['KC_6', 'KC_7', 'KC_8', 'KC_9', 'KC_0', 'KC_BSPC'],
  // Fila QWERTY
  ['KC_Y', 'KC_U', 'KC_I', 'KC_O', 'KC_P', 'KC_MINS'],
  // Fila home
  ['KC_H', 'KC_J', 'KC_K', 'KC_L', 'KC_SCLN', 'KC_QUOT'],
  // Fila inferior
  ['KC_N', 'KC_M', 'KC_COMM', 'KC_DOT', 'KC_SLSH', 'KC_RSFT'],
  // Thumb cluster
  ['KC_SPC', 'KC_RALT', 'KC_RGUI'],
];

// Mapa de dedos para Lily58 (más complejo por las 6 columnas)
export const LILY58_FINGER_MAP_LEFT: FingerMap['left'] = [
  [0, 0, 1, 2, 3, 4],   // ESC 1 2 3 4 5
  [0, 0, 1, 2, 3, 4],   // TAB Q W E R T
  [0, 0, 1, 2, 3, 4],   // LSFT A S D F G
  [0, 0, 1, 2, 3, 4],   // LCTL Z X C V B
  [4, 4, 4],            // Thumb cluster
];

export const LILY58_FINGER_MAP_RIGHT: FingerMap['right'] = [
  [4, 3, 2, 1, 0, 0],   // 6 7 8 9 0 BSPC
  [4, 3, 2, 1, 0, 0],   // Y U I O P MINS
  [4, 3, 2, 1, 0, 0],   // H J K L ; QUOT
  [4, 3, 2, 1, 0, 0],   // N M , . / RSFT
  [4, 4, 4],            // Thumb cluster
];

// ==================== FERRIS (SQUEEZE/Compact) ====================
// Layout minimalista: 3x5 sin thumb cluster dedicado
// Total: 34 teclas (17 por mano)
// Usa combos y capas en lugar de muchas teclas físicas

export const FERRIS_LEFT = [
  // Fila superior
  ['KC_Q', 'KC_W', 'KC_E', 'KC_R', 'KC_T'],
  // Fila home (con mod-tap en las teclas de los extremos)
  ['KC_A', 'KC_S', 'KC_D', 'KC_F', 'KC_G'],
  // Fila inferior (con mod-tap)
  ['KC_Z', 'KC_X', 'KC_C', 'KC_V', 'KC_B'],
  // Bottom row (thumb keys integradas)
  ['KC_LSFT', 'KC_LCTL', 'KC_LALT'],
];

export const FERRIS_RIGHT = [
  // Fila superior
  ['KC_Y', 'KC_U', 'KC_I', 'KC_O', 'KC_P'],
  // Fila home
  ['KC_H', 'KC_J', 'KC_K', 'KC_L', 'KC_SCLN'],
  // Fila inferior
  ['KC_N', 'KC_M', 'KC_COMM', 'KC_DOT', 'KC_SLSH'],
  // Bottom row
  ['KC_RALT', 'KC_RCTL', 'KC_RSFT'],
];

// Mapa de dedos para Ferris
export const FERRIS_FINGER_MAP_LEFT: FingerMap['left'] = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [4, 4, 4],            // Bottom thumb row
];

export const FERRIS_FINGER_MAP_RIGHT: FingerMap['right'] = [
  [4, 3, 2, 1, 0],
  [4, 3, 2, 1, 0],
  [4, 3, 2, 1, 0],
  [4, 4, 4],            // Bottom thumb row
];

// ==================== KYRIA ====================
// Layout: 3x5 + 5 thumb keys por mano
// Total: 50 teclas (25 por mano)
// Thumb cluster muy completo (5 teclas)

export const KYRIA_LEFT = [
  // Fila superior
  ['KC_Q', 'KC_W', 'KC_E', 'KC_R', 'KC_T'],
  // Fila home
  ['KC_A', 'KC_S', 'KC_D', 'F', 'KC_G'],
  // Fila inferior
  ['KC_Z', 'KC_X', 'KC_C', 'KC_V', 'KC_B'],
  // Thumb cluster (5 teclas)
  ['KC_LSFT', 'KC_LCTL', 'KC_LALT', 'KC_LGUI', 'KC_ESC'],
];

export const KYRIA_RIGHT = [
  // Fila superior
  ['KC_Y', 'KC_U', 'KC_I', 'KC_O', 'KC_P'],
  // Fila home
  ['KC_H', 'KC_J', 'KC_K', 'KC_L', 'KC_SCLN'],
  // Fila inferior
  ['KC_N', 'KC_M', 'KC_COMM', 'KC_DOT', 'KC_SLSH'],
  // Thumb cluster (5 teclas)
  ['KC_ENT', 'KC_RGUI', 'KC_RALT', 'KC_RCTL', 'KC_RSFT'],
];

// Mapa de dedos para Kyria
export const KYRIA_FINGER_MAP_LEFT: FingerMap['left'] = [
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [0, 1, 2, 3, 4],
  [4, 4, 4, 4, 4],      // 5 thumb keys
];

export const KYRIA_FINGER_MAP_RIGHT: FingerMap['right'] = [
  [4, 3, 2, 1, 0],
  [4, 3, 2, 1, 0],
  [4, 3, 2, 1, 0],
  [4, 4, 4, 4, 4],      // 5 thumb keys
];

// ==================== INFO DE TECLADOS ====================
export const FINGER_NAMES: Record<number, string> = {
  0: 'Meñique',
  1: 'Anular',
  2: 'Medio',
  3: 'Índice',
  4: 'Pulgar',
};

export const FINGER_COLORS: Record<number, string> = {
  0: '#ff6b6b',  // Rojo - Meñique
  1: '#ffa500',  // Naranja - Anular
  2: '#00d9ff',  // Cyan - Medio
  3: '#4ade80',  // Verde - Índice
  4: '#9b59b6',  // Morado - Pulgar
};

export const KEYBOARDS_INFO: KeyboardInfo[] = [
  {
    id: 'corne',
    name: 'Corne (CRKBD)',
    description: '3x5 + 3 thumb keys - El clásico 42 keys',
    columns: 6,
    rows: 4,
  },
  {
    id: 'sofle',
    name: 'Sofle',
    description: '3x5 + 4 thumb keys - Con encoder OLED',
    columns: 6,
    rows: 4,
    hasEncoder: true,
  },
  {
    id: 'lily58',
    name: 'Lily58',
    description: '4x6 + 3 thumb keys - 58 teclas total',
    columns: 7,
    rows: 5,
  },
  {
    id: 'ferris',
    name: 'Ferris',
    description: '3x5 minimalista - Solo 34 teclas',
    columns: 6,
    rows: 4,
  },
  {
    id: 'kyria',
    name: 'Kyria',
    description: '3x5 + 5 thumb keys - Thumb cluster completo',
    columns: 6,
    rows: 4,
  },
  {
    id: 'custom',
    name: 'Custom',
    description: 'Configuración personalizada',
    columns: 6,
    rows: 4,
  },
];

// ==================== FUNCIONES DE CREACIÓN ====================

/** Obtener layout raw por tipo de teclado */
export function getKeyboardLayout(type: KeyboardType): { left: string[][]; right: string[][] } {
  switch (type) {
    case 'sofle':
      return { left: SOFLE_LEFT, right: SOFLE_RIGHT };
    case 'lily58':
      return { left: LILY58_LEFT, right: LILY58_RIGHT };
    case 'ferris':
      return { left: FERRIS_LEFT, right: FERRIS_RIGHT };
    case 'kyria':
      return { left: KYRIA_LEFT, right: KYRIA_RIGHT };
    case 'corne':
    case 'custom':
    default:
      return { left: CORNE_LEFT, right: CORNE_RIGHT };
  }
}

/** Obtener mapa de dedos por tipo de teclado */
export function getFingerMap(type: KeyboardType): FingerMap {
  switch (type) {
    case 'sofle':
      return { left: SOFLE_FINGER_MAP_LEFT, right: SOFLE_FINGER_MAP_RIGHT };
    case 'lily58':
      return { left: LILY58_FINGER_MAP_LEFT, right: LILY58_FINGER_MAP_RIGHT };
    case 'ferris':
      return { left: FERRIS_FINGER_MAP_LEFT, right: FERRIS_FINGER_MAP_RIGHT };
    case 'kyria':
      return { left: KYRIA_FINGER_MAP_LEFT, right: KYRIA_FINGER_MAP_RIGHT };
    case 'corne':
    case 'custom':
    default:
      return { left: CORNE_FINGER_MAP_LEFT, right: CORNE_FINGER_MAP_RIGHT };
  }
}

/** Crear layout visual para las manos (para componentes) */
export function createHandLayout(type: KeyboardType = 'corne'): HandLayout {
  const layout = getKeyboardLayout(type);
  return {
    left: layout.left.map(row => row.map(code => ({ 
      code, 
      label: code.replace('KC_', '').replace('LSFT', 'SHIFT').replace('RSFT', 'SHIFT').replace('LCTL', 'CTRL').replace('RCTL', 'CTRL').replace('LALT', 'ALT').replace('RALT', 'ALT').replace('LGUI', 'WIN').replace('RGUX', 'WIN').replace('SCLN', ';').replace('COMM', ',').replace('DOT', '.').replace('SLSH', '/').replace('MINS', '-').replace('QUOT', "'").replace('BSPC', '⌫').replace('ENT', '↵').replace('ESC', 'ESC').replace('TAB', 'TAB').replace('SPC', 'SPACE')
    }))),
    right: layout.right.map(row => row.map(code => ({ 
      code, 
      label: code.replace('KC_', '').replace('LSFT', 'SHIFT').replace('RSFT', 'SHIFT').replace('LCTL', 'CTRL').replace('RCTL', 'CTRL').replace('LALT', 'ALT').replace('RALT', 'ALT').replace('LGUI', 'WIN').replace('RGUX', 'WIN').replace('SCLN', ';').replace('COMM', ',').replace('DOT', '.').replace('SLSH', '/').replace('MINS', '-').replace('QUOT', "'").replace('BSPC', '⌫').replace('ENT', '↵').replace('ESC', 'ESC').replace('TAB', 'TAB').replace('SPC', 'SPACE')
    }))),
  };
}

/** Crear mapa de dedos para las manos */
export function createFingerMap(type: KeyboardType = 'corne'): FingerMap {
  return getFingerMap(type);
}

/** Obtener info de teclado */
export function getKeyboardInfo(type: KeyboardType): KeyboardInfo | undefined {
  return KEYBOARDS_INFO.find(k => k.id === type);
}

/** Obtener todas las teclas de un teclado (para mapeo de caracteres) */
export function getAllKeys(type: KeyboardType = 'corne'): string[] {
  const layout = getKeyboardLayout(type);
  const allKeys: string[] = [];
  layout.left.forEach(row => allKeys.push(...row));
  layout.right.forEach(row => allKeys.push(...row));
  return allKeys;
}
