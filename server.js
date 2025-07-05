// require('dotenv').config(); // For OpenAI if needed

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const path = require('path');
const diagnose = require('./diagnosisLogic'); // Rule-based logic

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// ✅ Serve frontend files from /frontend
app.use(express.static(path.join(__dirname, '../frontend')));

// ✅ Serve index.html for GET /
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// ✅ Rule-based diagnosis route
app.post('/diagnose', (req, res) => {
  const { prakriti, symptoms, lifestyle } = req.body;
  const result = diagnose(prakriti, symptoms, lifestyle);
  res.json(result);
});

// 🔒 Optional: AI diagnosis route (currently commented)
// app.post('/ai-diagnose', ...)

const PORT = 3000;
app.listen(PORT, () => console.log(`✅ Server running at http://localhost:${PORT}`));
