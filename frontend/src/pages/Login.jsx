import { useState } from 'react';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.message || 'Hibás bejelentkezés');
        return;
      }

      alert('Sikeres bejelentkezés!');
    } catch (err) {
      setError('Hálózati hiba');
    }
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15vh' }}>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', width: '400px', fontSize: '20px', gap: '1rem' }}>
        <h2 style={{ textAlign: 'center' }}>Bejelentkezés</h2>
        <input
          type="email"
          placeholder="E-mail"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ fontSize: '20px', padding: '0.5rem' }}
          required
        />
        <input
          type="password"
          placeholder="Jelszó"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ fontSize: '20px', padding: '0.5rem' }}
          required
        />
        <button type="submit" style={{ fontSize: '20px', padding: '0.5rem' }}>Belépés</button>
        {error && <p style={{ color: 'red' }}>{error}</p>}
      </form>
    </div>
  );
}
