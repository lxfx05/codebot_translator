import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import Icon from '../../components/AppIcon';
import CodeFormattingTab from './components/CodeFormattingTab';
import LanguageSettingsTab from './components/LanguageSettingsTab';
import LocalizationTab from './components/LocalizationTab';
import ExportPreferencesTab from './components/ExportPreferencesTab';
import AdvancedSettingsTab from './components/AdvancedSettingsTab';

const SettingsAndPreferences = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('formatting');
  const [isMinimized, setIsMinimized] = useState(false);

  // Code Formatting Settings
  const [indentationType, setIndentationType] = useState('spaces');
  const [indentationSize, setIndentationSize] = useState(2);
  const [lineLength, setLineLength] = useState(80);
  const [commentVerbosity, setCommentVerbosity] = useState('standard');
  const [includeTypeHints, setIncludeTypeHints] = useState(true);
  const [includeDocstrings, setIncludeDocstrings] = useState(true);
  const [autoFormat, setAutoFormat] = useState(true);

  // Language Settings
  const [defaultLanguages, setDefaultLanguages] = useState(['javascript', 'python', 'react']);
  const [frameworkPreferences, setFrameworkPreferences] = useState({
    javascript: 'Vanilla JS',
    python: 'Django',
    react: 'Vite',
    css: 'Tailwind CSS'
  });
  const [versionPreferences, setVersionPreferences] = useState({
    python: '3.11',
    nodejs: '18.x',
    react: '18.x',
    ruby: '3.2'
  });
  const [codingStyleGuides, setCodingStyleGuides] = useState({
    javascript: 'ESLint Standard',
    python: 'PEP 8',
    react: 'React/JSX',
    css: 'BEM'
  });

  // Localization Settings
  const [interfaceLanguage, setInterfaceLanguage] = useState('it');
  const [dateFormat, setDateFormat] = useState('DD/MM/YYYY');
  const [numberFormat, setNumberFormat] = useState('european');
  const [timeFormat, setTimeFormat] = useState('24h');
  const [currency, setCurrency] = useState('EUR');
  const [timezone, setTimezone] = useState('Europe/Rome');

  // Export Preferences
  const [defaultFileName, setDefaultFileName] = useState('generated_code');
  const [fileNamingConvention, setFileNamingConvention] = useState('snake_case');
  const [includeTimestamp, setIncludeTimestamp] = useState(true);
  const [defaultDirectory, setDefaultDirectory] = useState('~/Downloads/CodeBot');
  const [createSubfolders, setCreateSubfolders] = useState('language');
  const [includeMetadata, setIncludeMetadata] = useState(true);
  const [exportFormat, setExportFormat] = useState('multiple');
  const [compressionEnabled, setCompressionEnabled] = useState(false);

  // Advanced Settings
  const [apiTimeout, setApiTimeout] = useState(30);
  const [maxCodeComplexity, setMaxCodeComplexity] = useState(7);
  const [enableDebugMode, setEnableDebugMode] = useState(false);
  const [cacheEnabled, setCacheEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [backupEnabled, setBackupEnabled] = useState(true);
  const [performanceMode, setPerformanceMode] = useState('balanced');
  const [experimentalFeatures, setExperimentalFeatures] = useState(['ai_suggestions']);

  const tabs = [
    { id: 'formatting', label: 'Formattazione', icon: 'Code2' },
    { id: 'languages', label: 'Linguaggi', icon: 'Languages' },
    { id: 'localization', label: 'Localizzazione', icon: 'Globe' },
    { id: 'export', label: 'Esportazione', icon: 'Download' },
    { id: 'advanced', label: 'Avanzate', icon: 'Settings' }
  ];

  // Load settings from localStorage on component mount
  useEffect(() => {
    const savedSettings = localStorage.getItem('codebot-settings');
    if (savedSettings) {
      try {
        const settings = JSON.parse(savedSettings);
        // Apply saved settings to state variables
        if (settings?.indentationType) setIndentationType(settings?.indentationType);
        if (settings?.interfaceLanguage) setInterfaceLanguage(settings?.interfaceLanguage);
        // Add more settings as needed
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  // Save settings to localStorage whenever they change
  const saveSettings = () => {
    const settings = {
      indentationType,
      indentationSize,
      lineLength,
      commentVerbosity,
      includeTypeHints,
      includeDocstrings,
      autoFormat,
      defaultLanguages,
      frameworkPreferences,
      versionPreferences,
      codingStyleGuides,
      interfaceLanguage,
      dateFormat,
      numberFormat,
      timeFormat,
      currency,
      timezone,
      defaultFileName,
      fileNamingConvention,
      includeTimestamp,
      defaultDirectory,
      createSubfolders,
      includeMetadata,
      exportFormat,
      compressionEnabled,
      apiTimeout,
      maxCodeComplexity,
      enableDebugMode,
      cacheEnabled,
      autoSave,
      backupEnabled,
      performanceMode,
      experimentalFeatures
    };

    localStorage.setItem('codebot-settings', JSON.stringify(settings));
    
    // Show success feedback
    const button = document.getElementById('save-button');
    if (button) {
      const originalText = button?.textContent;
      button.textContent = 'Salvato!';
      button?.classList?.add('bg-success');
      setTimeout(() => {
        button.textContent = originalText;
        button?.classList?.remove('bg-success');
      }, 2000);
    }
  };

  const resetToDefaults = () => {
    if (window.confirm('Sei sicuro di voler ripristinare tutte le impostazioni predefinite?')) {
      // Reset all settings to defaults
      setIndentationType('spaces');
      setIndentationSize(2);
      setLineLength(80);
      setCommentVerbosity('standard');
      setIncludeTypeHints(true);
      setIncludeDocstrings(true);
      setAutoFormat(true);
      setDefaultLanguages(['javascript', 'python', 'react']);
      setFrameworkPreferences({
        javascript: 'Vanilla JS',
        python: 'Django',
        react: 'Vite',
        css: 'Tailwind CSS'
      });
      setVersionPreferences({
        python: '3.11',
        nodejs: '18.x',
        react: '18.x',
        ruby: '3.2'
      });
      setCodingStyleGuides({
        javascript: 'ESLint Standard',
        python: 'PEP 8',
        react: 'React/JSX',
        css: 'BEM'
      });
      setInterfaceLanguage('it');
      setDateFormat('DD/MM/YYYY');
      setNumberFormat('european');
      setTimeFormat('24h');
      setCurrency('EUR');
      setTimezone('Europe/Rome');
      setDefaultFileName('generated_code');
      setFileNamingConvention('snake_case');
      setIncludeTimestamp(true);
      setDefaultDirectory('~/Downloads/CodeBot');
      setCreateSubfolders('language');
      setIncludeMetadata(true);
      setExportFormat('multiple');
      setCompressionEnabled(false);
      setApiTimeout(30);
      setMaxCodeComplexity(7);
      setEnableDebugMode(false);
      setCacheEnabled(true);
      setAutoSave(true);
      setBackupEnabled(true);
      setPerformanceMode('balanced');
      setExperimentalFeatures(['ai_suggestions']);
      
      // Clear localStorage
      localStorage.removeItem('codebot-settings');
    }
  };

  const handleClose = () => {
    navigate('/main-chat-interface');
  };

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'formatting':
        return (
          <CodeFormattingTab
            indentationType={indentationType}
            setIndentationType={setIndentationType}
            indentationSize={indentationSize}
            setIndentationSize={setIndentationSize}
            lineLength={lineLength}
            setLineLength={setLineLength}
            commentVerbosity={commentVerbosity}
            setCommentVerbosity={setCommentVerbosity}
            includeTypeHints={includeTypeHints}
            setIncludeTypeHints={setIncludeTypeHints}
            includeDocstrings={includeDocstrings}
            setIncludeDocstrings={setIncludeDocstrings}
            autoFormat={autoFormat}
            setAutoFormat={setAutoFormat}
          />
        );
      case 'languages':
        return (
          <LanguageSettingsTab
            defaultLanguages={defaultLanguages}
            setDefaultLanguages={setDefaultLanguages}
            frameworkPreferences={frameworkPreferences}
            setFrameworkPreferences={setFrameworkPreferences}
            versionPreferences={versionPreferences}
            setVersionPreferences={setVersionPreferences}
            codingStyleGuides={codingStyleGuides}
            setCodingStyleGuides={setCodingStyleGuides}
          />
        );
      case 'localization':
        return (
          <LocalizationTab
            interfaceLanguage={interfaceLanguage}
            setInterfaceLanguage={setInterfaceLanguage}
            dateFormat={dateFormat}
            setDateFormat={setDateFormat}
            numberFormat={numberFormat}
            setNumberFormat={setNumberFormat}
            timeFormat={timeFormat}
            setTimeFormat={setTimeFormat}
            currency={currency}
            setCurrency={setCurrency}
            timezone={timezone}
            setTimezone={setTimezone}
          />
        );
      case 'export':
        return (
          <ExportPreferencesTab
            defaultFileName={defaultFileName}
            setDefaultFileName={setDefaultFileName}
            fileNamingConvention={fileNamingConvention}
            setFileNamingConvention={setFileNamingConvention}
            includeTimestamp={includeTimestamp}
            setIncludeTimestamp={setIncludeTimestamp}
            defaultDirectory={defaultDirectory}
            setDefaultDirectory={setDefaultDirectory}
            createSubfolders={createSubfolders}
            setCreateSubfolders={setCreateSubfolders}
            includeMetadata={includeMetadata}
            setIncludeMetadata={setIncludeMetadata}
            exportFormat={exportFormat}
            setExportFormat={setExportFormat}
            compressionEnabled={compressionEnabled}
            setCompressionEnabled={setCompressionEnabled}
          />
        );
      case 'advanced':
        return (
          <AdvancedSettingsTab
            apiTimeout={apiTimeout}
            setApiTimeout={setApiTimeout}
            maxCodeComplexity={maxCodeComplexity}
            setMaxCodeComplexity={setMaxCodeComplexity}
            enableDebugMode={enableDebugMode}
            setEnableDebugMode={setEnableDebugMode}
            cacheEnabled={cacheEnabled}
            setCacheEnabled={setCacheEnabled}
            autoSave={autoSave}
            setAutoSave={setAutoSave}
            backupEnabled={backupEnabled}
            setBackupEnabled={setBackupEnabled}
            performanceMode={performanceMode}
            setPerformanceMode={setPerformanceMode}
            experimentalFeatures={experimentalFeatures}
            setExperimentalFeatures={setExperimentalFeatures}
          />
        );
      default:
        return null;
    }
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          variant="outline"
          onClick={handleMinimize}
          className="ridge-border bg-surface shadow-lg"
        >
          <Icon name="Settings" size={16} className="mr-2" />
          Impostazioni
        </Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface pt-16">
      {/* Settings Dialog Window */}
      <div className="fixed inset-4 z-40 bg-surface ridge-border shadow-2xl flex flex-col max-w-6xl mx-auto">
        {/* Title Bar */}
        <div className="flex items-center justify-between h-8 px-2 bg-gradient-to-r from-accent to-accent/80">
          <div className="flex items-center space-x-2">
            <div className="w-4 h-4 bg-background border border-border flex items-center justify-center">
              <Icon name="Settings" size={12} color="var(--color-accent)" />
            </div>
            <span className="text-xs font-bold text-accent-foreground font-caption">
              Impostazioni e Preferenze - CodeBot Translator
            </span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0 hover:bg-accent-foreground/20 ridge-border"
              onClick={handleMinimize}
            >
              <Icon name="Minus" size={8} />
            </Button>
            
            <Button
              variant="ghost"
              size="icon"
              className="w-4 h-4 p-0 hover:bg-accent-foreground/20 ridge-border"
              onClick={handleClose}
            >
              <Icon name="X" size={8} />
            </Button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex border-b border-border bg-surface">
          {tabs?.map((tab) => (
            <Button
              key={tab?.id}
              variant={activeTab === tab?.id ? "default" : "ghost"}
              size="sm"
              className={`h-8 px-4 rounded-none border-r border-border last:border-r-0 font-caption ${
                activeTab === tab?.id 
                  ? 'sunken-border bg-background' :'hover:bg-primary ridge-border'
              }`}
              onClick={() => setActiveTab(tab?.id)}
            >
              <Icon name={tab?.icon} size={14} className="mr-2" />
              {tab?.label}
            </Button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="flex-1 overflow-y-auto p-6 bg-background">
          {renderTabContent()}
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-between p-4 border-t border-border bg-surface">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetToDefaults}
              className="ridge-border"
            >
              <Icon name="RotateCcw" size={14} className="mr-2" />
              Ripristina Predefiniti
            </Button>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="ridge-border"
            >
              Annulla
            </Button>
            
            <Button
              id="save-button"
              variant="default"
              size="sm"
              onClick={saveSettings}
              className="ridge-border"
            >
              <Icon name="Save" size={14} className="mr-2" />
              Salva Impostazioni
            </Button>
          </div>
        </div>
      </div>
      {/* Background Overlay */}
      <div className="fixed inset-0 bg-black/20 z-30" onClick={handleClose}></div>
    </div>
  );
};

export default SettingsAndPreferences;