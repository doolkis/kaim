import React from 'react';

const Layout = ({ children }) => {
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Bal oldali sáv */}
      <aside style={{ width: '20%', background: '#f0f0f0', padding: '10px' }}>
        <h3>Projektek</h3>
        <select><option>Kiválasztás...</option></select>
        <h3>Szálak</h3>
        <select><option>Kiválasztás...</option></select>
        <h3>Keresések</h3>
        <select><option>Kiválasztás...</option></select>
      </aside>

      {/* Középső tartalom */}
      <main style={{ flexGrow: 1, padding: '10px' }}>
        {children}
      </main>

      {/* Jobb oldali sáv */}
      <aside style={{ width: '20%', background: '#e0e0e0', padding: '10px' }}>
        <h3>Beállítások</h3>
        <button>Profil</button>
        <button>Fiók létrehozás</button>
      </aside>
    </div>
  );
};

export default Layout;
