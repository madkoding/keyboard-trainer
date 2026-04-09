export const PRACTICE_WORDS = [
  'el', 'la', 'los', 'las', 'un', 'una', 'de', 'del', 'al', 'por', 'con', 'en',
  'que', 'es', 'son', 'esta', 'este', 'ese', 'esa', 'esto', 'como', 'para',
  'hacer', 'ir', 'ser', 'tener', 'poder', 'quiere', 'saber', 'decir', 'ver',
  'casa', 'cuatro', 'cinco', 'nuevo', 'bueno', 'grande', 'mejor',
  'ayer', 'hoy', 'ahora', 'siempre', 'nunca', 'aqui', 'alli',
  'teclado', 'corne', 'split', 'mecanico', 'keycaps', 'qmk',
  'verde', 'rojo', 'azul', 'blanco', 'negro', 'alto', 'bajo',
  'todo', 'cada', 'otro', 'otra', 'mano', 'ojo', 'pie', 'cabeza',
  'agua', 'fuego', 'tierra', 'aire', 'sol', 'luna', 'mar', 'rio',
  'si', 'no', 'tu', 'yo', 'mas', 'muy', 'tan',
  'hola', 'gracias', 'bien',
  ' ', '.', ','
];

export function getRandomWord(): string {
  return PRACTICE_WORDS[Math.floor(Math.random() * PRACTICE_WORDS.length)];
}

export function charToKeyCode(char: string): string | null {
  const map: Record<string, string> = {
    'q': 'KC_Q', 'w': 'KC_W', 'e': 'KC_E', 'r': 'KC_R', 't': 'KC_T',
    'y': 'KC_Y', 'u': 'KC_U', 'i': 'KC_I', 'o': 'KC_O', 'p': 'KC_P',
    'a': 'KC_A', 's': 'KC_S', 'd': 'KC_D', 'f': 'KC_F', 'g': 'KC_G',
    'h': 'KC_H', 'j': 'KC_J', 'k': 'KC_K', 'l': 'KC_L',
    'z': 'KC_Z', 'x': 'KC_X', 'c': 'KC_C', 'v': 'KC_V', 'b': 'KC_B',
    'n': 'KC_N', 'm': 'KC_M', ',': 'KC_COMM', '.': 'KC_DOT', ';': 'KC_SCLN',
    ' ': 'KC_SPC'
  };
  return map[char.toLowerCase()] || null;
}
