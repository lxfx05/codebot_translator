import React from 'react';

import Input from '../../../components/ui/Input';

import Icon from '../../../components/AppIcon';

const LanguageSettingsTab = ({
  defaultLanguages,
  setDefaultLanguages,
  frameworkPreferences,
  setFrameworkPreferences,
  versionPreferences,
  setVersionPreferences,
  codingStyleGuides,
  setCodingStyleGuides
}) => {
  const programmingLanguages = [
    { id: 'javascript', name: 'JavaScript', icon: 'Code2' },
    { id: 'python', name: 'Python', icon: 'FileCode' },
    { id: 'react', name: 'React', icon: 'Component' },
    { id: 'html', name: 'HTML', icon: 'Globe' },
    { id: 'css', name: 'CSS', icon: 'Palette' },
    { id: 'ruby', name: 'Ruby', icon: 'Gem' }
  ];

  const frameworks = {
    javascript: ['Vanilla JS', 'Node.js', 'Express.js', 'Vue.js'],
    python: ['Django', 'Flask', 'FastAPI', 'Pandas'],
    react: ['Create React App', 'Next.js', 'Vite', 'Gatsby'],
    css: ['Vanilla CSS', 'Tailwind CSS', 'Bootstrap', 'Sass']
  };

  const styleGuides = {
    javascript: ['ESLint Standard', 'Airbnb', 'Google', 'Prettier'],
    python: ['PEP 8', 'Black', 'Flake8', 'Pylint'],
    react: ['React/JSX', 'Airbnb React', 'Standard React'],
    css: ['BEM', 'SMACSS', 'Atomic CSS', 'OOCSS']
  };

  const handleLanguageToggle = (languageId) => {
    setDefaultLanguages(prev => 
      prev?.includes(languageId) 
        ? prev?.filter(id => id !== languageId)
        : [...prev, languageId]
    );
  };

  const handleFrameworkChange = (language, framework) => {
    setFrameworkPreferences(prev => ({
      ...prev,
      [language]: framework
    }));
  };

  const handleStyleGuideChange = (language, guide) => {
    setCodingStyleGuides(prev => ({
      ...prev,
      [language]: guide
    }));
  };

  return (
    <div className="space-y-6">
      {/* Default Languages */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Languages" size={16} className="mr-2" />
          Linguaggi Predefiniti
        </h3>
        
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {programmingLanguages?.map((lang) => (
            <label key={lang?.id} className="flex items-center space-x-2 cursor-pointer p-2 hover:bg-surface rounded">
              <input
                type="checkbox"
                checked={defaultLanguages?.includes(lang?.id)}
                onChange={() => handleLanguageToggle(lang?.id)}
                className="w-3 h-3"
              />
              <Icon name={lang?.icon} size={14} />
              <span className="text-xs font-caption text-text-primary">
                {lang?.name}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Framework Preferences */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Package" size={16} className="mr-2" />
          Preferenze Framework
        </h3>
        
        <div className="space-y-4">
          {Object.entries(frameworks)?.map(([language, frameworkList]) => (
            <div key={language} className="border-b border-border pb-3 last:border-b-0">
              <label className="block text-xs font-caption text-text-secondary mb-2 capitalize">
                {language}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {frameworkList?.map((framework) => (
                  <label key={framework} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`framework-${language}`}
                      value={framework}
                      checked={frameworkPreferences?.[language] === framework}
                      onChange={() => handleFrameworkChange(language, framework)}
                      className="w-3 h-3"
                    />
                    <span className="text-xs font-caption text-text-primary">
                      {framework}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Version Preferences */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="GitBranch" size={16} className="mr-2" />
          Versioni Preferite
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            label="Python"
            type="text"
            value={versionPreferences?.python || ''}
            onChange={(e) => setVersionPreferences(prev => ({...prev, python: e?.target?.value}))}
            placeholder="3.11"
            className="text-xs"
          />
          
          <Input
            label="Node.js"
            type="text"
            value={versionPreferences?.nodejs || ''}
            onChange={(e) => setVersionPreferences(prev => ({...prev, nodejs: e?.target?.value}))}
            placeholder="18.x"
            className="text-xs"
          />
          
          <Input
            label="React"
            type="text"
            value={versionPreferences?.react || ''}
            onChange={(e) => setVersionPreferences(prev => ({...prev, react: e?.target?.value}))}
            placeholder="18.x"
            className="text-xs"
          />
          
          <Input
            label="Ruby"
            type="text"
            value={versionPreferences?.ruby || ''}
            onChange={(e) => setVersionPreferences(prev => ({...prev, ruby: e?.target?.value}))}
            placeholder="3.2"
            className="text-xs"
          />
        </div>
      </div>
      {/* Coding Style Guides */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="FileText" size={16} className="mr-2" />
          Guide di Stile
        </h3>
        
        <div className="space-y-4">
          {Object.entries(styleGuides)?.map(([language, guides]) => (
            <div key={language} className="border-b border-border pb-3 last:border-b-0">
              <label className="block text-xs font-caption text-text-secondary mb-2 capitalize">
                {language}
              </label>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {guides?.map((guide) => (
                  <label key={guide} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="radio"
                      name={`style-${language}`}
                      value={guide}
                      checked={codingStyleGuides?.[language] === guide}
                      onChange={() => handleStyleGuideChange(language, guide)}
                      className="w-3 h-3"
                    />
                    <span className="text-xs font-caption text-text-primary">
                      {guide}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LanguageSettingsTab;