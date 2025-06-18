import { useEffect, useState } from 'react';

function AiSelector({ selected, onChange }) {
  const [aiList, setAiList] = useState([]);

  useEffect(() => {
    // Példa adat, később cserélhető API-hívásra
    setAiList([
      { id: 'openai', name: 'OpenAI GPT-4' },
      { id: 'gemini', name: 'Google Gemini' },
      { id: 'custom', name: 'Egyedi AI' }
    ]);
  }, []);

  return (
    <select value={selected} onChange={(e) => onChange(e.target.value)} style={{ fontSize: '1rem', padding: '0.5rem', marginLeft: '1rem' }}>
      <option value="">Válassz AI-t</option>
      {aiList.map((ai) => (
        <option key={ai.id} value={ai.id}>{ai.name}</option>
      ))}
    </select>
  );
}

export default AiSelector;
