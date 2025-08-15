import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActionButtons = ({ 
  onClearAll, 
  onApplyContext, 
  hasFiles, 
  contextDescription, 
  isProcessing 
}) => {
  const canApply = hasFiles || contextDescription?.trim()?.length > 0;

  return (
    <div className="flex items-center justify-between pt-4 border-t-2 border-border">
      <Button
        variant="outline"
        size="sm"
        onClick={onClearAll}
        disabled={!hasFiles || isProcessing}
        className="font-caption"
      >
        <Icon name="Trash2" size={14} className="mr-2" />
        Cancella Tutto
      </Button>
      
      <div className="flex items-center space-x-2">
        <Button
          variant="secondary"
          size="sm"
          onClick={() => window.location.href = '/main-chat-interface'}
          className="font-caption"
        >
          <Icon name="MessageCircle" size={14} className="mr-2" />
          Torna alla Chat
        </Button>
        
        <Button
          variant="default"
          size="sm"
          onClick={onApplyContext}
          disabled={!canApply || isProcessing}
          loading={isProcessing}
          className="font-caption"
        >
          <Icon name="Send" size={14} className="mr-2" />
          Applica Contesto
        </Button>
      </div>
    </div>
  );
};

export default ActionButtons;