import React, { useState } from 'react';
import Button from './Button';
import Icon from '../AppIcon';

const Header = ({ onSettingsClick }) => {
  const [isMinimized, setIsMinimized] = useState(false);

  const handleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  const handleClose = () => {
    // In a real app, this would close the application
    console.log('Application close requested');
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-surface border-b-2 border-border">
      {/* Windows 98 Title Bar */}
      <div className="flex items-center justify-between h-8 px-1 bg-gradient-to-r from-accent to-accent/80">
        <div className="flex items-center space-x-2">
          {/* Application Icon */}
          <div className="w-4 h-4 bg-background border border-border flex items-center justify-center">
            <Icon name="Code" size={12} color="var(--color-accent)" />
          </div>
          
          {/* Application Title */}
          <span className="text-xs font-bold text-accent-foreground font-caption">
            CodeBot Translator
          </span>
        </div>
        
        {/* Window Controls */}
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:bg-accent-foreground/20 ridge-border"
            onClick={handleMinimize}
          >
            <Icon name="Minus" size={8} />
          </Button>
          
          <Button
            variant="ghost"
            size="icon"
            className="w-4 h-4 p-0 hover:bg-accent-foreground/20 ridge-border"
            onClick={handleClose}
          >
            <Icon name="X" size={8} />
          </Button>
        </div>
      </div>
      
      {/* Menu Bar */}
      <div className="flex items-center justify-between h-6 px-2 bg-surface border-b border-border">
        <div className="flex items-center space-x-4">
          {/* Logo/Brand */}
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1">
              <Icon name="Bot" size={16} color="var(--color-accent)" />
              <span className="text-sm font-bold text-text-primary font-heading">
                CodeBot
              </span>
            </div>
          </div>
          
          {/* Primary Navigation */}
          <nav className="flex items-center space-x-1">
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-2 text-xs font-caption hover:bg-primary ridge-border"
              onClick={() => window.location.href = '/main-chat-interface'}
            >
              Traduttore
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-2 text-xs font-caption hover:bg-primary ridge-border"
              onClick={() => window.location.href = '/code-output-display'}
            >
              Output
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              className="h-5 px-2 text-xs font-caption hover:bg-primary ridge-border"
              onClick={() => window.location.href = '/file-upload-context-panel'}
            >
              File
            </Button>
          </nav>
        </div>
        
        {/* Right Side Controls */}
        <div className="flex items-center space-x-1">
          {/* Settings Access */}
          <Button
            variant="ghost"
            size="sm"
            className="h-5 px-2 text-xs font-caption hover:bg-primary ridge-border"
            onClick={onSettingsClick}
            title="Configura preferenze di generazione codice"
          >
            <Icon name="Settings" size={12} className="mr-1" />
            Impostazioni
          </Button>
          
          {/* Status Indicator */}
          <div className="flex items-center space-x-1 px-2 h-5 sunken-border bg-background">
            <div className="w-2 h-2 bg-success rounded-full"></div>
            <span className="text-xs font-caption text-text-secondary">
              Pronto
            </span>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;