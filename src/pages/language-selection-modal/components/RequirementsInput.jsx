import React from 'react';

const RequirementsInput = ({ value, onChange }) => {
  return (
    <div className="mb-6">
      <label className="block text-sm font-bold text-text-primary font-caption mb-2">
        Requisiti specifici (opzionale):
      </label>
      <textarea
        value={value}
        onChange={(e) => onChange(e?.target?.value)}
        placeholder="es. React con hooks, Python 3.9+, CSS Grid..."
        className="w-full h-20 p-2 sunken-border bg-background text-text-primary font-body text-sm resize-none focus:outline-none focus:ring-2 focus:ring-accent"
        rows={3}
      />
      <p className="text-xs text-text-secondary font-caption mt-1">
        Specifica framework, versioni o caratteristiche particolari
      </p>
    </div>
  );
};

export default RequirementsInput;