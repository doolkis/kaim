export default function MainLayout() {
  return (
    <div className="flex h-screen">
      {/* Bal oszlop */}
      <aside className="w-[20%] bg-gray-100 p-4 space-y-4">
        <div>
          <h2 className="font-bold mb-2">Projektek</h2>
          <select className="w-full border p-1">
            <option>Projekt 1</option>
            <option>Projekt 2</option>
          </select>
        </div>
        <div>
          <h2 className="font-bold mb-2">Szálak</h2>
          <select className="w-full border p-1">
            <option>Szál 1</option>
            <option>Szál 2</option>
          </select>
        </div>
        <div>
          <h2 className="font-bold mb-2">Korábbi keresések</h2>
          <select className="w-full border p-1">
            <option>Kérdés 1</option>
            <option>Kérdés 2</option>
          </select>
        </div>
      </aside>

      {/* Középső tartalom */}
      <main className="w-[60%] p-6">
        <h1 className="text-2xl font-bold mb-4">Keresés</h1>
        <input
          type="text"
          placeholder="Írd be a kérdésed..."
          className="w-full p-2 border rounded"
        />
      </main>

      {/* Jobb oszlop */}
      <aside className="w-[20%] bg-gray-50 p-4">
        <h2 className="font-bold mb-4">Beállítások</h2>
        <button className="w-full mb-2 p-2 bg-blue-600 text-white rounded">Fiók létrehozás</button>
        <button className="w-full p-2 border rounded">Bejelentkezés</button>
      </aside>
    </div>
  );
}
