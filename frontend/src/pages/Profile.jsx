import { useState } from 'react';

export default function Profile() {
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setMessage('');

    try {
      const res = await fetch('/api/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password: newPassword })
      });

      if (res.ok) {
        setMessage('Jelszó sikeresen megváltoztatva!');
        setNewPassword('');
      } else {
        const data = await res.json();
        setMessage(data.message || 'Hiba történt.');
      }
    } catch (err) {
      setMessage('Hálózati hiba');
    }
  };

  const handleLogout = () => {
    // pl. token törlése, átirányítás
    alert('Kijelentkezés');
  };

  return (
    <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '15vh' }}>
      <form onSubmit={handlePasswordChange} style={{ display: 'flex', flexDirection: 'column', width: '400px', fontSize: '20px', gap: '1rem' }}>
        <h2 style={{ textAlign: 'center' }}>Fiókom</h2>
        <input
          type="password"
          placeholder="Új jelszó"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          style={{ fontSize: '20px', padding: '0.5rem' }}
          required
        />
        <button type="submit" style={{ fontSize: '20px', padding: '0.5rem' }}>Jelszó módosítása</button>
        <button type="button" onClick={handleLogout} style={{ fontSize: '20px', padding: '0.5rem' }}>Kijelentkezés</button>
        {message && <p>{message}</p>}
      </form>
    </div>
  );
}
