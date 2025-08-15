import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModalHeader = ({ onClose }) => {
  return (
    <div className="flex items-center justify-between mb-6 pb-4 border-b border-border">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-accent ridge-border flex items-center justify-center">
          <Icon name="Code" size={16} color="var(--color-accent-foreground)" />
        </div>
        <div>
          <h2 className="text-lg font-bold text-text-primary font-heading">
            Seleziona Linguaggio
          </h2>
          <p className="text-sm text-text-secondary font-caption">
            Scegli il linguaggio di programmazione per la generazione del codice
          </p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        className="w-6 h-6 ridge-border bg-surface hover:bg-primary"
      >
        <Icon name="X" size={12} />
      </Button>
    </div>
  );
};

export default ModalHeader;