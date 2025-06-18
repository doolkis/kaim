import { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import SaveAnswerModal from '../components/SaveAnswerModal';

function AdminDashboard() {
  const [lastQuestion, setLastQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [tempPassword, setTempPassword] = useState('');
  const [role, setRole] = useState('user');
  const [message, setMessage] = useState('');

  const handleAsk = async ({ question, ai_id }) => {
    setLastQuestion({ question, ai_id, answer: 'Küldés folyamatban...' });

    try {
      const res = await fetch('/api/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ question, ai_id })
      });

      if (res.ok) {
        const data = await res.json();
        setLastQuestion({ question, ai_id, answer: data.answer });
      } else {
        setLastQuestion({ question, ai_id, answer: 'Hiba történt a válasz lekérésekor.' });
      }
    } catch (err) {
      setLastQuestion({ question, ai_id, answer: 'Hálózati hiba.' });
    }
  };

  const handleSave = async (payload) => {
    try {
      const res = await fetch('/api/save-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        console.error('Mentés sikertelen');
      }
    } catch (err) {
      console.error('Hálózati hiba mentéskor');
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password: tempPassword, role })
      });

      if (res.ok) {
        setMessage('Felhasználó sikeresen létrehozva!');
        setName('');
        setEmail('');
        setTempPassword('');
        setRole('user');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Hiba történt a létrehozáskor.');
      }
    } catch (err) {
      setMessage('Hálózati hiba');
    }
  };

  const generatePassword = () => {
    const charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let pass = '';
    for (let i = 0; i < 10; i++) {
      pass += charset.charAt(Math.floor(Math.random() * charset.length));
    }
    setTempPassword(pass);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>Admin felület</h1>

      {/* 🧠 Gyorskérdés blokk */}
      <section style={{ marginBottom: '2rem' }}>
        <h2>Gyorskérdés</h2>
        <QuestionForm onSubmit={handleAsk} />
        {lastQuestion && (
          <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
            <p><strong>Kérdés:</strong> {lastQuestion.question}</p>
            <p><strong>AI:</strong> {lastQuestion.ai_id}</p>
            <p><strong>Válasz:</strong> {lastQuestion.answer}</p>
            <button onClick={() => setShowModal(true)}>Mentés</button>
          </div>
        )}
      </section>

      <SaveAnswerModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleSave}
        question={lastQuestion?.question || ''}
        answer={lastQuestion?.answer || ''}
      />

      {/* 👤 Felhasználó létrehozás */}
      <form onSubmit={handleCreateUser} style={{ display: 'flex', flexDirection: 'column', width: '400px', fontSize: '20px', gap: '1rem' }}>
        <h2 style={{ textAlign: 'center' }}>Új felhasználó létrehozása (Admin)</h2>
        <input type="text" placeholder="Név" value={name} onChange={(e) => setName(e.target.value)} required style={{ fontSize: '20px', padding: '0.5rem' }} />
        <input type="email" placeholder="E-mail" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ fontSize: '20px', padding: '0.5rem' }} />
        <select value={role} onChange={(e) => setRole(e.target.value)} style={{ fontSize: '20px', padding: '0.5rem' }}>
          <option value="user">User</option>
          <option value="admin">Admin</option>
        </select>
        <div>
          <input type="text" placeholder="Ideiglenes jelszó" value={tempPassword} onChange={(e) => setTempPassword(e.target.value)} required style={{ fontSize: '20px', padding: '0.5rem', width: '100%' }} />
          <button type="button" onClick={generatePassword} style={{ fontSize: '20px', padding: '0.5rem', marginTop: '0.5rem' }}>Jelszó generálása</button>
        </div>
        <button type="submit" style={{ fontSize: '20px', padding: '0.5rem' }}>Létrehozás</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}

export default AdminDashboard;
