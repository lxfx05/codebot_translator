import React from 'react';



import Icon from '../../../components/AppIcon';

const LocalizationTab = ({
  interfaceLanguage,
  setInterfaceLanguage,
  dateFormat,
  setDateFormat,
  numberFormat,
  setNumberFormat,
  timeFormat,
  setTimeFormat,
  currency,
  setCurrency,
  timezone,
  setTimezone
}) => {
  const languageOptions = [
    { value: 'it', label: 'Italiano', flag: '🇮🇹' },
    { value: 'en', label: 'English', flag: '🇺🇸' },
    { value: 'es', label: 'Español', flag: '🇪🇸' },
    { value: 'fr', label: 'Français', flag: '🇫🇷' },
    { value: 'de', label: 'Deutsch', flag: '🇩🇪' }
  ];

  const dateFormatOptions = [
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY (Europeo)' },
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY (Americano)' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD (ISO)' },
    { value: 'DD-MM-YYYY', label: 'DD-MM-YYYY' }
  ];

  const numberFormatOptions = [
    { value: 'european', label: '1.234.567,89 (Europeo)' },
    { value: 'american', label: '1,234,567.89 (Americano)' },
    { value: 'space', label: '1 234 567,89 (Spazio)' }
  ];

  const timeFormatOptions = [
    { value: '24h', label: '24 ore (14:30)' },
    { value: '12h', label: '12 ore (2:30 PM)' }
  ];

  const currencyOptions = [
    { value: 'EUR', label: 'Euro (€)', symbol: '€' },
    { value: 'USD', label: 'Dollaro USA ($)', symbol: '$' },
    { value: 'GBP', label: 'Sterlina (£)', symbol: '£' },
    { value: 'JPY', label: 'Yen (¥)', symbol: '¥' }
  ];

  const timezoneOptions = [
    { value: 'Europe/Rome', label: 'Europa/Roma (CET)' },
    { value: 'Europe/London', label: 'Europa/Londra (GMT)' },
    { value: 'America/New_York', label: 'America/New York (EST)' },
    { value: 'Asia/Tokyo', label: 'Asia/Tokyo (JST)' }
  ];

  return (
    <div className="space-y-6">
      {/* Interface Language */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Globe" size={16} className="mr-2" />
          Lingua Interfaccia
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {languageOptions?.map((lang) => (
            <label key={lang?.value} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-surface rounded">
              <input
                type="radio"
                name="interface-language"
                value={lang?.value}
                checked={interfaceLanguage === lang?.value}
                onChange={(e) => setInterfaceLanguage(e?.target?.value)}
                className="w-3 h-3"
              />
              <span className="text-lg">{lang?.flag}</span>
              <span className="text-xs font-caption text-text-primary">
                {lang?.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Date and Time Formats */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Calendar" size={16} className="mr-2" />
          Formato Data e Ora
        </h3>
        
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-caption text-text-secondary mb-2">
              Formato Data
            </label>
            <div className="space-y-2">
              {dateFormatOptions?.map((format) => (
                <label key={format?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="date-format"
                    value={format?.value}
                    checked={dateFormat === format?.value}
                    onChange={(e) => setDateFormat(e?.target?.value)}
                    className="w-3 h-3"
                  />
                  <span className="text-xs font-caption text-text-primary">
                    {format?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-xs font-caption text-text-secondary mb-2">
              Formato Ora
            </label>
            <div className="space-y-2">
              {timeFormatOptions?.map((format) => (
                <label key={format?.value} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="radio"
                    name="time-format"
                    value={format?.value}
                    checked={timeFormat === format?.value}
                    onChange={(e) => setTimeFormat(e?.target?.value)}
                    className="w-3 h-3"
                  />
                  <span className="text-xs font-caption text-text-primary">
                    {format?.label}
                  </span>
                </label>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* Number Format */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Hash" size={16} className="mr-2" />
          Formato Numeri
        </h3>
        
        <div className="space-y-2">
          {numberFormatOptions?.map((format) => (
            <label key={format?.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="number-format"
                value={format?.value}
                checked={numberFormat === format?.value}
                onChange={(e) => setNumberFormat(e?.target?.value)}
                className="w-3 h-3"
              />
              <span className="text-xs font-caption text-text-primary">
                {format?.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Currency */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="DollarSign" size={16} className="mr-2" />
          Valuta
        </h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {currencyOptions?.map((curr) => (
            <label key={curr?.value} className="flex items-center space-x-3 cursor-pointer p-2 hover:bg-surface rounded">
              <input
                type="radio"
                name="currency"
                value={curr?.value}
                checked={currency === curr?.value}
                onChange={(e) => setCurrency(e?.target?.value)}
                className="w-3 h-3"
              />
              <span className="text-sm font-bold">{curr?.symbol}</span>
              <span className="text-xs font-caption text-text-primary">
                {curr?.label}
              </span>
            </label>
          ))}
        </div>
      </div>
      {/* Timezone */}
      <div className="sunken-border bg-background p-4">
        <h3 className="text-sm font-bold text-text-primary mb-3 font-heading flex items-center">
          <Icon name="Clock" size={16} className="mr-2" />
          Fuso Orario
        </h3>
        
        <div className="space-y-2">
          {timezoneOptions?.map((tz) => (
            <label key={tz?.value} className="flex items-center space-x-2 cursor-pointer">
              <input
                type="radio"
                name="timezone"
                value={tz?.value}
                checked={timezone === tz?.value}
                onChange={(e) => setTimezone(e?.target?.value)}
                className="w-3 h-3"
              />
              <span className="text-xs font-caption text-text-primary">
                {tz?.label}
              </span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};

export default LocalizationTab;