import { useState } from 'react';

function SaveAnswerModal({ isOpen, onClose, onSave, question, answer }) {
  const [projectId, setProjectId] = useState('');
  const [threadId, setThreadId] = useState('');
  const [tags, setTags] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({
      question,
      answer,
      project_id: projectId,
      thread_id: threadId,
      tags: tags.split(',').map(tag => tag.trim()).filter(Boolean)
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', background: '#00000088', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <form onSubmit={handleSubmit} style={{ background: '#fff', padding: '2rem', borderRadius: '8px', minWidth: '400px' }}>
        <h2>Mentés projektbe</h2>
        <input type="text" placeholder="Projekt ID" value={projectId} onChange={(e) => setProjectId(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <input type="text" placeholder="Szál ID (vagy új)" value={threadId} onChange={(e) => setThreadId(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <input type="text" placeholder="Címkék (vesszővel elválasztva)" value={tags} onChange={(e) => setTags(e.target.value)} style={{ width: '100%', marginBottom: '1rem' }} />
        <button type="submit">Mentés</button>
        <button type="button" onClick={onClose} style={{ marginLeft: '1rem' }}>Mégse</button>
      </form>
    </div>
  );
}

export default SaveAnswerModal;
