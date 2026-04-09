/**
 * Componente de estadísticas compacto
 */

import type { PlayerProgress } from '../types';

interface StatsProps {
  wpm: number;
  accuracy: number;
  streak: number;
  combo?: number;
  progress?: PlayerProgress;
}

export function Stats({ wpm, accuracy, streak, combo = 0, progress }: StatsProps) {
  const xpPercentage = progress ? (progress.xp / progress.xpToNextLevel) * 100 : 0;

  return (
    <div className="glass-panel" style={{ padding: '12px 15px', margin: '0 auto 12px', maxWidth: 600 }}>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', gap: 12 }}>
        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: '1.4rem', color: '#00f0ff' }}>{wpm}</div>
          <div className="stat-label">PPM</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{
            fontSize: '1.4rem',
            color: accuracy >= 95 ? '#4ade80' : accuracy >= 80 ? '#ffd700' : '#ff6b6b',
          }}>
            {accuracy}%
          </div>
          <div className="stat-label">Precisión</div>
        </div>

        <div className="stat-card">
          <div className="stat-value" style={{ fontSize: '1.4rem', color: '#ffd700' }}>{streak}</div>
          <div className="stat-label">Racha</div>
        </div>

        {combo > 1 && (
          <div className="stat-card" style={{
            background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), transparent)',
            borderColor: 'rgba(255, 215, 0, 0.5)',
          }}
          >
            <div className="stat-value" style={{ fontSize: '1.4rem', color: '#ffd700' }}>x{combo}</div>
            <div className="stat-label" style={{ color: '#ffd700' }}>Combo</div>
          </div>
        )}

        {progress && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 4, minWidth: 80, flex: 1, maxWidth: 150 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: '0.65rem', color: '#00f0ff', fontWeight: 600 }}>NIVEL {progress.level}</span>
              <span style={{ fontSize: '0.55rem', color: 'rgba(255,255,255,0.5)' }}>{progress.xp}/{progress.xpToNextLevel}</span>
            </div>
            <div className="xp-bar">
              <div className="xp-bar-fill" style={{ width: `${xpPercentage}%` }} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
