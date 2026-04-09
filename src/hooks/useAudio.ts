/**
 * Hook para manejar el sistema de audio
 */

import { useState, useCallback, useEffect } from 'react';
import { audioManager, initAudio } from '../utils/audio';
import type { SoundType } from '../types';

interface UseAudioReturn {
  enabled: boolean;
  volume: number;
  toggleEnabled: () => void;
  setVolume: (volume: number) => void;
  play: (type: SoundType) => void;
  init: () => void;
}

export function useAudio(): UseAudioReturn {
  const [enabled, setEnabled] = useState<boolean>(() => {
    const saved = localStorage.getItem('keyboard-trainer-audio');
    return saved ? JSON.parse(saved).enabled : true;
  });
  
  const [volume, setVolumeState] = useState<number>(() => {
    const saved = localStorage.getItem('keyboard-trainer-audio');
    return saved ? JSON.parse(saved).volume : 0.3;
  });
  
  // Guardar configuración en localStorage
  useEffect(() => {
    localStorage.setItem('keyboard-trainer-audio', JSON.stringify({ enabled, volume }));
    audioManager.setEnabled(enabled);
    audioManager.setVolume(volume);
  }, [enabled, volume]);
  
  /** Alternar habilitado/deshabilitado */
  const toggleEnabled = useCallback(() => {
    setEnabled(prev => {
      const newValue = !prev;
      audioManager.setEnabled(newValue);
      return newValue;
    });
  }, []);
  
  /** Establecer volumen */
  const setVolumeCallback = useCallback((vol: number) => {
    const clampedVol = Math.max(0, Math.min(1, vol));
    setVolumeState(clampedVol);
    audioManager.setVolume(clampedVol);
  }, []);
  
  /** Reproducir sonido */
  const play = useCallback((type: SoundType) => {
    audioManager.play(type);
  }, []);
  
  /** Inicializar audio (llamar tras interacción del usuario) */
  const init = useCallback(() => {
    initAudio();
  }, []);
  
  return {
    enabled,
    volume,
    toggleEnabled,
    setVolume: setVolumeCallback,
    play,
    init,
  };
}
