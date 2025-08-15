import React from 'react';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const LanguageSelector = ({ selectedLanguages, onLanguageToggle, suggestedLanguages }) => {
  const languages = [
    { id: 'html', name: 'HTML', icon: 'FileText', color: '#E34F26' },
    { id: 'css', name: 'CSS', icon: 'Palette', color: '#1572B6' },
    { id: 'javascript', name: 'JavaScript', icon: 'Zap', color: '#F7DF1E' },
    { id: 'ruby', name: 'Ruby', icon: 'Gem', color: '#CC342D' },
    { id: 'python', name: 'Python', icon: 'Code2', color: '#3776AB' },
    { id: 'react', name: 'React', icon: 'Component', color: '#61DAFB' }
  ];

  return (
    <div className="w-full lg:w-80 bg-surface ridge-border p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-heading text-text-primary">
          Linguaggi di Programmazione
        </h3>
        <Icon name="Code" size={16} />
      </div>
      {/* Suggested Languages */}
      {suggestedLanguages?.length > 0 && (
        <div className="mb-4">
          <div className="flex items-center space-x-2 mb-2">
            <Icon name="Lightbulb" size={12} />
            <span className="text-xs font-caption text-text-secondary">
              Suggeriti
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {suggestedLanguages?.map(langId => {
              const lang = languages?.find(l => l?.id === langId);
              if (!lang) return null;
              
              return (
                <Button
                  key={lang?.id}
                  variant="outline"
                  size="sm"
                  className="h-7 px-2 ridge-border bg-accent/20"
                  onClick={() => onLanguageToggle(lang?.id)}
                  iconName={lang?.icon}
                  iconSize={12}
                >
                  {lang?.name}
                </Button>
              );
            })}
          </div>
        </div>
      )}
      {/* All Languages */}
      <div className="space-y-2">
        <span className="text-xs font-caption text-text-secondary">
          Tutti i Linguaggi
        </span>
        <div className="grid grid-cols-1 gap-2">
          {languages?.map(language => {
            const isSelected = selectedLanguages?.includes(language?.id);
            const isSuggested = suggestedLanguages?.includes(language?.id);
            
            return (
              <Button
                key={language?.id}
                variant={isSelected ? "default" : "ghost"}
                size="sm"
                className={`justify-start h-8 px-3 ridge-border ${
                  isSelected ? 'bg-primary' : 'bg-surface hover:bg-primary/50'
                } ${isSuggested ? 'border-accent' : ''}`}
                onClick={() => onLanguageToggle(language?.id)}
                iconName={language?.icon}
                iconSize={14}
              >
                <span className="ml-2">{language?.name}</span>
                {isSuggested && (
                  <Icon name="Star" size={10} className="ml-auto text-accent" />
                )}
              </Button>
            );
          })}
        </div>
      </div>
      {/* Selection Info */}
      <div className="mt-4 p-2 sunken-border bg-background">
        <div className="flex items-center justify-between">
          <span className="text-xs font-caption text-text-secondary">
            Selezionati:
          </span>
          <span className="text-xs font-caption text-text-primary">
            {selectedLanguages?.length}/6
          </span>
        </div>
      </div>
    </div>
  );
};

export default LanguageSelector;