/**
 * Componente de selector de modo de juego
 */

import { GAME_MODES } from '../utils/gameModes';
import type { GameMode } from '../types';

interface ModeSelectorProps {
  selectedMode: GameMode;
  onSelectMode: (mode: GameMode) => void;
  disabled?: boolean;
}

export function ModeSelector({ selectedMode, onSelectMode, disabled = false }: ModeSelectorProps) {
  return (
    <div className="mode-selector" style={{ maxWidth: 600, margin: '0 auto 30px' }}>
      {GAME_MODES.map((mode) => (
        <div
          key={mode.id}
          className={`mode-card ${selectedMode === mode.id ? 'selected' : ''}`}
          onClick={() => !disabled && onSelectMode(mode.id)}
          style={{
            cursor: disabled ? 'not-allowed' : 'pointer',
            opacity: disabled ? 0.6 : 1,
            borderColor: selectedMode === mode.id ? mode.color : undefined,
            boxShadow: selectedMode === mode.id ? `0 0 20px ${mode.color}40` : undefined,
          }}
        >
          <div className="mode-icon">{mode.icon}</div>
          <div className="mode-name" style={{ color: selectedMode === mode.id ? mode.color : undefined }}>
            {mode.name}
          </div>
          <div className="mode-description">{mode.description}</div>
        </div>
      ))}
    </div>
  );
}
