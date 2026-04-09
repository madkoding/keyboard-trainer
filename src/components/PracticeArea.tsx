/**
 * Componente de área de práctica con estilo cyberpunk
 */

import { useRef, useEffect } from 'react';

interface PracticeAreaProps {
  word: string;
  typed: string;
  onChange: (value: string) => void;
  onKeyPress?: (keyCode: string, isError: boolean) => void;
  disabled?: boolean;
  placeholder?: string;
}

export function PracticeArea({ 
  word, 
  typed, 
  onChange, 
  onKeyPress,
  disabled = false,
  placeholder = 'Escribe aquí...'
}: PracticeAreaProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-focus cuando cambia la palabra
  useEffect(() => {
    if (!disabled && inputRef.current) {
      inputRef.current.focus();
    }
  }, [word, disabled]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const lastChar = newValue[newValue.length - 1];
    const expectedChar = word[typed.length];
    
    if (lastChar && expectedChar) {
      const isError = lastChar.toLowerCase() !== expectedChar.toLowerCase();
      onKeyPress?.(lastChar, isError);
    }
    
    onChange(newValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    // Prevenir navegación con flechas
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight' || e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      e.preventDefault();
    }
  };

  return (
    <div style={{ maxWidth: 450, margin: '0 auto 25px', textAlign: 'center' }}>
      <input
        ref={inputRef}
        type="text"
        value={typed}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        placeholder={placeholder}
        disabled={disabled}
        autoComplete="off"
        autoCapitalize="off"
        spellCheck={false}
        className="practice-input"
        style={{
          opacity: disabled ? 0.5 : 1,
          cursor: disabled ? 'not-allowed' : 'text',
        }}
      />
    </div>
  );
}
