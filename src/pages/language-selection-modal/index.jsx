import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import ModalHeader from './components/ModalHeader';
import LanguageGrid from './components/LanguageGrid';
import RequirementsInput from './components/RequirementsInput';
import ModalActions from './components/ModalActions';

const LanguageSelectionModal = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  // State management
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [requirements, setRequirements] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Available programming languages
  const availableLanguages = ['HTML', 'CSS', 'JavaScript', 'Ruby', 'Python', 'React'];
  
  // Mock intelligent recommendations based on context
  const [recommendedLanguages, setRecommendedLanguages] = useState([]);
  
  useEffect(() => {
    // Simulate intelligent language recommendation based on context
    const contextQuery = location?.state?.query || '';
    const recommendations = getLanguageRecommendations(contextQuery);
    setRecommendedLanguages(recommendations);
    
    // Pre-select if coming from a specific context
    if (location?.state?.suggestedLanguage) {
      setSelectedLanguage(location?.state?.suggestedLanguage);
    }
  }, [location?.state]);

  const getLanguageRecommendations = (query) => {
    const queryLower = query?.toLowerCase();
    const recommendations = [];
    
    if (queryLower?.includes('web') || queryLower?.includes('sito') || queryLower?.includes('pagina')) {
      recommendations?.push('HTML', 'CSS', 'JavaScript');
    }
    if (queryLower?.includes('react') || queryLower?.includes('componente') || queryLower?.includes('jsx')) {
      recommendations?.push('React', 'JavaScript');
    }
    if (queryLower?.includes('python') || queryLower?.includes('data') || queryLower?.includes('analisi')) {
      recommendations?.push('Python');
    }
    if (queryLower?.includes('ruby') || queryLower?.includes('rails')) {
      recommendations?.push('Ruby');
    }
    if (queryLower?.includes('style') || queryLower?.includes('design') || queryLower?.includes('layout')) {
      recommendations?.push('CSS');
    }
    
    // Default recommendations if no specific context
    if (recommendations?.length === 0) {
      return ['JavaScript', 'Python', 'React'];
    }
    
    return [...new Set(recommendations)]; // Remove duplicates
  };

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleConfirm = async () => {
    if (!selectedLanguage) return;
    
    setIsLoading(true);
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    // Navigate back to main chat with selected language
    navigate('/main-chat-interface', {
      state: {
        selectedLanguage,
        requirements,
        timestamp: new Date()?.toISOString()
      }
    });
  };

  const handleCancel = () => {
    navigate(-1); // Go back to previous page
  };

  const handleClose = () => {
    navigate('/main-chat-interface');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl mx-4 bg-surface ridge-border shadow-lg">
        {/* Modal Content */}
        <div className="p-6">
          {/* Header */}
          <ModalHeader onClose={handleClose} />
          
          {/* Language Selection Grid */}
          <LanguageGrid
            languages={availableLanguages}
            recommendedLanguages={recommendedLanguages}
            onLanguageSelect={handleLanguageSelect}
          />
          
          {/* Selected Language Display */}
          {selectedLanguage && (
            <div className="mb-4 p-3 bg-primary/20 ridge-border">
              <div className="flex items-center space-x-2">
                <div className="w-4 h-4 bg-accent ridge-border"></div>
                <span className="text-sm font-bold text-text-primary font-caption">
                  Linguaggio selezionato: {selectedLanguage}
                </span>
              </div>
            </div>
          )}
          
          {/* Requirements Input */}
          <RequirementsInput
            value={requirements}
            onChange={setRequirements}
          />
          
          {/* Action Buttons */}
          <ModalActions
            onConfirm={handleConfirm}
            onCancel={handleCancel}
            selectedLanguage={selectedLanguage}
            isLoading={isLoading}
          />
        </div>
        
        {/* Status Bar */}
        <div className="h-6 bg-surface border-t border-border flex items-center justify-between px-3">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <div className="w-2 h-2 bg-success rounded-full"></div>
              <span className="text-xs font-caption text-text-secondary">
                {selectedLanguage ? `${selectedLanguage} selezionato` : 'Nessuna selezione'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <span className="text-xs font-caption text-text-secondary">
              {availableLanguages?.length} linguaggi disponibili
            </span>
            <div className="w-px h-3 bg-border"></div>
            <span className="text-xs font-caption text-text-secondary">
              {new Date()?.toLocaleDateString('it-IT')}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelectionModal;