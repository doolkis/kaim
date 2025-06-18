const express = require('express');
const app = express();
const PORT = 3000;
const projectsRoute = require('./routes/projects');


app.use(express.json());
app.use('/api/projects', projectsRoute);


app.get('/', (req, res) => {
  res.send('Hello from Kooperatív AI Műhely backend!');
});

app.post('/api/ask', (req, res) => {
  const { question, ai_id } = req.body;

  if (!question || question.trim().length < 3) {
    return res.status(400).json({ error: 'A kérdés túl rövid.' });
  }

  // Itt majd AI API-t hívunk – most csak demo válasz:
  const dummyAnswer = `(${ai_id.toUpperCase()}) válasz: Ez egy minta válasz a "${question}" kérdésre.`;

  res.json({
    answer: dummyAnswer,
    ai_name: ai_id,
    response_time: new Date().toISOString(),
  });
});


const fs = require('fs');
const path = require('path');

app.post('/api/save-question', (req, res) => {
  const { question, answer, project_id, thread_id, tags } = req.body;

  if (!question || !answer) {
    return res.status(400).json({ error: 'Hiányzó kérdés vagy válasz.' });
  }

  const entry = {
    id: 'q' + Date.now(),
    question,
    answer,
    ai: 'Mentett AI',
    created_at: new Date().toISOString(),
    tags: tags || []
  };

  const folder = path.join(__dirname, 'saved');
  const project = project_id || 'default';
  const thread = thread_id || 'thread_' + Date.now();
  const file = path.join(folder, `${project}__${thread}.json`);

  fs.mkdirSync(folder, { recursive: true });

  let content = [];
  if (fs.existsSync(file)) {
    content = JSON.parse(fs.readFileSync(file));
  }
  content.push(entry);

  fs.writeFileSync(file, JSON.stringify(content, null, 2));

  res.json({ success: true, saved_to: thread });
});



app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
