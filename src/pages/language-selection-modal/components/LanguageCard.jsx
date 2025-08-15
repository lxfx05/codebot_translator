import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const LanguageCard = ({ language, isRecommended, onSelect }) => {
  const getLanguageIcon = (lang) => {
    const iconMap = {
      'HTML': 'FileText',
      'CSS': 'Palette',
      'JavaScript': 'Zap',
      'Ruby': 'Gem',
      'Python': 'Code2',
      'React': 'Component'
    };
    return iconMap?.[lang] || 'Code';
  };

  const getLanguageDescription = (lang) => {
    const descriptions = {
      'HTML': 'Linguaggio di markup per strutture web',
      'CSS': 'Fogli di stile per design e layout',
      'JavaScript': 'Linguaggio di scripting dinamico',
      'Ruby': 'Linguaggio elegante e produttivo',
      'Python': 'Linguaggio versatile e leggibile',
      'React': 'Libreria per interfacce utente'
    };
    return descriptions?.[lang] || 'Linguaggio di programmazione';
  };

  return (
    <div className={`relative ${isRecommended ? 'ring-2 ring-accent' : ''}`}>
      {isRecommended && (
        <div className="absolute -top-2 -right-2 z-10">
          <div className="bg-accent text-accent-foreground px-2 py-1 text-xs font-caption ridge-border">
            Consigliato
          </div>
        </div>
      )}
      
      <Button
        variant="ghost"
        className="w-full h-32 p-4 ridge-border bg-surface hover:bg-primary text-left flex flex-col items-center justify-center space-y-2 transition-all duration-150 active:sunken-border"
        onClick={() => onSelect(language)}
      >
        <div className="w-12 h-12 flex items-center justify-center bg-background ridge-border">
          <Icon 
            name={getLanguageIcon(language)} 
            size={24} 
            color="var(--color-accent)" 
          />
        </div>
        
        <div className="text-center">
          <h3 className="text-sm font-bold text-text-primary font-heading">
            {language}
          </h3>
          <p className="text-xs text-text-secondary font-caption mt-1">
            {getLanguageDescription(language)}
          </p>
        </div>
      </Button>
    </div>
  );
};

export default LanguageCard;