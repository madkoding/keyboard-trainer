/**
 * Componente de selector de teclado
 */

import type { KeyboardType } from '../types';
import { KEYBOARDS_INFO } from '../utils/layout';

interface KeyboardSelectorProps {
  selectedKeyboard: KeyboardType;
  onSelectKeyboard: (keyboard: KeyboardType) => void;
  disabled?: boolean;
}

export function KeyboardSelector({ selectedKeyboard, onSelectKeyboard, disabled = false }: KeyboardSelectorProps) {
  return (
    <div style={{ marginBottom: 12 }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 8,
          flexWrap: 'wrap',
          padding: '0 10px',
        }}
      >
        <span
          style={{
            fontSize: '0.7rem',
            color: 'rgba(255,255,255,0.5)',
            textTransform: 'uppercase',
            letterSpacing: 1,
          }}
        >
          Teclado:
        </span>

        {KEYBOARDS_INFO.map((keyboard) => (
          <button
            key={keyboard.id}
            onClick={() => !disabled && onSelectKeyboard(keyboard.id)}
            disabled={disabled}
            style={{
              padding: '6px 12px',
              background:
                selectedKeyboard === keyboard.id
                  ? 'linear-gradient(135deg, rgba(0, 240, 255, 0.2), rgba(255, 0, 160, 0.1))'
                  : 'rgba(26, 26, 37, 0.6)',
              border:
                selectedKeyboard === keyboard.id
                  ? '1px solid #00f0ff'
                  : '1px solid rgba(255,255,255,0.1)',
              borderRadius: 6,
              color: selectedKeyboard === keyboard.id ? '#00f0ff' : 'rgba(255,255,255,0.7)',
              fontSize: '0.65rem',
              fontWeight: selectedKeyboard === keyboard.id ? 600 : 400,
              cursor: disabled ? 'not-allowed' : 'pointer',
              opacity: disabled ? 0.5 : 1,
              transition: 'all 0.2s ease',
            }}
            title={keyboard.description}
          >
            {keyboard.name.split(' ')[0]}
          </button>
        ))}
      </div>
    </div>
  );
}
