import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const OutputHeader = ({ 
  totalBlocks, 
  onClearAll, 
  onExportAll, 
  onToggleView,
  viewMode = 'expanded' 
}) => {
  return (
    <div className="flex items-center justify-between p-3 bg-surface border-b-2 border-border ridge-border">
      {/* Left Section - Title and Stats */}
      <div className="flex items-center space-x-4">
        <div className="flex items-center space-x-2">
          <Icon name="Code2" size={20} color="var(--color-accent)" />
          <h1 className="text-lg font-bold font-heading text-text-primary">
            Output Codice
          </h1>
        </div>
        
        <div className="flex items-center space-x-2 px-2 py-1 sunken-border bg-background">
          <Icon name="FileCode" size={14} color="var(--color-text-secondary)" />
          <span className="text-sm font-caption text-text-secondary">
            {totalBlocks} blocch{totalBlocks === 1 ? 'o' : 'i'} generati
          </span>
        </div>
      </div>
      
      {/* Right Section - Actions */}
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          className="ridge-border"
          onClick={onToggleView}
          iconName={viewMode === 'expanded' ? 'Minimize2' : 'Maximize2'}
          iconSize={14}
        >
          {viewMode === 'expanded' ? 'Comprimi' : 'Espandi'}
        </Button>
        
        <Button
          variant="outline"
          size="sm"
          className="ridge-border"
          onClick={onExportAll}
          iconName="Package"
          iconSize={14}
          disabled={totalBlocks === 0}
        >
          Esporta Tutto
        </Button>
        
        <Button
          variant="destructive"
          size="sm"
          className="ridge-border"
          onClick={onClearAll}
          iconName="Trash2"
          iconSize={14}
          disabled={totalBlocks === 0}
        >
          Pulisci
        </Button>
      </div>
    </div>
  );
};

export default OutputHeader;