import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const CodeBlock = ({ 
  code, 
  language, 
  complexity, 
  executionTime, 
  isValid = true, 
  warnings = [],
  onCopy,
  onExport,
  onRunInVSCode 
}) => {
  const [copySuccess, setCopySuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard?.writeText(code);
      setCopySuccess(true);
      onCopy && onCopy();
      setTimeout(() => setCopySuccess(false), 2000);
    } catch (err) {
      console.error('Errore durante la copia:', err);
    }
  };

  const getLanguageIcon = (lang) => {
    const iconMap = {
      'javascript': 'FileText',
      'python': 'Code',
      'html': 'Globe',
      'css': 'Palette',
      'react': 'Component',
      'ruby': 'Gem'
    };
    return iconMap?.[lang?.toLowerCase()] || 'Code';
  };

  const getComplexityColor = (level) => {
    const colorMap = {
      'low': 'bg-success',
      'medium': 'bg-warning',
      'high': 'bg-destructive'
    };
    return colorMap?.[level] || 'bg-muted';
  };

  const formatCode = (codeString) => {
    return codeString?.split('\n')?.map((line, index) => (
      <div key={index} className="flex">
        <span className="w-8 text-xs text-muted-foreground text-right pr-2 border-r border-border ridge-border bg-muted/20">
          {index + 1}
        </span>
        <span className="flex-1 pl-3 whitespace-pre">{line}</span>
      </div>
    ));
  };

  return (
    <div className="w-full mb-6 sunken-border bg-background">
      {/* Header Bar */}
      <div className="flex items-center justify-between p-2 bg-surface border-b border-border ridge-border">
        <div className="flex items-center space-x-3">
          {/* Language Badge */}
          <div className="flex items-center space-x-2 px-2 py-1 bg-primary ridge-border">
            <Icon 
              name={getLanguageIcon(language)} 
              size={14} 
              color="var(--color-text-primary)" 
            />
            <span className="text-xs font-bold font-caption uppercase">
              {language}
            </span>
          </div>
          
          {/* Complexity Indicator */}
          <div className="flex items-center space-x-1">
            <span className="text-xs font-caption text-text-secondary">Complessità:</span>
            <div className="flex space-x-1">
              {[1, 2, 3]?.map((dot) => (
                <div
                  key={dot}
                  className={`w-2 h-2 rounded-full ${
                    dot <= (complexity === 'low' ? 1 : complexity === 'medium' ? 2 : 3)
                      ? getComplexityColor(complexity)
                      : 'bg-muted'
                  }`}
                />
              ))}
            </div>
          </div>
          
          {/* Execution Time */}
          <div className="flex items-center space-x-1 px-2 py-1 sunken-border bg-background">
            <Icon name="Clock" size={12} color="var(--color-text-secondary)" />
            <span className="text-xs font-caption text-text-secondary">
              ~{executionTime}ms
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs ridge-border"
            onClick={handleCopy}
            iconName={copySuccess ? "Check" : "Copy"}
            iconSize={12}
          >
            {copySuccess ? 'Copiato!' : 'Copia'}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs ridge-border"
            onClick={onExport}
            iconName="Download"
            iconSize={12}
          >
            Esporta
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            className="h-6 px-2 text-xs ridge-border"
            onClick={onRunInVSCode}
            iconName="Play"
            iconSize={12}
          >
            VS Code
          </Button>
        </div>
      </div>
      {/* Code Content */}
      <div className="relative">
        <div className="bg-background font-data text-sm overflow-x-auto max-h-96">
          <div className="p-0">
            {formatCode(code)}
          </div>
        </div>
      </div>
      {/* Validation Status */}
      <div className="flex items-center justify-between p-2 bg-surface border-t border-border ridge-border">
        <div className="flex items-center space-x-2">
          {isValid ? (
            <>
              <Icon name="CheckCircle" size={14} color="var(--color-success)" />
              <span className="text-xs font-caption text-success">
                Codice sintatticamente corretto
              </span>
            </>
          ) : (
            <>
              <Icon name="AlertTriangle" size={14} color="var(--color-warning)" />
              <span className="text-xs font-caption text-warning">
                Avvisi di validazione presenti
              </span>
            </>
          )}
        </div>
        
        {warnings?.length > 0 && (
          <div className="flex items-center space-x-1">
            <Icon name="Info" size={12} color="var(--color-text-secondary)" />
            <span className="text-xs font-caption text-text-secondary">
              {warnings?.length} avviso{warnings?.length > 1 ? 'i' : ''}
            </span>
          </div>
        )}
      </div>
      {/* Warnings List */}
      {warnings?.length > 0 && (
        <div className="p-2 bg-warning/10 border-t border-warning">
          {warnings?.map((warning, index) => (
            <div key={index} className="flex items-start space-x-2 mb-1 last:mb-0">
              <Icon name="AlertCircle" size={12} color="var(--color-warning)" className="mt-0.5" />
              <span className="text-xs font-caption text-warning">
                {warning}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CodeBlock;