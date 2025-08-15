import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import ChatWindow from './components/ChatWindow';
import ChatInput from './components/ChatInput';
import LanguageSelector from './components/LanguageSelector';

const MainChatInterface = () => {
  const [messages, setMessages] = useState([]);
  const [selectedLanguages, setSelectedLanguages] = useState(['javascript', 'react']);
  const [suggestedLanguages, setSuggestedLanguages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Mock conversation data
  const mockMessages = [
    {
      id: 1,
      sender: 'user',
      text: 'Crea una funzione JavaScript per validare un indirizzo email',
      timestamp: new Date(Date.now() - 300000),
    },
    {
      id: 2,
      sender: 'bot',
      text: 'Ecco una funzione JavaScript completa per la validazione email con regex pattern:',
      code: `function validateEmail(email) {
  // Regex pattern per validazione email RFC 5322 compliant
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_\`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/;
  
  // Controllo se l'email è vuota o null
  if (!email || email.trim() === '') {
    return {
      isValid: false,
      error: 'Email è richiesta'
    };
  }
  
  // Controllo lunghezza massima
  if (email.length > 254) {
    return {
      isValid: false,
      error: 'Email troppo lunga (max 254 caratteri)'
    };
  }
  
  // Test con regex
  const isValid = emailRegex.test(email);
  
  return {
    isValid: isValid,
    error: isValid ? null : 'Formato email non valido'
  };
}

// Esempi di utilizzo:
console.log(validateEmail('test@example.com')); // { isValid: true, error: null }
console.log(validateEmail('invalid-email'));    // { isValid: false, error: 'Formato email non valido' }
console.log(validateEmail(''));                 // { isValid: false, error: 'Email è richiesta' }`,
      language: 'javascript',
      complexity: 2,
      timestamp: new Date(Date.now() - 240000),
    }
  ];

  useEffect(() => {
    // Load mock messages after a short delay to simulate real chat
    const timer = setTimeout(() => {
      setMessages(mockMessages);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleSendMessage = async (messageData) => {
    const userMessage = {
      id: Date.now(),
      sender: 'user',
      text: messageData?.text,
      attachment: messageData?.attachment,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI processing delay
    setTimeout(() => {
      const botResponse = generateMockResponse(messageData?.text);
      setMessages(prev => [...prev, botResponse]);
      setIsLoading(false);
      
      // Update suggested languages based on response
      if (botResponse?.language) {
        setSuggestedLanguages(prev => {
          const newSuggested = [...prev];
          if (!newSuggested?.includes(botResponse?.language)) {
            newSuggested?.push(botResponse?.language);
          }
          return newSuggested?.slice(-3); // Keep only last 3 suggestions
        });
      }
    }, 2000 + Math.random() * 2000);
  };

  const generateMockResponse = (userText) => {
    const responses = [
      {
        text: 'Ecco un componente React per un form di login con validazione:',
        code: `import React, { useState } from 'react';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.email) {
      newErrors.email = 'Email è richiesta';
    } else if (!/\\S+@\\S+\\.\\S+/.test(formData.email)) {
      newErrors.email = 'Email non valida';
    }
    
    if (!formData.password) {
      newErrors.password = 'Password è richiesta';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password deve essere almeno 6 caratteri';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    try {
      // Simula chiamata API
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Login successful:', formData);
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">Accedi</h2>
      
      <div className="mb-4">
        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={\`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 \${
            errors.email ? 'border-red-500' : 'border-gray-300'
          }\`}
          placeholder="Inserisci la tua email"
        />
        {errors.email && (
          <p className="mt-1 text-sm text-red-600">{errors.email}</p>
        )}
      </div>

      <div className="mb-6">
        <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
          Password
        </label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={\`w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 \${
            errors.password ? 'border-red-500' : 'border-gray-300'
          }\`}
          placeholder="Inserisci la tua password"
        />
        {errors.password && (
          <p className="mt-1 text-sm text-red-600">{errors.password}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Accesso in corso...' : 'Accedi'}
      </button>
    </form>
  );
};

export default LoginForm;`,
        language: 'react',
        complexity: 3
      },
      {
        text: 'Ecco una funzione Python per ordinare una lista di dizionari:',
        code: `def sort_dict_list(data, key_name, reverse=False):
    """
    Ordina una lista di dizionari basandosi su una chiave specifica.
    
    Args:
        data (list): Lista di dizionari da ordinare
        key_name (str): Nome della chiave per l'ordinamento
        reverse (bool): Se True, ordina in modo decrescente
    
    Returns:
        list: Lista ordinata di dizionari
    
    Raises:
        ValueError: Se la lista è vuota o la chiave non esiste
    """
    
    if not data:
        raise ValueError("La lista non può essere vuota")
    
    # Verifica che tutti i dizionari abbiano la chiave richiesta
    for item in data:
        if not isinstance(item, dict):
            raise ValueError("Tutti gli elementi devono essere dizionari")
        if key_name not in item:
            raise ValueError(f"La chiave '{key_name}' non esiste in tutti i dizionari")
    
    try:
        # Ordina la lista usando la chiave specificata
        sorted_data = sorted(data, key=lambda x: x[key_name], reverse=reverse)
        return sorted_data
    
    except TypeError as e:
        raise ValueError(f"Impossibile ordinare: {str(e)}")

# Esempi di utilizzo:
if __name__ == "__main__":
    # Dati di esempio
    studenti = [
        {"nome": "Marco", "voto": 85, "età": 20},
        {"nome": "Anna", "voto": 92, "età": 19},
        {"nome": "Luigi", "voto": 78, "età": 21},
        {"nome": "Sofia", "voto": 96, "età": 18}
    ]
    
    # Ordina per voto (crescente)
    print("Ordinati per voto (crescente):")
    for studente in sort_dict_list(studenti, "voto"):
        print(f"{studente['nome']}: {studente['voto']}")
    
    print("\\n" + "="*40 + "\\n")
    
    # Ordina per età (decrescente)
    print("Ordinati per età (decrescente):")
    for studente in sort_dict_list(studenti, "età", reverse=True):
        print(f"{studente['nome']}: {studente['età']} anni")
    
    print("\\n" + "="*40 + "\\n")
    
    # Ordina per nome (alfabetico)
    print("Ordinati per nome (alfabetico):")
    for studente in sort_dict_list(studenti, "nome"):
        print(f"{studente['nome']}: {studente['voto']} punti")`,
        language: 'python',
        complexity: 2
      },
      {
        text: 'Ecco un layout CSS responsive a 3 colonne con Flexbox:',
        code: `/* Layout CSS Responsive a 3 Colonne */

/* Reset e base styles */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Arial', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f4f4f4;
}

/* Container principale */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

/* Layout a 3 colonne con Flexbox */
.three-column-layout {
  display: flex;
  gap: 20px;
  min-height: 80vh;
  flex-wrap: wrap;
}

/* Colonna sinistra (sidebar) */
.left-column {
  flex: 0 0 250px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

/* Colonna centrale (contenuto principale) */
.main-column {
  flex: 1;
  background-color: #fff;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-width: 300px;
}

/* Colonna destra (sidebar secondaria) */
.right-column {
  flex: 0 0 250px;
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  height: fit-content;
}

/* Stili per i titoli */
.column-title {
  font-size: 1.5rem;
  margin-bottom: 15px;
  color: #2c3e50;
  border-bottom: 2px solid #3498db;
  padding-bottom: 10px;
}

/* Stili per il contenuto */
.column-content {
  font-size: 1rem;
  line-height: 1.8;
}

/* Lista nella sidebar */
.sidebar-list {
  list-style: none;
}

.sidebar-list li {
  padding: 10px 0;
  border-bottom: 1px solid #eee;
}

.sidebar-list li:last-child {
  border-bottom: none;
}

.sidebar-list a {
  text-decoration: none;
  color: #3498db;
  transition: color 0.3s ease;
}

.sidebar-list a:hover {
  color: #2980b9;
}

/* Responsive Design */

/* Tablet (768px - 1023px) */
@media screen and (max-width: 1023px) {
  .three-column-layout {
    flex-direction: column;
  }
  
  .left-column,
  .right-column {
    flex: none;
    order: 2;
  }
  
  .main-column {
    order: 1;
  }
}

/* Mobile (max 767px) */
@media screen and (max-width: 767px) {
  .container {
    padding: 10px;
  }
  
  .three-column-layout {
    gap: 15px;
  }
  
  .left-column,
  .main-column,
  .right-column {
    padding: 15px;
  }
  
  .column-title {
    font-size: 1.3rem;
  }
  
  .column-content {
    font-size: 0.9rem;
  }
}

/* Mobile piccolo (max 480px) */
@media screen and (max-width: 480px) {
  .container {
    padding: 5px;
  }
  
  .left-column,
  .main-column,
  .right-column {
    padding: 10px;
  }
  
  .column-title {
    font-size: 1.2rem;
    margin-bottom: 10px;
  }
}

/* Utility classes */
.text-center {
  text-align: center;
}

.mb-20 {
  margin-bottom: 20px;
}

.highlight {
  background-color: #f39c12;
  color: white;
  padding: 2px 6px;
  border-radius: 3px;
}`,
        language: 'css',
        complexity: 2
      }
    ];

    const randomResponse = responses?.[Math.floor(Math.random() * responses?.length)];
    
    return {
      id: Date.now() + 1,
      sender: 'bot',
      text: randomResponse?.text,
      code: randomResponse?.code,
      language: randomResponse?.language,
      complexity: randomResponse?.complexity,
      timestamp: new Date(),
    };
  };

  const handleLanguageToggle = (languageId) => {
    setSelectedLanguages(prev => {
      if (prev?.includes(languageId)) {
        return prev?.filter(id => id !== languageId);
      } else {
        return [...prev, languageId];
      }
    });
  };

  const handleCopyCode = (messageId) => {
    // Show temporary feedback
    console.log(`Codice copiato per messaggio ${messageId}`);
  };

  const handleFileUpload = (file) => {
    console.log('File caricato:', file?.name);
  };

  const handleSettingsClick = () => {
    window.location.href = '/settings-and-preferences';
  };

  return (
    <div className="min-h-screen bg-background">
      <Header onSettingsClick={handleSettingsClick} />
      
      <main className="pt-14 h-screen flex flex-col">
        <div className="flex-1 flex overflow-hidden">
          {/* Main Chat Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <ChatWindow
              messages={messages}
              onCopyCode={handleCopyCode}
              isLoading={isLoading}
            />
            
            <ChatInput
              onSendMessage={handleSendMessage}
              onFileUpload={handleFileUpload}
              disabled={isLoading}
            />
          </div>

          {/* Language Selector - Desktop */}
          <div className="hidden lg:block">
            <LanguageSelector
              selectedLanguages={selectedLanguages}
              onLanguageToggle={handleLanguageToggle}
              suggestedLanguages={suggestedLanguages}
            />
          </div>
        </div>

        {/* Mobile Language Selector */}
        <div className="lg:hidden">
          {isMobileMenuOpen && (
            <div className="border-t border-border">
              <LanguageSelector
                selectedLanguages={selectedLanguages}
                onLanguageToggle={handleLanguageToggle}
                suggestedLanguages={suggestedLanguages}
              />
            </div>
          )}
          
          {/* Mobile Toggle Button */}
          <div className="p-2 bg-surface border-t border-border">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="w-full p-2 ridge-border bg-primary text-text-primary font-caption text-sm"
            >
              {isMobileMenuOpen ? 'Nascondi Linguaggi' : 'Mostra Linguaggi'}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default MainChatInterface;