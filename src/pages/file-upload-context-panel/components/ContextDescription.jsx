import React from 'react';
import Icon from '../../../components/AppIcon';

const ContextDescription = ({ value, onChange, placeholder }) => {
  return (
    <div className="space-y-3">
      <div className="flex items-center space-x-2">
        <div className="p-1 bg-accent ridge-border">
          <Icon name="MessageSquare" size={16} color="var(--color-accent-foreground)" />
        </div>
        <h3 className="text-sm font-bold font-heading text-text-primary">
          Descrizione del Contesto
        </h3>
      </div>
      <div className="sunken-border bg-background">
        <textarea
          value={value}
          onChange={(e) => onChange(e?.target?.value)}
          placeholder={placeholder || "Descrivi come questi file dovrebbero influenzare la generazione del codice..."}
          className="w-full h-24 p-3 bg-transparent border-none outline-none resize-none font-caption text-sm text-text-primary placeholder-text-secondary"
          maxLength={500}
        />
      </div>
      <div className="flex justify-between items-center text-xs font-caption text-text-secondary">
        <span>
          Fornisci contesto per una generazione di codice più accurata
        </span>
        <span>
          {value?.length}/500
        </span>
      </div>
    </div>
  );
};

export default ContextDescription;