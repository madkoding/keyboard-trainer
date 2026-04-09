/**
 * Componente de modal de resultados del juego
 */

import { useEffect, useState } from 'react';
import type { GameMode, PlayerProgress, Achievement } from '../types';
import { GAME_MODES } from '../utils/gameModes';

interface GameOverModalProps {
  isOpen: boolean;
  mode: GameMode;
  stats: {
    wordsTyped: number;
    wpm: number;
    accuracy: number;
    score: number;
    newAchievements: Achievement[];
  };
  progress: PlayerProgress;
  onRestart: () => void;
  onClose: () => void;
}

export function GameOverModal({ isOpen, mode, stats, progress, onRestart, onClose }: GameOverModalProps) {
  const [showContent, setShowContent] = useState(false);
  const modeInfo = GAME_MODES.find(m => m.id === mode);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setShowContent(true), 100);
    } else {
      setShowContent(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-content"
        onClick={e => e.stopPropagation()}
        style={{
          transform: showContent ? 'scale(1)' : 'scale(0.9)',
          opacity: showContent ? 1 : 0,
          transition: 'all 0.3s ease',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: 25 }}>
          <div
            style={{
              fontSize: '3rem',
              marginBottom: 10,
              animation: 'pulse 1s ease infinite',
            }}
          >
            🏆
          </div>
          <h2 style={{ margin: 0, color: '#fff', fontFamily: 'var(--font-display)' }}>
            ¡Partida Terminada!
          </h2>
          <p style={{ color: 'rgba(255,255,255,0.5)', marginTop: 8 }}>
            Modo: {modeInfo?.name}
          </p>
        </div>

        {/* Stats Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: 15,
            marginBottom: 25,
          }}
        >
          <div
            className="stat-card"
            style={{ background: 'rgba(0, 240, 255, 0.05)' }}
          >
            <div className="stat-value">{stats.wordsTyped}</div>
            <div className="stat-label">Palabras</div>
          </div>
          <div
            className="stat-card"
            style={{ background: 'rgba(0, 240, 255, 0.05)' }}
          >
            <div className="stat-value">{stats.wpm}</div>
            <div className="stat-label">PPM</div>
          </div>
          <div
            className="stat-card"
            style={{ background: 'rgba(0, 240, 255, 0.05)' }}
          >
            <div className="stat-value">{stats.accuracy}%</div>
            <div className="stat-label">Precisión</div>
          </div>
          <div
            className="stat-card"
            style={{ background: 'rgba(255, 215, 0, 0.1)' }}
          >
            <div className="stat-value" style={{ color: '#ffd700' }}>
              {stats.score}
            </div>
            <div className="stat-label">Puntuación</div>
          </div>
        </div>

        {/* New Achievements */}
        {stats.newAchievements.length > 0 && (
          <div style={{ marginBottom: 25 }}>
            <h3
              style={{
                color: '#ffd700',
                fontSize: '0.9rem',
                textTransform: 'uppercase',
                letterSpacing: 2,
                marginBottom: 15,
              }}
            >
              🏅 Nuevos Logros
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {stats.newAchievements.map(achievement => (
                <div
                  key={achievement.id}
                  className={`achievement unlocked tier-${achievement.tier}`}
                  style={{ padding: 12 }}
                >
                  <div className="achievement-icon">{achievement.icon}</div>
                  <div>
                    <div style={{ color: '#fff', fontWeight: 600 }}>
                      {achievement.name}
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
                      {achievement.description}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Level Progress */}
        <div style={{ marginBottom: 25 }}>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 8,
            }}
          >
            <span style={{ color: '#00f0ff', fontWeight: 600 }}>
              Nivel {progress.level}
            </span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem' }}>
              {progress.xp} / {progress.xpToNextLevel} XP
            </span>
          </div>
          <div className="xp-bar">
            <div
              className="xp-bar-fill"
              style={{
                width: `${(progress.xp / progress.xpToNextLevel) * 100}%`,
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 15 }}>
          <button
            onClick={onRestart}
            className="cyber-button"
            style={{ flex: 1 }}
          >
            Jugar de Nuevo
          </button>
          <button
            onClick={onClose}
            className="cyber-button"
            style={{
              flex: 1,
              background: 'transparent',
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.6)',
            }}
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
