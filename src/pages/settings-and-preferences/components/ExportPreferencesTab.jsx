import React from 'react';

import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const ExportPreferencesTab = ({
  defaultFileName,
  setDefaultFileName,
  fileNamingConvention,
  setFileNamingConvention,
  includeTimestamp,
  setIncludeTimestamp,
  defaultDirectory,
  setDefaultDirectory,
  createSubfolders,
  setCreateSubfolders,
  includeMetadata,
  setIncludeMetadata,
  exportFormat,
  setExportFormat,
  compressionEnabled,
  setCompressionEnabled
}) => {
  const namingConventions = [
    { value: 'camelCase', label: 'camelCase (myFileName.js)' },
    { value: 'snake_case', label: 'snake_case (my_file_name.js)' },
    { value: 'kebab-case', label: 'kebab-case (my-file-name.js)' },
    { value: 'PascalCase', label: 'PascalCase (MyFileName.js)' }
  ];

  const exportFormats = [
    { value: 'single', label: 'File Singolo', description: 'Tutto il codice in un file' },
    { value: 'multiple', label: 'File Multipli', description: 'Separato per linguaggio/componente' },
    { value: 'zip', label: 'Archivio ZIP', description: 'Tutti i file in un archivio compresso' },
    { value: 'project', label: 'Struttura Progetto', description: 'Struttura completa con cartelle' }
  ];

  const directoryStructures = [
    { value: 'flat', label: 'Struttura Piatta', description: 'Tutti i file nella stessa cartella' },
    { value: 'language', label: 'Per Linguaggio', description: 'Cartelle separate per ogni linguaggio' },
    { value: 'date', label: 'Per Data', description: 'Organizzato per data di creazione' },
    { value: 'project', label: 'Per Progetto', description: 'Struttura tipica di progetto' }
  ];

  return (
    <div className="space-y-6">
      {/* File Naming */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="FileText" size={16} className="mr-2" />
          Convenzioni Nomi File
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Nome File Predefinito"
            type="text"
            value={defaultFileName}
            onChange={(e) => setDefaultFileName(e?.target?.value)}
            placeholder="generated_code"
            description="Nome base per i file generati"
            className="max-w-md"
          />
          
          <div>
            <label className="block text-xs font-caption text-text-secondary mb-2">
              Convenzione Denominazione
            </label>
            <div className="space-y-2">
              {namingConventions?.map((convention) => (
                <label key={convention?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="naming-convention"
                    value={convention?.value}
                    checked={fileNamingConvention === convention?.value}
                    onChange={(e) => setFileNamingConvention(e?.target?.value)}
                    className="w-3 h-3"
                  />
                  <span className="text-xs font-caption text-text-primary">
                    {convention?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <Checkbox
            label="Includi Timestamp nel Nome"
            description="Aggiunge data e ora al nome del file"
            checked={includeTimestamp}
            onChange={(e) => setIncludeTimestamp(e?.target?.checked)}
            size="sm"
          />
        </div>
      </div>
      {/* Directory Settings */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Folder" size={16} className="mr-2" />
          Impostazioni Directory
        </h3>
        
        <div className="space-y-4">
          <Input
            label="Directory Predefinita"
            type="text"
            value={defaultDirectory}
            onChange={(e) => setDefaultDirectory(e?.target?.value)}
            placeholder="~/Downloads/CodeBot"
            description="Percorso dove salvare i file generati"
            className="max-w-md"
          />
          
          <div>
            <label className="block text-xs font-caption text-text-secondary mb-2">
              Struttura Directory
            </label>
            <div className="space-y-3">
              {directoryStructures?.map((structure) => (
                <label key={structure?.value} className="flex items-start space-x-2 cursor-pointer p-2 hover:bg-surface rounded">
                  <input
                    type="radio"
                    name="directory-structure"
                    value={structure?.value}
                    checked={createSubfolders === structure?.value}
                    onChange={(e) => setCreateSubfolders(e?.target?.value)}
                    className="w-3 h-3 mt-1"
                  />
                  <div>
                    <span className="text-xs font-caption text-text-primary block">
                      {structure?.label}
                    </span>
                    <span className="text-xs text-text-secondary">
                      {structure?.description}
                    </span>
                  </div>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Export Format */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Download" size={16} className="mr-2" />
          Formato Esportazione
        </h3>
        
        <div className="space-y-3">
          {exportFormats?.map((format) => (
            <label key={format?.value} className="flex items-start space-x-2 cursor-pointer p-2 hover:bg-surface rounded">
              <input
                type="radio"
                name="export-format"
                value={format?.value}
                checked={exportFormat === format?.value}
                onChange={(e) => setExportFormat(e?.target?.value)}
                className="w-3 h-3 mt-1"
              />
              <div>
                <span className="text-xs font-caption text-text-primary block">
                  {format?.label}
                </span>
                <span className="text-xs text-text-secondary">
                  {format?.description}
                </span>
              </div>
            </label>
          ))}
        </div>
      </div>
      {/* Additional Options */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Settings" size={16} className="mr-2" />
          Opzioni Aggiuntive
        </h3>
        
        <div className="space-y-3">
          <Checkbox
            label="Includi Metadati"
            description="Aggiunge informazioni su data, linguaggio e parametri utilizzati"
            checked={includeMetadata}
            onChange={(e) => setIncludeMetadata(e?.target?.checked)}
            size="sm"
          />
          
          <Checkbox
            label="Abilita Compressione"
            description="Comprimi file di grandi dimensioni automaticamente"
            checked={compressionEnabled}
            onChange={(e) => setCompressionEnabled(e?.target?.checked)}
            size="sm"
          />
        </div>
      </div>
      {/* Preview Section */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Eye" size={16} className="mr-2" />
          Anteprima Denominazione
        </h3>
        
        <div className="bg-surface p-3 rounded font-data text-xs">
          <div className="text-text-secondary mb-2">Esempio di file generato:</div>
          <div className="text-text-primary">
            {defaultDirectory || '~/Downloads/CodeBot'}/
            {createSubfolders === 'language' && 'javascript/'}
            {createSubfolders === 'date' && '2025-08-15/'}
            {defaultFileName || 'generated_code'}
            {includeTimestamp && '_20250815_222036'}
            .js
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExportPreferencesTab;