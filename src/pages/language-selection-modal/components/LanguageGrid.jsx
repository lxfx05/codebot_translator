import React from 'react';
import LanguageCard from './LanguageCard';

const LanguageGrid = ({ languages, recommendedLanguages, onLanguageSelect }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
      {languages?.map((language) => (
        <LanguageCard
          key={language}
          language={language}
          isRecommended={recommendedLanguages?.includes(language)}
          onSelect={onLanguageSelect}
        />
      ))}
    </div>
  );
};

export default LanguageGrid;