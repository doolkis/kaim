import React, { useState } from 'react';
import QuestionForm from '../components/QuestionForm';
import SaveAnswerModal from '../components/SaveAnswerModal';

const MainPage = () => {
  const [lastQuestion, setLastQuestion] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const handleAsk = (data) => {
    setLastQuestion(data);
  };

  const handleSave = async (data) => {
    try {
      const res = await fetch('/api/save-question', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      const result = await res.json();
      if (result.success) {
        alert('Mentés sikeres!');
      }
    } catch (err) {
      alert('Hiba mentés közben: ' + err.message);
    }
    setShowModal(false);
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Bal oldali oszlop - Projektek, szálak, címkék */}
      <aside style={{ width: '20%', padding: '1rem', background: '#f0f0f0' }}>
        <h2>📁 Projekt</h2>
        <select style={{ width: '100%' }}>
          <option>Projekt A</option>
          <option>Projekt B</option>
        </select>

        <h3 style={{ marginTop: '2rem' }}>🧵 Szálak</h3>
        <ul>
          <li># Alap</li>
          <li># Funkciók</li>
        </ul>

        <h3 style={{ marginTop: '2rem' }}>🏷️ Címkék</h3>
        <ul>
          <li>AI</li>
          <li>Backend</li>
        </ul>
      </aside>

      {/* Középső oszlop - Gyorskérdés */}
      <main style={{ width: '60%', padding: '2rem' }}>
        <h1>Főoldal – Gyorskérdés</h1>

        <section style={{ marginBottom: '2rem' }}>
          <h2>Gyorskérdés</h2>
          <QuestionForm onSubmit={handleAsk} />
          {lastQuestion && (
            <div style={{ marginTop: '1rem', padding: '1rem', border: '1px solid #ccc' }}>
              <p><strong>Kérdés:</strong> {lastQuestion.question}</p>
              <p><strong>AI:</strong> {lastQuestion.ai}</p>
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
      </main>

      {/* Jobb oldali oszlop - Profil és admin */}
      <aside style={{ width: '20%', padding: '1rem', background: '#f9f9f9' }}>
        <h2>👤 Profil</h2>
        <p>Név: Admin Felhasználó</p>

        <h3 style={{ marginTop: '2rem' }}>➕ Új felhasználó</h3>
        <button style={{ width: '100%', padding: '0.5rem' }}>Felhasználó létrehozása</button>

        <h3 style={{ marginTop: '2rem' }}>🚪 Kijelentkezés</h3>
        <a href="/login">Kijelentkezés</a>
      </aside>
    </div>
  );
};

export default MainPage;
