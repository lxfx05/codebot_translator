import React from 'react';
import Icon from '../../../components/AppIcon';

const StatusBar = ({ 
  totalLines, 
  totalCharacters, 
  lastGenerated, 
  isProcessing = false 
}) => {
  const formatTimestamp = (timestamp) => {
    if (!timestamp) return 'Mai';
    
    const now = new Date();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / 60000);
    
    if (minutes < 1) return 'Ora';
    if (minutes < 60) return `${minutes}m fa`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours}h fa`;
    
    return timestamp?.toLocaleDateString('it-IT', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 h-6 bg-surface border-t-2 border-border ridge-border">
      <div className="flex items-center justify-between h-full px-2 text-xs font-caption">
        {/* Left Section - Processing Status */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-1">
            {isProcessing ? (
              <>
                <div className="w-2 h-2 bg-warning rounded-full animate-pulse"></div>
                <span className="text-warning">Elaborazione...</span>
              </>
            ) : (
              <>
                <div className="w-2 h-2 bg-success rounded-full"></div>
                <span className="text-success">Pronto</span>
              </>
            )}
          </div>
          
          {/* Code Statistics */}
          <div className="flex items-center space-x-3 text-text-secondary">
            <div className="flex items-center space-x-1">
              <Icon name="Hash" size={10} />
              <span>{totalLines} righe</span>
            </div>
            
            <div className="flex items-center space-x-1">
              <Icon name="Type" size={10} />
              <span>{totalCharacters?.toLocaleString('it-IT')} caratteri</span>
            </div>
          </div>
        </div>
        
        {/* Center Section - Last Generated */}
        <div className="flex items-center space-x-1 text-text-secondary">
          <Icon name="Clock" size={10} />
          <span>Ultimo: {formatTimestamp(lastGenerated)}</span>
        </div>
        
        {/* Right Section - System Info */}
        <div className="flex items-center space-x-3 text-text-secondary">
          <div className="flex items-center space-x-1">
            <Icon name="Cpu" size={10} />
            <span>CodeBot v1.0</span>
          </div>
          
          <div className="flex items-center space-x-1">
            <Icon name="Zap" size={10} />
            <span>Attivo</span>
          </div>
          
          {/* Current Time */}
          <div className="flex items-center space-x-1">
            <span>{new Date()?.toLocaleTimeString('it-IT', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatusBar;