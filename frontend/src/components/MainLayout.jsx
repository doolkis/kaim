import React from 'react';

export default function MainLayout({ left, center, right }) {
  return (
    <div className="grid grid-cols-5 h-screen bg-white text-black">
      <aside className="col-span-1 p-4 border-r overflow-y-auto">{left}</aside>
      <main className="col-span-3 p-4 overflow-y-auto">{center}</main>
      <aside className="col-span-1 p-4 border-l overflow-y-auto">{right}</aside>
    </div>
  );
}
