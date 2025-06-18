import React, { useEffect, useState } from "react";

export default function ProjectsPage() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const mockData = [
      { title: "Projekt A", description: "Dokumentáció készítése" },
      { title: "Projekt B", description: "Frontend fejlesztés" },
      { title: "Projekt C", description: "Tesztelés és hibajavítás" },
    ];
    setProjects(mockData);
  }, []);

  return (
    <div style={{ padding: "2rem", color: "black" }}>
      <h1 style={{ fontSize: "1.5rem", marginBottom: "1rem" }}>📁 Projektek</h1>
      <ul>
        {projects.map((project, i) => (
          <li key={i} style={{ padding: "1rem", border: "1px solid #ccc", marginBottom: "1rem", borderRadius: "4px" }}>
            <strong>{project.title}</strong> – {project.description}
          </li>
        ))}
      </ul>
      <a href="/main">⬅️ Vissza a főoldalra</a>
    </div>
  );
}
