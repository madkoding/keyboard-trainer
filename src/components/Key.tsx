/**
 * Componente de tecla con estilo cyberpunk 3D compacto
 * Estados visuales:
 * - Normal: color del dedo
 * - isPressed (correcta): brillo del color del dedo
 * - isWrongPressed (error presionado): borde rojo + brillo rojo
 * - isExpected (deberías presionar): borde cyan + brillo cyan pulsante
 */

import type { Finger } from '../types';
import { FINGER_COLORS } from '../utils/layout';

interface KeyProps {
  label: string;
  finger: Finger;
  isPressed?: boolean;
  isWrongPressed?: boolean;
  isExpected?: boolean;
  onClick?: () => void;
}

export function Key({ label, finger, isPressed = false, isWrongPressed = false, isExpected = false, onClick }: KeyProps) {
  const fingerColor = FINGER_COLORS[finger];

  // Determinar estilos basados en estado
  let borderColor = 'rgba(255, 255, 255, 0.1)';
  let boxShadow = '0 3px 0 #0d0d12, 0 4px 8px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.1)';
  let textColor = fingerColor;
  let textShadow = 'none';
  let transform = 'translateY(0)';
  let animation = 'none';

  if (isWrongPressed) {
    // Tecla que presionaste mal (rojo)
    borderColor = '#ff3333';
    boxShadow = '0 0 0 #0d0d12, 0 0 15px #ff3333, inset 0 2px 4px rgba(0, 0, 0, 0.5)';
    textColor = '#fff';
    textShadow = '0 0 8px #ff3333';
    transform = 'translateY(3px)';
    animation = 'shake 0.3s ease';
  } else if (isExpected) {
    // Tecla que deberías presionar (cyan pulsante)
    borderColor = '#00f0ff';
    boxShadow = '0 0 0 #0d0d12, 0 0 20px #00f0ff, inset 0 2px 4px rgba(0, 0, 0, 0.5)';
    textColor = '#fff';
    textShadow = '0 0 10px #00f0ff';
    transform = 'translateY(2px)';
    animation = 'pulse-glow 1s ease infinite';
  } else if (isPressed) {
    // Tecla presionada correctamente
    borderColor = fingerColor;
    boxShadow = `0 0 0 #0d0d12, 0 0 15px ${fingerColor}50, inset 0 2px 4px rgba(0, 0, 0, 0.5)`;
    textColor = '#fff';
    textShadow = `0 0 8px ${fingerColor}`;
    transform = 'translateY(3px)';
  }

  return (
    <button
      onClick={onClick}
      className="key-3d"
      style={{
        color: textColor,
        borderColor,
        boxShadow,
        textShadow,
        transform,
        animation,
      }}
    >
      {label}
    </button>
  );
}
