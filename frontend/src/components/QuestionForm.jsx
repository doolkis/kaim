import { useState } from 'react';
import AiSelector from './AiSelector';

function QuestionForm({ onSubmit }) {
  const [question, setQuestion] = useState('');
  const [selectedAi, setSelectedAi] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (question.trim().length < 3 || !selectedAi) return;
    onSubmit({ question, ai_id: selectedAi });
    setQuestion('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '600px' }}>
      <input
        type="text"
        placeholder="Mit szeretnél megtudni?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        required
        minLength={3}
        style={{
          padding: '0.5rem',
          fontSize: '1rem'
        }}
      />
      <AiSelector selected={selectedAi} onChange={setSelectedAi} />
      <button type="submit" disabled={question.length < 3 || !selectedAi}>
        Kérdezd meg
      </button>
    </form>
  );
}

export default QuestionForm;
