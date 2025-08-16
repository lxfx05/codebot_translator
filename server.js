
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fetch = require('node-fetch'); // Importa fetch per Node.js

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

const OPENAI_API_KEY = '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';

app.post('/api/chat', async (req, res) => {
  const userMessage = req.body.message;

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${OPENAI_API_KEY}`,
},
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [{ role: 'user', content: userMessage}],
}),
});

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || 'Nessuna risposta ricevuta.';
    res.json({ reply});
} catch (error) {
    console.error('Errore OpenAI:', error);
    res.status(500).json({ error: 'Errore nella richiesta a OpenAI.'});
}
});

app.listen(PORT, () => {
  console.log(`✅ Server avviato su porta ${PORT}`);
});
