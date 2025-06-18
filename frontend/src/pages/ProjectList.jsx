import React, { useEffect, useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

export default function ProjectList() {
  const [projects, setProjects] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [threadData, setThreadData] = useState({
    name: '',
    prompt: '',
    role: 'vezerszal',
    ai: 'GPT-4',
    watching: '',
    tags: ''
  });

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = () => {
    fetch('/api/projects')
      .then(res => res.json())
      .then(data => setProjects(data))
      .catch(err => console.error('Hiba a projektek lekérésekor:', err));
  };

  const createProject = () => {
    const newProject = {
      id: title.toLowerCase().replace(/\s+/g, '_'),
      title,
      description,
    };

    fetch('/api/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newProject),
    })
      .then(res => res.json())
      .then(() => {
        setTitle('');
        setDescription('');
        fetchProjects();
      })
      .catch(err => console.error('Hiba a projekt létrehozásakor:', err));
  };

  const createThread = (projectId) => {
    const payload = {
      id: threadData.name.toLowerCase().replace(/\s+/g, '_'),
      name: threadData.name,
      prompt: threadData.prompt,
      role: threadData.role,
      ai: threadData.ai,
      watching: threadData.watching.split(',').map(s => s.trim()),
      tags: threadData.tags.split(',').map(s => s.trim())
    };

    fetch(`/api/projects/${projectId}/threads`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    })
      .then(res => res.json())
      .then(() => {
        setThreadData({ name: '', prompt: '', role: 'vezerszal', ai: 'GPT-4', watching: '', tags: '' });
      })
      .catch(err => console.error('Hiba a szál létrehozásakor:', err));
  };

  return (
    <div className="p-4 grid gap-6 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold">📁 Projektek</h1>

      <div className="space-y-2">
        <Input placeholder="Projekt címe" value={title} onChange={e => setTitle(e.target.value)} />
        <Textarea placeholder="Leírás" value={description} onChange={e => setDescription(e.target.value)} />
        <Button onClick={createProject}>+ Új projekt létrehozása</Button>
      </div>

      <div className="grid gap-4 pt-4">
        {projects.map(project => (
          <Card key={project.id} className="hover:shadow-xl transition-shadow p-4">
            <CardContent>
              <h2 className="text-xl font-semibold">{project.title}</h2>
              <p className="text-sm text-gray-600">{project.description}</p>
              <p className="text-xs text-gray-400">🕓 {new Date(project.created_at).toLocaleString()}</p>
              <div className="mt-4 grid gap-2">
                <Input placeholder="Szál neve" value={threadData.name} onChange={e => setThreadData({ ...threadData, name: e.target.value })} />
                <Textarea placeholder="Prompt" value={threadData.prompt} onChange={e => setThreadData({ ...threadData, prompt: e.target.value })} />
                <Input placeholder="Szerepkör (vezerszal, ellenor...)" value={threadData.role} onChange={e => setThreadData({ ...threadData, role: e.target.value })} />
                <Input placeholder="AI modell (GPT-4...)" value={threadData.ai} onChange={e => setThreadData({ ...threadData, ai: e.target.value })} />
                <Input placeholder="Figyelt szálak (vesszővel)" value={threadData.watching} onChange={e => setThreadData({ ...threadData, watching: e.target.value })} />
                <Input placeholder="Címkék (vesszővel)" value={threadData.tags} onChange={e => setThreadData({ ...threadData, tags: e.target.value })} />
                <Button onClick={() => createThread(project.id)}>+ Új szál hozzáadása ehhez a projekthez</Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
