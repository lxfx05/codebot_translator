
import React, { useState, useEffect} from 'react';

function ChatBot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [client, setClient] = useState(null);
  const [sourceLang, setSourceLang] = useState('JavaScript');
  const [targetLang, setTargetLang] = useState('Python');

  const languages = [
    'JavaScript',
    'Python',
    'C++',
    'Java',
    'C#',
    'TypeScript',
    'Go',
    'Ruby',
    'PHP',
    'Swift'
  ];

  useEffect(() => {
    const openaiClient = new window.OpenAIClient();
    setClient(openaiClient);
}, []);

  const handleSend = async () => {
    if (!client ||!input.trim()) return;

    try {
      const selectedLanguages = [sourceLang, targetLang];
      const reply = await client.generateChatCompletion(input, selectedLanguages);
      setResponse(reply);
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
