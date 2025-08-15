import React from 'react';

import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const CodeFormattingTab = ({ 
  indentationType, 
  setIndentationType, 
  indentationSize, 
  setIndentationSize,
  lineLength,
  setLineLength,
  commentVerbosity,
  setCommentVerbosity,
  includeTypeHints,
  setIncludeTypeHints,
  includeDocstrings,
  setIncludeDocstrings,
  autoFormat,
  setAutoFormat
}) => {
  const indentationOptions = [
    { value: 'spaces', label: 'Spazi' },
    { value: 'tabs', label: 'Tab' }
  ];

  const verbosityOptions = [
    { value: 'minimal', label: 'Minimale' },
    { value: 'standard', label: 'Standard' },
    { value: 'verbose', label: 'Dettagliato' }
  ];

  return (
    <div className="space-y-6">
      {/* Indentation Settings */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Indent" size={16} className="mr-2" />
          Impostazioni Indentazione
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-caption text-text-secondary mb-2">
              Tipo di Indentazione
            </label>
            <div className="space-y-2">
              {indentationOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="indentation"
                    value={option?.value}
                    checked={indentationType === option?.value}
                    onChange={(e) => setIndentationType(e?.target?.value)}
                    className="w-3 h-3"
                  />
                  <span className="text-xs font-caption text-text-primary">
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <Input
              label="Dimensione Indentazione"
              type="number"
              value={indentationSize}
              onChange={(e) => setIndentationSize(parseInt(e?.target?.value))}
              min="1"
              max="8"
              className="text-xs"
            />
          </div>
        </div>
      </div>
      {/* Line Length Settings */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="AlignLeft" size={16} className="mr-2" />
          Lunghezza Linea
        </h3>
        
        <Input
          label="Limite Caratteri per Linea"
          type="number"
          value={lineLength}
          onChange={(e) => setLineLength(parseInt(e?.target?.value))}
          min="60"
          max="200"
          description="Raccomandato: 80-120 caratteri"
          className="max-w-xs"
        />
      </div>
      {/* Comment Settings */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="MessageSquare" size={16} className="mr-2" />
          Impostazioni Commenti
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-xs font-caption text-text-secondary mb-2">
              Livello di Dettaglio Commenti
            </label>
            <div className="space-y-2">
              {verbosityOptions?.map((option) => (
                <label key={option?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="verbosity"
                    value={option?.value}
                    checked={commentVerbosity === option?.value}
                    onChange={(e) => setCommentVerbosity(e?.target?.value)}
                    className="w-3 h-3"
                  />
                  <span className="text-xs font-caption text-text-primary">
                    {option?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div className="space-y-2">
            <Checkbox
              label="Includi Type Hints (Python/TypeScript)"
              checked={includeTypeHints}
              onChange={(e) => setIncludeTypeHints(e?.target?.checked)}
              size="sm"
            />
            
            <Checkbox
              label="Includi Docstrings/JSDoc"
              checked={includeDocstrings}
              onChange={(e) => setIncludeDocstrings(e?.target?.checked)}
              size="sm"
            />
            
            <Checkbox
              label="Formattazione Automatica"
              checked={autoFormat}
              onChange={(e) => setAutoFormat(e?.target?.checked)}
              size="sm"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CodeFormattingTab;