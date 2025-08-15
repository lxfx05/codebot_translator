import React from 'react';
import Icon from '../../../components/AppIcon';

const ProcessingStatus = ({ isProcessing, progress = 0, statusMessage = "" }) => {
  if (!isProcessing && !statusMessage) return null;

  return (
    <div className="mt-4 p-3 bg-surface ridge-border">
      <div className="flex items-center space-x-3">
        {isProcessing ? (
          <div className="w-4 h-4 border-2 border-accent border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <div className="p-1 bg-success ridge-border">
            <Icon name="CheckCircle" size={12} color="var(--color-success-foreground)" />
          </div>
        )}
        
        <div className="flex-1">
          <p className="text-sm font-caption text-text-primary">
            {statusMessage || (isProcessing ? "Analisi file in corso..." : "Analisi completata")}
          </p>
          
          {isProcessing && (
            <div className="mt-2">
              <div className="w-full h-2 bg-background sunken-border">
                <div 
                  className="h-full bg-accent transition-all duration-300"
                  style={{ width: `${progress}%` }}
                ></div>
              </div>
              <p className="text-xs font-caption text-text-secondary mt-1">
                {progress}% completato
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProcessingStatus;