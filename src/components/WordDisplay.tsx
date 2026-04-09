/**
 * Componente de display de palabra
 * Muestra espacios y caracteres especiales de forma explícita
 */

interface WordDisplayProps {
  word: string;
  typed: string;
}

/**
 * Reemplaza espacios por símbolos visibles
 * ␣ = espacio (U+2423)
 * ↵ = enter (U+21B5)
 */
function formatVisibleChars(text: string): string {
  return text
    .replace(/ /g, '␣')
    .replace(/\n/g, '↵')
    .replace(/\t/g, '⇥');
}

export function WordDisplay({ word, typed }: WordDisplayProps) {
  const correct = word.substring(0, typed.length);
  const incorrect = typed.length > correct.length ? typed.substring(correct.length) : '';
  const remaining = word.substring(typed.length);

  // Verificar si la siguiente tecla es un espacio (para mostrar ayuda)
  const nextChar = remaining[0];
  const isSpaceNext = nextChar === ' ';
  const isEnterNext = nextChar === '\n';

  return (
    <div 
      className="glass-panel"
      style={{ 
        padding: '15px 20px', 
        marginBottom: 15, 
        textAlign: 'center',
        minHeight: 50,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {/* Indicador de tecla especial si aplica */}
      {(isSpaceNext || isEnterNext) && (
        <div 
          style={{
            fontSize: '0.65rem',
            color: '#00f0ff',
            textTransform: 'uppercase',
            letterSpacing: 2,
            marginBottom: 6,
            padding: '3px 10px',
            background: 'rgba(0, 240, 255, 0.1)',
            border: '1px solid rgba(0, 240, 255, 0.3)',
            borderRadius: 4,
          }}
        >
          {isSpaceNext && 'Presiona ESPACIO'}
          {isEnterNext && 'Presiona ENTER'}
        </div>
      )}

      <div className="word-display" style={{ fontSize: '1.8rem', letterSpacing: 2 }}>
        <span className="char-correct">{formatVisibleChars(correct)}</span>
        <span className="char-error">{formatVisibleChars(incorrect)}</span>
        <span className="char-pending">{formatVisibleChars(remaining)}</span>
        <span className="cursor">▋</span>
      </div>
    </div>
  );
}
