/**
 * Componente de toast para logros desbloqueados
 */

import { useEffect, useState } from 'react';
import type { Achievement } from '../types';

interface AchievementToastProps {
  achievement: Achievement;
  onClose: () => void;
}

const TIER_COLORS: Record<string, string> = {
  bronze: '#cd7f32',
  silver: '#c0c0c0',
  gold: '#ffd700',
  platinum: '#e5e4e2',
  diamond: '#b9f2ff',
};

export function AchievementToast({ achievement, onClose }: AchievementToastProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setVisible(true);
    const timer = setTimeout(() => {
      setVisible(false);
      setTimeout(onClose, 300);
    }, 4000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div
      className="toast"
      style={{
        transform: visible ? 'translateX(0)' : 'translateX(100%)',
        opacity: visible ? 1 : 0,
        transition: 'all 0.3s ease',
        borderColor: TIER_COLORS[achievement.tier],
        boxShadow: `0 0 20px ${TIER_COLORS[achievement.tier]}40`,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '15px',
        }}
      >
        <div
          style={{
            width: 50,
            height: 50,
            borderRadius: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            background: `linear-gradient(135deg, ${TIER_COLORS[achievement.tier]}, transparent)`,
            border: `2px solid ${TIER_COLORS[achievement.tier]}`,
          }}
        >
          {achievement.icon}
        </div>
        <div>
          <div
            className="toast-title"
            style={{ color: TIER_COLORS[achievement.tier] }}
          >
            ¡Logro Desbloqueado!
          </div>
          <div className="toast-message">
            <strong>{achievement.name}</strong> - {achievement.description}
          </div>
        </div>
      </div>
    </div>
  );
}
