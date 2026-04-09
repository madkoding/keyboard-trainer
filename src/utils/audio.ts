/**
 * Sistema de sonidos usando Web Audio API
 * Genera sonidos sintéticos sin necesidad de archivos externos
 */

import type { SoundType } from '../types';

class AudioManager {
  private ctx: AudioContext | null = null;
  private enabled = true;
  private volume = 0.3;
  
  /** Inicializar el contexto de audio (debe llamarse tras interacción del usuario) */
  init(): void {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
    }
  }
  
  /** Verificar si está habilitado */
  isEnabled(): boolean {
    return this.enabled;
  }
  
  /** Habilitar/deshabilitar sonido */
  setEnabled(enabled: boolean): void {
    this.enabled = enabled;
  }
  
  /** Obtener volumen */
  getVolume(): number {
    return this.volume;
  }
  
  /** Establecer volumen (0-1) */
  setVolume(vol: number): void {
    this.volume = Math.max(0, Math.min(1, vol));
  }
  
  /** Reproducir un sonido */
  play(type: SoundType): void {
    if (!this.enabled || !this.ctx) return;
    
    // Reanudar contexto si está suspendido (política de autoplay)
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    
    switch (type) {
      case 'keyPress':
        this.playKeyPress();
        break;
      case 'keyError':
        this.playKeyError();
        break;
      case 'combo':
        this.playCombo();
        break;
      case 'levelUp':
        this.playLevelUp();
        break;
      case 'achievement':
        this.playAchievement();
        break;
      case 'streak':
        this.playStreak();
        break;
      case 'wordComplete':
        this.playWordComplete();
        break;
      case 'gameOver':
        this.playGameOver();
        break;
      case 'click':
        this.playClick();
        break;
    }
  }
  
  /** Sonido de tecla presionada - click mecánico suave */
  private playKeyPress(): void {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(400, this.ctx.currentTime + 0.05);
    
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(2000, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(this.volume * 0.15, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.05);
    
    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.05);
  }
  
  /** Sonido de error - buzz grave desagradable */
  private playKeyError(): void {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sawtooth';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.linearRampToValueAtTime(100, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(this.volume * 0.3, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.15);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.15);
  }
  
  /** Sonido de combo - notas ascendentes rápidas */
  private playCombo(): void {
    if (!this.ctx) return;
    
    const notes = [523.25, 659.25, 783.99]; // C5, E5, G5
    
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, this.ctx!.currentTime + i * 0.05);
      
      gain.gain.setValueAtTime(0, this.ctx!.currentTime + i * 0.05);
      gain.gain.linearRampToValueAtTime(this.volume * 0.2, this.ctx!.currentTime + i * 0.05 + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.01, this.ctx!.currentTime + i * 0.05 + 0.1);
      
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.start(this.ctx!.currentTime + i * 0.05);
      osc.stop(this.ctx!.currentTime + i * 0.05 + 0.15);
    });
  }
  
  /** Sonido de subida de nivel - fanfarria épica */
  private playLevelUp(): void {
    if (!this.ctx) return;
    
    const notes = [523.25, 659.25, 783.99, 1046.50, 1318.51]; // C5, E5, G5, C6, E6
    const durations = [0.1, 0.1, 0.1, 0.2, 0.4];
    
    let time = this.ctx.currentTime;
    
    notes.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'square';
      osc.frequency.setValueAtTime(freq, time);
      
      gain.gain.setValueAtTime(0, time);
      gain.gain.linearRampToValueAtTime(this.volume * 0.25, time + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, time + durations[i]);
      
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.start(time);
      osc.stop(time + durations[i]);
      
      time += durations[i] * 0.8;
    });
  }
  
  /** Sonido de logro desbloqueado - brillante y celebratorio */
  private playAchievement(): void {
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    // Arpegio ascendente
    const frequencies = [440, 554.37, 659.25, 880];
    
    frequencies.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, now + i * 0.08);
      
      gain.gain.setValueAtTime(0, now + i * 0.08);
      gain.gain.linearRampToValueAtTime(this.volume * 0.25, now + i * 0.08 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.08 + 0.3);
      
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.start(now + i * 0.08);
      osc.stop(now + i * 0.08 + 0.4);
    });
  }
  
  /** Sonido de racha - pulso rápido */
  private playStreak(): void {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(1200, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.1);
  }
  
  /** Sonido de palabra completada - satisfactorio */
  private playWordComplete(): void {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(523.25, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(783.99, this.ctx.currentTime + 0.15);
    
    gain.gain.setValueAtTime(this.volume * 0.2, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.2);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.2);
  }
  
  /** Sonido de game over - descendente triste */
  private playGameOver(): void {
    if (!this.ctx) return;
    
    const now = this.ctx.currentTime;
    
    const frequencies = [440, 415.30, 392.00, 349.23];
    
    frequencies.forEach((freq, i) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();
      
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(freq, now + i * 0.3);
      
      gain.gain.setValueAtTime(this.volume * 0.3, now + i * 0.3);
      gain.gain.exponentialRampToValueAtTime(0.01, now + i * 0.3 + 0.4);
      
      osc.connect(gain);
      gain.connect(this.ctx!.destination);
      
      osc.start(now + i * 0.3);
      osc.stop(now + i * 0.3 + 0.5);
    });
  }
  
  /** Sonido de click en UI - muy corto */
  private playClick(): void {
    if (!this.ctx) return;
    
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1000, this.ctx.currentTime);
    
    gain.gain.setValueAtTime(this.volume * 0.1, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, this.ctx.currentTime + 0.03);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start(this.ctx.currentTime);
    osc.stop(this.ctx.currentTime + 0.03);
  }
}

export const audioManager = new AudioManager();

/** Hook-friendly wrapper para reproducir sonidos */
export function playSound(type: SoundType): void {
  audioManager.play(type);
}

/** Inicializar audio (llamar después de interacción del usuario) */
export function initAudio(): void {
  audioManager.init();
}
