import React, { useState, useEffect } from 'react';
import Header from '../../components/ui/Header';
import CodeBlock from './components/CodeBlock';
import OutputHeader from './components/OutputHeader';
import EmptyState from './components/EmptyState';
import StatusBar from './components/StatusBar';

const CodeOutputDisplay = () => {
  const [codeBlocks, setCodeBlocks] = useState([]);
  const [viewMode, setViewMode] = useState('expanded');
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock data for demonstration
  useEffect(() => {
    // Simulate some generated code blocks
    const mockCodeBlocks = [
      {
        id: 1,
        code: `function validateEmail(email) {
  const emailRegex = /^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/;
  return emailRegex.test(email);
}

// Esempio di utilizzo
const email = "utente@esempio.com";
if (validateEmail(email)) {
  console.log("Email valida");
} else {
  console.log("Email non valida");
}`,
        language: 'JavaScript',
        complexity: 'low',
        executionTime: 45,
        isValid: true,
        warnings: [],
        timestamp: new Date(Date.now() - 300000)
      },
      {
        id: 2,
        code: `import React, { useState } from 'react';

const LoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newErrors = {};
    if (!email) newErrors.email = 'Email richiesta';
    if (!password) newErrors.password = 'Password richiesta';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length === 0) {
      console.log('Login:', { email, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.email && <span className="text-red-500">{errors.email}</span>}
      </div>
      
      <div>
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full p-2 border rounded"
        />
        {errors.password && <span className="text-red-500">{errors.password}</span>}
      </div>
      
      <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
        Accedi
      </button>
    </form>
  );
};

export default LoginForm;`,
        language: 'React',
        complexity: 'medium',
        executionTime: 120,
        isValid: true,
        warnings: ['Considera l\'aggiunta di validazione lato client più robusta'],
        timestamp: new Date(Date.now() - 600000)
      },
      {
        id: 3,
        code: `import pandas as pd
import csv

def read_csv_file(file_path, encoding='utf-8'):
    """
    Legge un file CSV e restituisce un DataFrame pandas
    
    Args:
        file_path (str): Percorso del file CSV
        encoding (str): Codifica del file (default: utf-8)
    
    Returns:
        pd.DataFrame: DataFrame contenente i dati del CSV
    """
    try:
        # Leggi il file CSV
        df = pd.read_csv(file_path, encoding=encoding)
        
        # Informazioni di base sul dataset
        print(f"File caricato: {file_path}")
        print(f"Dimensioni: {df.shape[0]} righe, {df.shape[1]} colonne")
        print(f"Colonne: {list(df.columns)}")
        
        # Mostra le prime 5 righe
        print("\\nPrime 5 righe:")
        print(df.head())
        
        return df
        
    except FileNotFoundError:
        print(f"Errore: File {file_path} non trovato")
        return None
    except pd.errors.EmptyDataError:
        print("Errore: Il file CSV è vuoto")
        return None
    except Exception as e:
        print(f"Errore durante la lettura: {str(e)}")
        return None

# Esempio di utilizzo
if __name__ == "__main__":
    file_path = "dati.csv"
    dataframe = read_csv_file(file_path)
    
    if dataframe is not None:
        # Operazioni aggiuntive sui dati
        print("\\nStatistiche descrittive:")
        print(dataframe.describe())`,
        language: 'Python',
        complexity: 'medium',
        executionTime: 85,
        isValid: true,
        warnings: ['Assicurati che pandas sia installato: pip install pandas'],
        timestamp: new Date(Date.now() - 900000)
      }
    ];

    // Simulate loading delay
    setTimeout(() => {
      setCodeBlocks(mockCodeBlocks);
    }, 500);
  }, []);

  const handleCopy = (blockId) => {
    console.log(`Codice copiato per il blocco ${blockId}`);
  };

  const handleExport = (blockId) => {
    const block = codeBlocks?.find(b => b?.id === blockId);
    if (block) {
      const blob = new Blob([block.code], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `code_${block?.language?.toLowerCase()}_${blockId}.txt`;
      document.body?.appendChild(a);
      a?.click();
      document.body?.removeChild(a);
      URL.revokeObjectURL(url);
    }
  };

  const handleRunInVSCode = (blockId) => {
    console.log(`Apertura in VS Code per il blocco ${blockId}`);
    // In a real implementation, this would integrate with VS Code
    alert('Funzionalità VS Code in sviluppo');
  };

  const handleClearAll = () => {
    if (window.confirm('Sei sicuro di voler eliminare tutti i blocchi di codice?')) {
      setCodeBlocks([]);
    }
  };

  const handleExportAll = () => {
    if (codeBlocks?.length === 0) return;

    const allCode = codeBlocks?.map(block => 
      `// ${block?.language} - Generato il ${block?.timestamp?.toLocaleString('it-IT')}\n${block?.code}\n\n`
    )?.join('');

    const blob = new Blob([allCode], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `codebot_export_${new Date()?.toISOString()?.split('T')?.[0]}.txt`;
    document.body?.appendChild(a);
    a?.click();
    document.body?.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleToggleView = () => {
    setViewMode(viewMode === 'expanded' ? 'compact' : 'expanded');
  };

  const handleNavigateToChat = () => {
    window.location.href = '/main-chat-interface';
  };

  const handleSettingsClick = () => {
    console.log('Settings clicked');
    // Add settings functionality here
  };

  // Calculate statistics
  const totalLines = codeBlocks?.reduce((sum, block) => 
    sum + block?.code?.split('\n')?.length, 0
  );
  
  const totalCharacters = codeBlocks?.reduce((sum, block) => 
    sum + block?.code?.length, 0
  );
  
  const lastGenerated = codeBlocks?.length > 0 
    ? new Date(Math.max(...codeBlocks.map(b => b.timestamp.getTime())))
    : null;

  return (
    <div className="min-h-screen bg-background">
      <Header onSettingsClick={handleSettingsClick} />
      {/* Main Content */}
      <div className="pt-14 pb-6">
        <OutputHeader
          totalBlocks={codeBlocks?.length}
          onClearAll={handleClearAll}
          onExportAll={handleExportAll}
          onToggleView={handleToggleView}
          viewMode={viewMode}
        />
        
        {/* Code Blocks Container */}
        <div className="p-4 space-y-4 max-w-7xl mx-auto">
          {codeBlocks?.length === 0 ? (
            <EmptyState onNavigateToChat={handleNavigateToChat} />
          ) : (
            <div className={`space-y-4 ${viewMode === 'compact' ? 'grid grid-cols-1 lg:grid-cols-2 gap-4' : ''}`}>
              {codeBlocks?.map((block) => (
                <CodeBlock
                  key={block?.id}
                  code={block?.code}
                  language={block?.language}
                  complexity={block?.complexity}
                  executionTime={block?.executionTime}
                  isValid={block?.isValid}
                  warnings={block?.warnings}
                  onCopy={() => handleCopy(block?.id)}
                  onExport={() => handleExport(block?.id)}
                  onRunInVSCode={() => handleRunInVSCode(block?.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
      <StatusBar
        totalLines={totalLines}
        totalCharacters={totalCharacters}
        lastGenerated={lastGenerated}
        isProcessing={isProcessing}
      />
    </div>
  );
};

export default CodeOutputDisplay;