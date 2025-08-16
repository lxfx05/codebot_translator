
import React, { useState, useEffect} from 'react';

function ChatBot() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [client, setClient] = useState(null);

  useEffect(() => {
    // Inizializza il client OpenAI
    const openaiClient = new window.OpenAIClient();
    setClient(openaiClient);
}, []);

  const handleSend = async () => {
    if (!client) return;

    try {
      const reply = await client.generateChatCompletion(input, ['JavaScript', 'Python']); // puoi cambiare le lingue
      setResponse(reply);
} catch (error) {
      setResponse(`❌ Errore: ${error.message}`);
}
};

  return (
    <div className="chat-container">
      <h2>Traduttore AI</h2>
      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Scrivi il tuo codice qui..."
        rows={6}
        style={{ width: '100%'}}
      />
      <button onClick={handleSend}>Invia</button>
      <div className="response">
        <strong>Risposta:</strong>
        <pre>{response}</pre>
      </div>
    </div>
);
}

