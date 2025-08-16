
import React, { useState} from 'react';

function ChatBot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [sourceLang, setSourceLang] = useState('JavaScript');
  const [targetLang, setTargetLang] = useState('Python');

  const languages = [
    'JavaScript', 'Python', 'C++', 'Java', 'C#',
    'TypeScript', 'Go', 'Ruby', 'PHP', 'Swift'
  ];

  const handleSend = async () => {
    if (!input.trim()) return;

    const systemPrompt = `
Sei CodeBot, un assistente AI esperto nella traduzione di codice tra linguaggi di programmazione.
Traduci il codice da ${sourceLang} a ${targetLang}, seguendo le best practice del linguaggio di destinazione.
Includi commenti utili e un esempio di utilizzo se possibile.
Rispondi sempre in italiano.
`;

    try {
      const res = await fetch('https://codebot-translator-backend-oqph.onrender.com/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json'},
        body: JSON.stringify({
          message: `${systemPrompt}\n\nCodice da tradurre:\n${input}`
})
});

      const data = await res.json();
      setResponse(data.reply);
} catch (error) {
      setResponse(`❌ Errore: ${error.message}`);
}
};

  return (
    <div style={{ padding: '1rem', fontFamily: 'sans-serif'}}>
      <h2>🤖 Traduttore AI</h2>

      <div style={{ marginBottom: '1rem'}}>
        <label>Da: </label>
        <select value={sourceLang} onChange={(e) => setSourceLang(e.target.value)}>
          {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
        </select>

        <label style={{ marginLeft: '1rem'}}>A: </label>
        <select value={targetLang} onChange={(e) => setTargetLang(e.target.value)}>
          {languages.map(lang => <option key={lang} value={lang}>{lang}</option>)}
        </select>
      </div>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Scrivi il tuo codice qui..."
        rows={6}
        style={{ width: '100%', marginBottom: '1rem'}}
      />

      <button onClick={handleSend} style={{ padding: '0.5rem 1rem'}}>Invia</button>

      <div style={{ marginTop: '1rem'}}>
        <strong>Risposta:</strong>
        <pre style={{ background: '#f0f0f0', padding: '1rem'}}>{response}</pre>
      </div>
    </div>
);
}

export default ChatBot;
