import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const EmptyState = ({ onNavigateToChat }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-96 p-8 bg-surface sunken-border">
      <div className="text-center space-y-6">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="w-24 h-24 bg-muted ridge-border flex items-center justify-center">
            <Icon name="Code" size={48} color="var(--color-muted-foreground)" />
          </div>
        </div>
        
        {/* Title */}
        <h2 className="text-xl font-bold font-heading text-text-primary">
          Nessun Codice Generato
        </h2>
        
        {/* Description */}
        <div className="space-y-2 max-w-md">
          <p className="text-sm font-body text-text-secondary">
            Non hai ancora generato alcun codice. Inizia una conversazione con CodeBot per tradurre le tue richieste in linguaggio naturale in codice eseguibile.
          </p>
          
          <div className="flex items-center justify-center space-x-2 text-xs font-caption text-muted-foreground">
            <Icon name="Lightbulb" size={14} />
            <span>
              Supporta HTML, CSS, JavaScript, Python, React e Ruby
            </span>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="default"
            className="ridge-border"
            onClick={onNavigateToChat}
            iconName="MessageSquare"
            iconPosition="left"
            iconSize={16}
          >
            Inizia Chat
          </Button>
          
          <Button
            variant="outline"
            className="ridge-border"
            onClick={() => window.location.href = '/file-upload-context-panel'}
            iconName="Upload"
            iconPosition="left"
            iconSize={16}
          >
            Carica File
          </Button>
        </div>
        
        {/* Quick Examples */}
        <div className="mt-8 p-4 bg-background sunken-border">
          <h3 className="text-sm font-bold font-caption text-text-primary mb-3">
            Esempi di Richieste:
          </h3>
          
          <div className="space-y-2 text-xs font-body text-text-secondary">
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={12} className="mt-0.5" />
              <span>"Crea una funzione JavaScript per validare email"</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={12} className="mt-0.5" />
              <span>"Genera un componente React per un form di login"</span>
            </div>
            
            <div className="flex items-start space-x-2">
              <Icon name="ArrowRight" size={12} className="mt-0.5" />
              <span>"Scrivi uno script Python per leggere file CSV"</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyState;