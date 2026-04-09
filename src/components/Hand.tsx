/**
 * Componente de mano con estilo cyberpunk
 * Soporta layouts de diferentes teclados (Corne, Sofle, Lily58, etc.)
 */

import type { Finger, KeyData } from '../types';
import { Key } from './Key';

interface HandProps {
  keys: KeyData[][];
  fingerMap: Finger[][];
  isRight?: boolean;
  pressedKeys?: Set<string>;
  wrongPressedKeys?: Set<string>;
  expectedKeys?: Set<string>;
  onKeyClick?: (keyCode: string) => void;
}

const FINGER_HINTS: Record<number, string> = {
  0: 'MEÑ',
  1: 'ANU',
  2: 'MED',
  3: 'IND',
  4: 'PUL',
};

export function Hand({ 
  keys, 
  fingerMap, 
  isRight = false, 
  pressedKeys = new Set(),
  wrongPressedKeys = new Set(),
  expectedKeys = new Set(),
  onKeyClick 
}: HandProps) {
  // Separar filas principales de thumb cluster (última fila)
  const mainRows = keys.slice(0, -1);
  const thumbRow = keys[keys.length - 1];
  const mainFingerRows = fingerMap.slice(0, -1);
  const thumbFingerRow = fingerMap[fingerMap.length - 1];

  // Calcular ancho del hint basado en número de teclas en la fila principal
  const maxCols = Math.max(...mainRows.map(row => row.length));
  const hintWidth = maxCols <= 5 ? 38 : 32;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      {/* Título de mano */}
      <div 
        style={{ 
          fontSize: '0.65rem', 
          color: 'rgba(255,255,255,0.4)', 
          textTransform: 'uppercase', 
          letterSpacing: 3, 
          marginBottom: 8,
          fontFamily: 'var(--font-mono)',
          textShadow: '0 0 5px rgba(255,255,255,0.2)',
        }}
      >
        {isRight ? 'MANO DERECHA →' : '← MANO IZQUIERDA'}
      </div>
      
      {/* Hints de dedos para filas principales */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 6, justifyContent: 'center' }}>
        {[0, 1, 2, 3, 4].map(f => (
          <span 
            key={f} 
            className="finger-hint"
            style={{ width: hintWidth, textAlign: 'center' }}
          >
            {FINGER_HINTS[f]}
          </span>
        ))}
      </div>
      
      {/* Filas principales del teclado */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 12 }}>
        {mainRows.map((row, rowIndex) => (
          <div key={rowIndex} style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
            {row.map((key, colIndex) => (
              <Key
                key={`${rowIndex}-${colIndex}`}
                label={key.label}
                finger={mainFingerRows[rowIndex][colIndex]}
                isPressed={pressedKeys.has(key.code)}
                isWrongPressed={wrongPressedKeys.has(key.code)}
                isExpected={expectedKeys.has(key.code)}
                onClick={() => onKeyClick?.(key.code)}
              />
            ))}
          </div>
        ))}
      </div>

      {/* Separador visual */}
      <div 
        style={{
          width: '80%',
          height: 1,
          background: 'linear-gradient(90deg, transparent, rgba(0, 240, 255, 0.3), transparent)',
          marginBottom: 8,
        }}
      />
      
      {/* Thumb cluster */}
      <div style={{ display: 'flex', gap: 6, justifyContent: 'center' }}>
        <span 
          style={{ 
            fontSize: '0.5rem', 
            color: 'rgba(255,255,255,0.3)', 
            marginRight: 8,
            alignSelf: 'center',
          }}
        >
          THUMB
        </span>
        {thumbRow.map((key, colIndex) => (
          <Key
            key={`thumb-${colIndex}`}
            label={key.label}
            finger={thumbFingerRow[colIndex]}
            isPressed={pressedKeys.has(key.code)}
            isWrongPressed={wrongPressedKeys.has(key.code)}
            isExpected={expectedKeys.has(key.code)}
            onClick={() => onKeyClick?.(key.code)}
          />
        ))}
      </div>
    </div>
  );
}
