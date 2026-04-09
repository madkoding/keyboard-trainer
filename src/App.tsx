/**
 * App principal compacto con estilo cyberpunk
 */

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  Hand,
  Stats,
  WordDisplay,
  PracticeArea,
  ParticleCanvas,
  ModeSelector,
  KeyboardSelector,
  AchievementToast,
  GameOverModal,
} from './components';
import { createHandLayout, createFingerMap } from './utils/layout';
import { getRandomWord, charToKeyCode } from './utils/words';
import { useProgress } from './hooks/useProgress';
import { useParticles } from './hooks/useParticles';
import { useAudio } from './hooks/useAudio';
import { GAME_MODE_CONFIG, calculateScore } from './utils/gameModes';
import { playSound } from './utils/audio';
import type { Stats as StatsType, ErrorData, GameMode, Achievement, KeyboardType } from './types';
import './App.css';

export default function App() {
  const { progress, addExperience, updateStats, checkAndUnlockAchievements, updatePreferredKeyboard } = useProgress();

  // Usar el teclado preferido guardado o 'corne' por defecto
  const [keyboardType, setKeyboardType] = useState<KeyboardType>(progress.preferredKeyboard || 'corne');
  const layout = createHandLayout(keyboardType);
  const fingerMap = createFingerMap(keyboardType);
  const { particles, spawnExplosion, spawnCombo, spawnError, spawnStreak, spawnTyping, clearParticles } = useParticles();
  const { enabled: audioEnabled, init: initAudio } = useAudio();

  const [currentWord, setCurrentWord] = useState('');
  const [typedChars, setTypedChars] = useState('');
  const [pressedKeys, setPressedKeys] = useState<Set<string>>(new Set());
  const [wrongPressedKeys, setWrongPressedKeys] = useState<Set<string>>(new Set());
  const [expectedKeys, setExpectedKeys] = useState<Set<string>>(new Set());
  const [stats, setStats] = useState<StatsType>({
    totalKeystrokes: 0,
    totalErrors: 0,
    streak: 0,
    startTime: null,
  });
  const [, setErrorData] = useState<ErrorData>({});
  const [combo, setCombo] = useState(0);
  const [wordsWithoutErrors, setWordsWithoutErrors] = useState(0);

  const [gameMode, setGameMode] = useState<GameMode>('practice');
  const [isPlaying, setIsPlaying] = useState(false);
  const [timeLeft, setTimeLeft] = useState<number | null>(null);
  const [lives, setLives] = useState<number | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [finalStats, setFinalStats] = useState<{
    wordsTyped: number;
    wpm: number;
    accuracy: number;
    score: number;
    newAchievements: Achievement[];
  } | null>(null);

  const [achievementToast, setAchievementToast] = useState<Achievement | null>(null);

  const wordsTypedRef = useRef(0);
  const gameStartTimeRef = useRef<number | null>(null);

  const handleFirstInteraction = useCallback(() => {
    initAudio();
  }, [initAudio]);

  const generateWord = useCallback(() => {
    setCurrentWord(getRandomWord());
    setTypedChars('');
  }, []);

  useEffect(() => {
    generateWord();
  }, [generateWord]);

  useEffect(() => {
    if (!isPlaying || timeLeft === null) return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev === null || prev <= 0) return 0;
        const newTime = prev - 1;
        if (newTime <= 0) endGame();
        return newTime;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isPlaying, timeLeft]);

  const wpm = stats.startTime && stats.totalKeystrokes > 0
    ? Math.round((stats.totalKeystrokes / 5) / ((Date.now() - stats.startTime) / 60000))
    : 0;
  const total = stats.totalKeystrokes + stats.totalErrors;
  const accuracy = total > 0 ? Math.round((stats.totalKeystrokes / total) * 100) : 100;

  const handleModeChange = (mode: GameMode) => {
    playSound('click');
    setGameMode(mode);
    resetGame();
  };

  const handleKeyboardChange = (newKeyboard: KeyboardType) => {
    playSound('click');
    setKeyboardType(newKeyboard);
    updatePreferredKeyboard(newKeyboard); // Guardar preferencia
    resetGame();
  };

  const resetGame = () => {
    setIsPlaying(false);
    setGameOver(false);
    setFinalStats(null);
    setStats({ totalKeystrokes: 0, totalErrors: 0, streak: 0, startTime: null });
    setCombo(0);
    setWordsWithoutErrors(0);
    wordsTypedRef.current = 0;
    gameStartTimeRef.current = null;

    const config = GAME_MODE_CONFIG[gameMode];
    setTimeLeft(config.timeLimit);
    setLives(config.lives);
    clearParticles();
    generateWord();
  };

  const startGame = () => {
    handleFirstInteraction();
    setIsPlaying(true);
    gameStartTimeRef.current = Date.now();
    const config = GAME_MODE_CONFIG[gameMode];
    if (config.timeLimit) setTimeLeft(config.timeLimit);
    if (config.lives) setLives(config.lives);
  };

  const endGame = () => {
    setIsPlaying(false);
    setGameOver(true);

    const playTime = gameStartTimeRef.current
      ? Math.floor((Date.now() - gameStartTimeRef.current) / 1000)
      : 0;

    const score = calculateScore(gameMode, {
      wordsTyped: wordsTypedRef.current,
      keystrokes: stats.totalKeystrokes,
      errors: stats.totalErrors,
      streak: stats.streak,
      timeElapsed: playTime,
    });

    const finalProgress = updateStats({
      wordsTyped: wordsTypedRef.current,
      playTime,
      streak: stats.streak,
      wpm,
      errors: stats.totalErrors,
      keystrokes: stats.totalKeystrokes,
    });

    const newlyUnlocked = checkAndUnlockAchievements({
      streak: stats.streak,
      wpm,
      accuracy,
      wordsTyped: finalProgress.wordsTyped,
      combo,
      wordsWithoutErrors,
    });

    if (newlyUnlocked.length > 0) setAchievementToast(newlyUnlocked[0]);

    setFinalStats({ wordsTyped: wordsTypedRef.current, wpm, accuracy, score, newAchievements: newlyUnlocked });
    playSound('gameOver');
  };

  const handleChange = (value: string) => {
    if (!isPlaying && !gameOver) startGame();
    if (!stats.startTime) setStats((s) => ({ ...s, startTime: Date.now() }));

    const newChar = value[value.length - 1];
    const expectedChar = currentWord[typedChars.length];

    if (newChar) {
      const isCorrect = newChar.toLowerCase() === expectedChar?.toLowerCase();

      if (isCorrect) {
        setTypedChars((prev) => prev + newChar);
        setStats((s) => ({ ...s, totalKeystrokes: s.totalKeystrokes + 1, streak: s.streak + 1 }));
        setCombo((prev) => prev + 1);

        const kc = charToKeyCode(newChar);
        if (kc) {
          setPressedKeys((prev) => new Set([...prev, kc]));
          setTimeout(() => {
            setPressedKeys((prev) => { const next = new Set(prev); next.delete(kc); return next; });
          }, 100);
        }

        const inputEl = document.querySelector('.practice-input') as HTMLElement;
        if (inputEl) {
          const rect = inputEl.getBoundingClientRect();
          spawnTyping(rect.left + rect.width / 2, rect.top, '#00f0ff');
        }

        playSound('keyPress');

        if (stats.streak + 1 >= 10 && (stats.streak + 1) % 10 === 0) {
          playSound('streak');
          const inputEl = document.querySelector('.practice-input') as HTMLElement;
          if (inputEl) {
            const rect = inputEl.getBoundingClientRect();
            spawnStreak(rect.left + rect.width / 2, rect.top, stats.streak + 1);
          }
        }

        if (combo > 0 && combo % 10 === 0) {
          playSound('combo');
          const inputEl = document.querySelector('.practice-input') as HTMLElement;
          if (inputEl) {
            const rect = inputEl.getBoundingClientRect();
            spawnCombo(rect.left + rect.width / 2, rect.top, combo);
          }
        }
      } else {
        setStats((s) => ({ ...s, streak: 0, totalErrors: s.totalErrors + 1 }));
        setCombo(0);
        setWordsWithoutErrors(0);

        // Marcar teclas en el teclado visual
        const wrongKc = charToKeyCode(newChar); // tecla que presionó mal
        const expectedKc = charToKeyCode(expectedChar); // tecla que debería presionar
        
        if (wrongKc) {
          setWrongPressedKeys(new Set([wrongKc]));
        }
        if (expectedKc) {
          setExpectedKeys(new Set([expectedKc]));
        }
        
        // Limpiar después de 2 segundos
        setTimeout(() => {
          setWrongPressedKeys(new Set());
          setExpectedKeys(new Set());
        }, 2000);

        // Guardar para estadísticas
        const kc = charToKeyCode(expectedChar);
        if (kc) {
          setErrorData((prev) => ({ ...prev, [kc]: (prev[kc] || 0) + 1 }));
        }

        const inputEl = document.querySelector('.practice-input') as HTMLElement;
        if (inputEl) {
          const rect = inputEl.getBoundingClientRect();
          spawnError(rect.left + rect.width / 2, rect.top);
        }

        playSound('keyError');

        const config = GAME_MODE_CONFIG[gameMode];
        if (config.lives && config.penaltiesEnabled) {
          setLives((prev) => {
            const newLives = prev !== null ? prev - 1 : null;
            if (newLives !== null && newLives <= 0) endGame();
            return newLives;
          });
        }
      }
    }

    if (value === currentWord) {
      wordsTypedRef.current += 1;
      setWordsWithoutErrors((prev) => prev + 1);
      addExperience(currentWord, wpm, accuracy, combo);

      const inputEl = document.querySelector('.practice-input') as HTMLElement;
      if (inputEl) {
        const rect = inputEl.getBoundingClientRect();
        spawnExplosion(rect.left + rect.width / 2, rect.top, '#00f0ff', 12);
      }

      playSound('wordComplete');
      setTypedChars('');
      setTimeout(() => generateWord(), 300);
    }
  };

  return (
    <div style={{ minHeight: '100vh', position: 'relative', paddingBottom: 40 }}>
      <div className="game-background" />
      <div className="scanlines" />
      <ParticleCanvas particles={particles} />

      {/* Header compacto */}
      <header style={{ textAlign: 'center', padding: '15px 10px 10px' }}>
        <h1 style={{
          fontSize: '1.6rem',
          fontWeight: 700,
          margin: 0,
          fontFamily: 'var(--font-display)',
          textTransform: 'uppercase',
          letterSpacing: 4,
          background: 'linear-gradient(135deg, #00f0ff, #ff00a0)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Keyboard Trainer
        </h1>
        <p style={{ color: 'rgba(255,255,255,0.4)', fontSize: '0.65rem', letterSpacing: 2, margin: '4px 0 0', textTransform: 'uppercase' }}>
          Nivel {progress.level} • {progress.wordsTyped} palabras
        </p>
      </header>

      {/* Selector de modo compacto */}
      <div style={{ padding: '0 10px', marginBottom: 8 }}>
        <KeyboardSelector selectedKeyboard={keyboardType} onSelectKeyboard={handleKeyboardChange} disabled={isPlaying} />
      </div>

      {/* Selector de modo compacto */}
      <div style={{ padding: '0 10px', marginBottom: 10 }}>
        <ModeSelector selectedMode={gameMode} onSelectMode={handleModeChange} disabled={isPlaying} />
      </div>

      {/* Timer y vidas */}
      {(timeLeft !== null || lives !== null) && (
        <div style={{ display: 'flex', justifyContent: 'center', gap: 15, marginBottom: 10 }}>
          {timeLeft !== null && (
            <div className="stat-card" style={{ padding: '8px 16px', borderColor: timeLeft <= 10 ? '#ff3333' : undefined }}>
              <div className="stat-value" style={{ fontSize: '1.4rem', color: timeLeft <= 10 ? '#ff3333' : '#00f0ff' }}>
                {Math.floor(timeLeft / 60)}:{String(timeLeft % 60).padStart(2, '0')}
              </div>
            </div>
          )}
          {lives !== null && (
            <div className="stat-card" style={{ padding: '8px 16px' }}>
              <div className="stat-value" style={{ fontSize: '1.2rem' }}>
                {'❤️'.repeat(lives)}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Stats compacto */}
      <Stats wpm={wpm} accuracy={accuracy} streak={stats.streak} combo={combo} progress={progress} />

      {/* Teclado visual más compacto */}
      <div style={{ display: 'flex', justifyContent: 'center', gap: 30, marginBottom: 15, flexWrap: 'wrap', padding: '0 10px' }}>
        <Hand keys={layout.left} fingerMap={fingerMap.left} pressedKeys={pressedKeys} wrongPressedKeys={wrongPressedKeys} expectedKeys={expectedKeys} />
        <Hand keys={layout.right} fingerMap={fingerMap.right} isRight pressedKeys={pressedKeys} wrongPressedKeys={wrongPressedKeys} expectedKeys={expectedKeys} />
      </div>

      {/* Area de práctica compacta */}
      <div style={{ padding: '0 10px', maxWidth: 400, margin: '0 auto' }}>
        <WordDisplay word={currentWord} typed={typedChars} />

        <PracticeArea
          word={currentWord}
          typed={typedChars}
          onChange={handleChange}
          disabled={gameOver}
          placeholder={isPlaying ? '¡Escribe!' : 'Presiona cualquier tecla'}
        />

        <div style={{ display: 'flex', justifyContent: 'center', gap: 10, marginTop: 12 }}>
          <button onClick={() => { playSound('click'); generateWord(); }} className="cyber-button" style={{ padding: '8px 16px', fontSize: '0.7rem' }}>
            Nueva Palabra
          </button>
          <button
            onClick={() => { playSound('click'); resetGame(); }}
            className="cyber-button"
            style={{ padding: '8px 16px', fontSize: '0.7rem', background: 'transparent', borderColor: 'rgba(255, 0, 160, 0.5)', color: '#ff00a0' }}
          >
            Reiniciar
          </button>
        </div>
      </div>

      {/* Footer compacto */}
      <footer style={{ textAlign: 'center', padding: '10px', fontSize: '0.65rem', color: 'rgba(255,255,255,0.3)', marginTop: 15 }}>
        🔊 {audioEnabled ? 'Audio ON' : 'Audio OFF'}
      </footer>

      {achievementToast && <AchievementToast achievement={achievementToast} onClose={() => setAchievementToast(null)} />}

      {finalStats && (
        <GameOverModal
          isOpen={gameOver}
          mode={gameMode}
          stats={finalStats}
          progress={progress}
          onRestart={() => { playSound('click'); resetGame(); }}
          onClose={() => { playSound('click'); setGameOver(false); }}
        />
      )}
    </div>
  );
}
