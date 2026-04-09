/**
 * Componente de display de palabra
 */

interface WordDisplayProps {
  word: string;
  typed: string;
}

export function WordDisplay({ word, typed }: WordDisplayProps) {
  const correct = word.substring(0, typed.length);
  const incorrect = typed.length > correct.length ? typed.substring(correct.length) : '';
  const remaining = word.substring(typed.length);

  return (
    <div 
      className="glass-panel"
      style={{ 
        padding: '15px 20px', 
        marginBottom: 15, 
        textAlign: 'center',
        minHeight: 50,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div className="word-display" style={{ fontSize: '1.8rem' }}>
        <span className="char-correct">{correct}</span>
        <span className="char-error">{incorrect}</span>
        <span className="char-pending">{remaining}</span>
        <span className="cursor">▋</span>
      </div>
    </div>
  );
}
