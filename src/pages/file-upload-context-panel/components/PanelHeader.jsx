import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PanelHeader = ({ onClose, onMinimize, isMinimized }) => {
  return (
    <div className="bg-accent p-2 ridge-border">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <div className="p-1 bg-background ridge-border">
            <Icon name="Upload" size={14} color="var(--color-accent)" />
          </div>
          <h2 className="text-sm font-bold font-heading text-accent-foreground">
            Pannello Caricamento File
          </h2>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={onMinimize}
            className="w-5 h-5 p-0 hover:bg-accent-foreground/20 ridge-border"
            title={isMinimized ? "Espandi pannello" : "Riduci pannello"}
          >
            <Icon name={isMinimized ? "ChevronUp" : "ChevronDown"} size={10} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="w-5 h-5 p-0 hover:bg-destructive/20 ridge-border"
            title="Chiudi pannello"
          >
            <Icon name="X" size={10} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default PanelHeader;