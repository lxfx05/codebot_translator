import React from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const AdvancedSettingsTab = ({
  apiTimeout,
  setApiTimeout,
  maxCodeComplexity,
  setMaxCodeComplexity,
  enableDebugMode,
  setEnableDebugMode,
  cacheEnabled,
  setCacheEnabled,
  autoSave,
  setAutoSave,
  backupEnabled,
  setBackupEnabled,
  performanceMode,
  setPerformanceMode,
  experimentalFeatures,
  setExperimentalFeatures
}) => {
  const performanceModes = [
    { value: 'balanced', label: 'Bilanciato', description: 'Equilibrio tra velocità e qualità' },
    { value: 'speed', label: 'Velocità', description: 'Priorità alla velocità di generazione' },
    { value: 'quality', label: 'Qualità', description: 'Priorità alla qualità del codice' },
    { value: 'memory', label: 'Memoria', description: 'Ottimizzato per dispositivi con poca RAM' }
  ];

  const experimentalFeaturesList = [
    { id: 'ai_suggestions', label: 'Suggerimenti AI Avanzati', description: 'Suggerimenti intelligenti basati sul contesto' },
    { id: 'code_analysis', label: 'Analisi Codice in Tempo Reale', description: 'Analizza il codice mentre viene generato' },
    { id: 'auto_optimization', label: 'Ottimizzazione Automatica', description: 'Ottimizza automaticamente il codice generato' },
    { id: 'collaborative_mode', label: 'Modalità Collaborativa', description: 'Condivisione e collaborazione in tempo reale' },
    { id: 'voice_input', label: 'Input Vocale', description: 'Genera codice tramite comandi vocali' },
    { id: 'visual_programming', label: 'Programmazione Visuale', description: 'Interfaccia drag-and-drop per la generazione' }
  ];

  const handleExperimentalToggle = (featureId) => {
    setExperimentalFeatures(prev => 
      prev?.includes(featureId) 
        ? prev?.filter(id => id !== featureId)
        : [...prev, featureId]
    );
  };

  return (
    <div className="space-y-6">
      {/* Performance Settings */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Zap" size={16} className="mr-2" />
          Impostazioni Prestazioni
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Timeout API (secondi)"
            type="number"
            value={apiTimeout}
            onChange={(e) => setApiTimeout(parseInt(e?.target?.value))}
            min="5"
            max="300"
            description="Tempo massimo di attesa per la generazione del codice"
            className="max-w-xs"
          />
          
          <Input
            label="Complessità Massima Codice"
            type="range"
            value={maxCodeComplexity}
            onChange={(e) => setMaxCodeComplexity(parseInt(e?.target?.value))}
            min="1"
            max="10"
            description={`Livello attuale: ${maxCodeComplexity}/10`}
            className="max-w-md"
          />
          
          <div>
            <label className="block text-xs font-caption text-text-secondary mb-2">
              Modalità Prestazioni
            </label>
            <div className="space-y-3">
              {performanceModes?.map((mode) => (
                <label key={mode?.value} className="flex items-start space-x-2 cursor-pointer p-2 hover:bg-surface rounded">
                  <input
                    type="radio"
                    name="performance-mode"
                    value={mode?.value}
                    checked={performanceMode === mode?.value}
                    onChange={(e) => setPerformanceMode(e?.target?.value)}
                    className="w-3 h-3 mt-1"
                  />
                  <div>
                    <span className="text-xs font-caption text-text-primary block">
                      {mode?.label}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {mode?.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* System Settings */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Cpu" size={16} className="mr-2" />
          Impostazioni Sistema
        </h3>
        
        <div className="space-y-3">
          <Checkbox
            label="Modalità Debug"
            description="Abilita log dettagliati e informazioni di debug"
            checked={enableDebugMode}
            onChange={(e) => setEnableDebugMode(e?.target?.checked)}
            size="sm"
          />
          
          <Checkbox
            label="Cache Abilitata"
            description="Memorizza i risultati per velocizzare richieste simili"
            checked={cacheEnabled}
            onChange={(e) => setCacheEnabled(e?.target?.checked)}
            size="sm"
          />
          
          <Checkbox
            label="Salvataggio Automatico"
            description="Salva automaticamente le impostazioni e la cronologia"
            checked={autoSave}
            onChange={(e) => setAutoSave(e?.target?.checked)}
            size="sm"
          />
          
          <Checkbox
            label="Backup Automatico"
            description="Crea backup periodici delle impostazioni e dei progetti"
            checked={backupEnabled}
            onChange={(e) => setBackupEnabled(e?.target?.checked)}
            size="sm"
          />
        </div>
      </div>
      {/* Experimental Features */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Flask" size={16} className="mr-2" />
          Funzionalità Sperimentali
        </h3>
        
        <div className="mb-3 p-2 bg-warning/10 border border-warning rounded">
          <div className="flex items-center space-x-2">
            <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
            <span className="text-xs font-caption text-warning-foreground">
              Attenzione: Le funzionalità sperimentali potrebbero essere instabili
            </span>
          </div>
        </div>
        
        <div className="space-y-3">
          {experimentalFeaturesList?.map((feature) => (
            <label key={feature?.id} className="flex items-start space-x-2 cursor-pointer p-2 hover:bg-surface rounded">
              <input
                type="checkbox"
                checked={experimentalFeatures?.includes(feature?.id)}
                onChange={() => handleExperimentalToggle(feature?.id)}
                className="w-3 h-3 mt-1"
              />
              <div>
                <span className="text-xs font-caption text-text-primary block">
                  {feature?.label}
                </span>
                <span className="text-xs text-text-secondary">
                  {feature?.description}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Integration Settings */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Plug" size={16} className="mr-2" />
          Integrazioni Esterne
        </h3>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="p-3 border border-border rounded">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Code2" size={16} />
                <span className="text-xs font-caption font-bold">VS Code</span>
              </div>
              <p className="text-xs text-text-secondary mb-2">
                Integrazione diretta con Visual Studio Code
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Configura
              </Button>
            </div>
            
            <div className="p-3 border border-border rounded">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="GitBranch" size={16} />
                <span className="text-xs font-caption font-bold">Git</span>
              </div>
              <p className="text-xs text-text-secondary mb-2">
                Integrazione con repository Git
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Configura
              </Button>
            </div>
            
            <div className="p-3 border border-border rounded">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Cloud" size={16} />
                <span className="text-xs font-caption font-bold">Cloud Storage</span>
              </div>
              <p className="text-xs text-text-secondary mb-2">
                Sincronizzazione cloud dei progetti
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Configura
              </Button>
            </div>
            
            <div className="p-3 border border-border rounded">
              <div className="flex items-center space-x-2 mb-2">
                <Icon name="Database" size={16} />
                <span className="text-xs font-caption font-bold">Database</span>
              </div>
              <p className="text-xs text-text-secondary mb-2">
                Connessioni database per esempi
              </p>
              <Button variant="outline" size="sm" className="w-full">
                Configura
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvancedSettingsTab;