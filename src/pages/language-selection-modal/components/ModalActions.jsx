import React from 'react';
import Button from '../../../components/ui/Button';

const ModalActions = ({ onConfirm, onCancel, selectedLanguage, isLoading }) => {
  return (
    <div className="flex justify-end space-x-2 pt-4 border-t border-border">
      <Button
        variant="ghost"
        onClick={onCancel}
        className="px-6 py-2 ridge-border bg-surface hover:bg-primary font-caption"
        disabled={isLoading}
      >
        Annulla
      </Button>
      
      <Button
        variant="default"
        onClick={onConfirm}
        disabled={!selectedLanguage || isLoading}
        loading={isLoading}
        className="px-6 py-2 ridge-border bg-accent text-accent-foreground hover:bg-accent/90 font-caption"
      >
        Conferma
      </Button>
    </div>
  );
};

export default ModalActions;