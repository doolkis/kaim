const express = require('express');
const fs = require('fs');
const path = require('path');
const router = express.Router();

router.get('/', (req, res) => {
  const projectsDir = path.join(__dirname, '../projects');
  fs.readdir(projectsDir, (err, files) => {
    if (err) return res.status(500).json({ error: 'Hiba a projekt mappa olvasásakor.' });

    const projects = files
      .filter(file => fs.existsSync(path.join(projectsDir, file, 'meta.json')))
      .map(file => {
        const metaPath = path.join(projectsDir, file, 'meta.json');
        const meta = JSON.parse(fs.readFileSync(metaPath, 'utf-8'));
        return { id: file, ...meta };
      });

    res.json(projects);
  });
});

router.post('/', (req, res) => {
  const { id, title, description } = req.body;
  if (!id || !title) return res.status(400).json({ error: 'id és title kötelező mezők.' });

  const projectPath = path.join(__dirname, '../projects', id);
  const meta = {
    title,
    description: description || '',
    created_at: new Date().toISOString()
  };

  if (fs.existsSync(projectPath)) {
    return res.status(409).json({ error: 'Projekt már létezik.' });
  }

  fs.mkdirSync(projectPath, { recursive: true });
  fs.writeFileSync(path.join(projectPath, 'meta.json'), JSON.stringify(meta, null, 2));
  fs.mkdirSync(path.join(projectPath, 'threads'), { recursive: true });

  res.status(201).json({ message: 'Projekt létrehozva.', id, ...meta });
});

router.get('/:id/threads', (req, res) => {
  const projectId = req.params.id;
  const threadsDir = path.join(__dirname, '../projects', projectId, 'threads');

  if (!fs.existsSync(threadsDir)) {
    return res.status(404).json({ error: 'Nincs ilyen projekt vagy nincs threads mappa.' });
  }

  const files = fs.readdirSync(threadsDir);
  const threads = files
    .filter(file => file.endsWith('.json'))
    .map(file => {
      const threadPath = path.join(threadsDir, file);
      const data = JSON.parse(fs.readFileSync(threadPath, 'utf-8'));
      return data;
    });

  res.json(threads);
});

router.post('/:id/threads', (req, res) => {
  const projectId = req.params.id;
  const threadsDir = path.join(__dirname, '../projects', projectId, 'threads');
  const { id, name, ai, role, prompt, watching = [], tags = [] } = req.body;

  if (!fs.existsSync(threadsDir)) {
    return res.status(404).json({ error: 'Projekt vagy threads mappa nem létezik.' });
  }

  if (!id || !name || !ai || !prompt || !role) {
    return res.status(400).json({ error: 'id, name, ai, role és prompt kötelező mezők.' });
  }

  const threadPath = path.join(threadsDir, `${id}.json`);
  if (fs.existsSync(threadPath)) {
    return res.status(409).json({ error: 'Ez a szál már létezik.' });
  }

  const data = {
    id,
    name,
    ai,
    role,
    prompt,
    watching,
    tags,
    created_at: new Date().toISOString()
  };

  fs.writeFileSync(threadPath, JSON.stringify(data, null, 2));
  res.status(201).json({ message: 'Szál létrehozva.', ...data });
});

router.patch('/threads/:id', (req, res) => {
  const threadId = req.params.id;
  const { project } = req.query; // projekt azonosító lekérdezve paraméterből

  if (!project) {
    return res.status(400).json({ error: 'Hiányzó ?project= azonosító a lekérdezésben.' });
  }

  const threadPath = path.join(__dirname, '../projects', project, 'threads', `${threadId}.json`);
  if (!fs.existsSync(threadPath)) {
    return res.status(404).json({ error: 'Szál nem található.' });
  }

  const currentData = JSON.parse(fs.readFileSync(threadPath, 'utf-8'));
  const updatedData = { ...currentData, ...req.body };

  fs.writeFileSync(threadPath, JSON.stringify(updatedData, null, 2));
  res.json({ message: 'Szál frissítve.', ...updatedData });
});


router.get('/threads/:id/context', (req, res) => {
  const threadId = req.params.id;
  const { project } = req.query;

  if (!project) {
    return res.status(400).json({ error: 'Hiányzó ?project= paraméter.' });
  }

  const threadPath = path.join(__dirname, '../projects', project, 'threads', `${threadId}.json`);
  if (!fs.existsSync(threadPath)) {
    return res.status(404).json({ error: 'Szál nem található.' });
  }

  const threadData = JSON.parse(fs.readFileSync(threadPath, 'utf-8'));
  const context = [];

  for (const watchedId of threadData.watching || []) {
    const watchedPath = path.join(__dirname, '../projects', project, 'threads', `${watchedId}.json`);
    if (fs.existsSync(watchedPath)) {
      const watchedData = JSON.parse(fs.readFileSync(watchedPath, 'utf-8'));
      context.push({
        id: watchedData.id,
        prompt: watchedData.prompt
      });
    }
  }

  res.json({ thread: threadId, watching: threadData.watching, context });
});



module.exports = router;
