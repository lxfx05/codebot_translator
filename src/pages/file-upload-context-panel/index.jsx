import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/ui/Header';
import FileUploadZone from './components/FileUploadZone';
import FileList from './components/FileList';
import ContextDescription from './components/ContextDescription';
import ProcessingStatus from './components/ProcessingStatus';
import PanelHeader from './components/PanelHeader';
import ActionButtons from './components/ActionButtons';
import Icon from '../../components/AppIcon';

const FileUploadContextPanel = () => {
  const navigate = useNavigate();
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [contextDescription, setContextDescription] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingProgress, setProcessingProgress] = useState(0);
  const [statusMessage, setStatusMessage] = useState('');
  const [isMinimized, setIsMinimized] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // Mock processing simulation
  useEffect(() => {
    if (isProcessing) {
      const interval = setInterval(() => {
        setProcessingProgress(prev => {
          if (prev >= 100) {
            setIsProcessing(false);
            setStatusMessage('File analizzati con successo! Contesto pronto per la generazione del codice.');
            clearInterval(interval);
            return 100;
          }
          return prev + 10;
        });
      }, 200);

      return () => clearInterval(interval);
    }
  }, [isProcessing]);

  const handleFilesUpload = (files) => {
    const newFiles = files?.filter(file => {
      const isDuplicate = uploadedFiles?.some(existing => 
        existing?.name === file?.name && existing?.size === file?.size
      );
      return !isDuplicate;
    });

    if (newFiles?.length > 0) {
      setUploadedFiles(prev => [...prev, ...newFiles]);
      setStatusMessage(`${newFiles?.length} file${newFiles?.length > 1 ? '' : ''} caricato${newFiles?.length > 1 ? 'i' : ''} con successo`);
      
      // Auto-clear status message after 3 seconds
      setTimeout(() => setStatusMessage(''), 3000);
    }
  };

  const handleRemoveFile = (index) => {
    setUploadedFiles(prev => prev?.filter((_, i) => i !== index));
    setStatusMessage('File rimosso');
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const handleClearAll = () => {
    setUploadedFiles([]);
    setContextDescription('');
    setStatusMessage('Tutti i file sono stati rimossi');
    setTimeout(() => setStatusMessage(''), 2000);
  };

  const handleApplyContext = () => {
    setIsProcessing(true);
    setProcessingProgress(0);
    setStatusMessage('Analisi del contesto in corso...');
    
    // Simulate context processing
    setTimeout(() => {
      // Store context in localStorage for other components to access
      const contextData = {
        files: uploadedFiles?.map(file => ({
          name: file?.name,
          type: file?.type,
          size: file?.size
        })),
        description: contextDescription,
        timestamp: new Date()?.toISOString()
      };
      
      localStorage.setItem('codebot_context', JSON.stringify(contextData));
      
      // Navigate to main chat with context applied
      navigate('/main-chat-interface', { 
        state: { 
          contextApplied: true,
          message: `Contesto applicato: ${uploadedFiles?.length} file e descrizione personalizzata`
        }
      });
    }, 2000);
  };

  const handleClosePanel = () => {
    setIsPanelOpen(false);
    navigate('/main-chat-interface');
  };

  const handleMinimizePanel = () => {
    setIsMinimized(!isMinimized);
  };

  if (!isPanelOpen) return null;

  return (
    <div className="min-h-screen bg-background">
      <Header onSettingsClick={() => {}} />
      <div className="pt-14 flex">
        {/* Main Content Area */}
        <div className="flex-1 p-4">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb Navigation */}
            <div className="mb-6 p-2 bg-surface ridge-border">
              <div className="flex items-center space-x-2 text-sm font-caption">
                <button 
                  onClick={() => navigate('/main-chat-interface')}
                  className="text-accent hover:underline"
                >
                  Chat Principale
                </button>
                <Icon name="ChevronRight" size={12} />
                <span className="text-text-primary">Pannello Caricamento File</span>
              </div>
            </div>

            {/* Welcome Message */}
            <div className="mb-6 p-4 bg-surface ridge-border">
              <div className="flex items-start space-x-3">
                <div className="p-2 bg-accent ridge-border">
                  <Icon name="Info" size={20} color="var(--color-accent-foreground)" />
                </div>
                <div>
                  <h1 className="text-lg font-bold font-heading text-text-primary mb-2">
                    Pannello di Caricamento File e Contesto
                  </h1>
                  <p className="text-sm font-caption text-text-secondary">
                    Carica file di riferimento (immagini, documenti, codice esistente) per fornire contesto aggiuntivo 
                    al CodeBot Translator. Questo migliorerà la precisione della generazione del codice basandosi sui 
                    tuoi materiali di riferimento.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Side Panel */}
        <div className={`${isMinimized ? 'w-12' : 'w-96'} bg-surface border-l-2 border-border transition-all duration-300`}>
          <PanelHeader 
            onClose={handleClosePanel}
            onMinimize={handleMinimizePanel}
            isMinimized={isMinimized}
          />
          
          {!isMinimized && (
            <div className="p-4 h-[calc(100vh-8rem)] overflow-y-auto">
              {/* File Upload Zone */}
              <FileUploadZone onFilesUpload={handleFilesUpload} />
              
              {/* File List */}
              <div className="mb-6">
                <div className="flex items-center space-x-2 mb-3">
                  <div className="p-1 bg-accent ridge-border">
                    <Icon name="Files" size={16} color="var(--color-accent-foreground)" />
                  </div>
                  <h3 className="text-sm font-bold font-heading text-text-primary">
                    File Caricati ({uploadedFiles?.length})
                  </h3>
                </div>
                <FileList files={uploadedFiles} onRemoveFile={handleRemoveFile} />
              </div>
              
              {/* Context Description */}
              <div className="mb-6">
                <ContextDescription 
                  value={contextDescription}
                  onChange={setContextDescription}
                  placeholder="Esempio: 'Genera componenti React che seguano lo stile del mockup caricato' o 'Crea funzioni Python simili al codice di esempio fornito'"
                />
              </div>
              
              {/* Processing Status */}
              <ProcessingStatus 
                isProcessing={isProcessing}
                progress={processingProgress}
                statusMessage={statusMessage}
              />
              
              {/* Action Buttons */}
              <ActionButtons 
                onClearAll={handleClearAll}
                onApplyContext={handleApplyContext}
                hasFiles={uploadedFiles?.length > 0}
                contextDescription={contextDescription}
                isProcessing={isProcessing}
              />
            </div>
          )}
        </div>
      </div>
      {/* Mobile Overlay for smaller screens */}
      <div className="lg:hidden fixed inset-0 bg-black/50 z-40" onClick={handleClosePanel}>
        <div className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-surface" onClick={e => e?.stopPropagation()}>
          <PanelHeader 
            onClose={handleClosePanel}
            onMinimize={handleMinimizePanel}
            isMinimized={false}
          />
          
          <div className="p-4 h-[calc(100vh-4rem)] overflow-y-auto">
            <FileUploadZone onFilesUpload={handleFilesUpload} />
            
            <div className="mb-4">
              <h3 className="text-sm font-bold font-heading text-text-primary mb-2">
                File Caricati ({uploadedFiles?.length})
              </h3>
              <FileList files={uploadedFiles} onRemoveFile={handleRemoveFile} />
            </div>
            
            <div className="mb-4">
              <ContextDescription 
                value={contextDescription}
                onChange={setContextDescription}
                placeholder="Esempio: 'Genera componenti React che seguano lo stile del mockup caricato' o 'Crea funzioni Python simili al codice di esempio fornito'"
              />
            </div>
            
            <ProcessingStatus 
              isProcessing={isProcessing}
              progress={processingProgress}
              statusMessage={statusMessage}
            />
            
            <ActionButtons 
              onClearAll={handleClearAll}
              onApplyContext={handleApplyContext}
              hasFiles={uploadedFiles?.length > 0}
              contextDescription={contextDescription}
              isProcessing={isProcessing}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploadContextPanel;