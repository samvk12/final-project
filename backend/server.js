require('dotenv').config(); // Load the .env file

const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { OpenAI } = require('openai');
const diagnose = require('./diagnosisLogic'); // your rule-based logic

const app = express();
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY }); // Init OpenAI

app.use(cors());
app.use(bodyParser.json());
app.use(express.static('public')); // or wherever your frontend is served from

app.post('/diagnose', (req, res) => {
  const { prakriti, symptoms, lifestyle } = req.body;
  const result = diagnose(prakriti, symptoms, lifestyle);
  res.json(diagnose(prakriti, symptoms, lifestyle));

});

app.post('/ai-diagnose', async (req, res) => {
  const { prakriti, symptoms, lifestyle } = req.body;

  const prompt = `
You are an Ayurvedic doctor. Based on the user's prakriti (${prakriti}), the following symptoms: ${symptoms.join(', ')}, and their lifestyle description: "${lifestyle}", provide a personalized diagnosis, and recommend foods to eat, yoga practices, and a tip for daily routine. Use bullet points and traditional Ayurvedic reasoning.
`;

  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo', // ✅ Everyone with a free OpenAI API key has access to this
      messages: [{ role: 'user', content: prompt }],
      temperature: 0.7
    });

    const message = response.choices[0].message.content;
    res.json({ aiAdvice: message });
  } catch (error) {
    console.error('AI Error:', error.message);
    res.status(500).json({ aiAdvice: 'Sorry, the AI could not generate advice at this time.' });
  }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`));
