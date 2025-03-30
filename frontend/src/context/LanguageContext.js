import React, { createContext, useContext, useState, useEffect } from 'react';
import translations from '../translations';

// Create context
const LanguageContext = createContext();

// Hook to use language context
export const useLanguage = () => useContext(LanguageContext);

// Language provider component
export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'en';
  });

  useEffect(() => {
    localStorage.setItem('language', language);
    document.documentElement.setAttribute('lang', language);
  }, [language]);

  const t = (key) => {
    const keys = key.split('.');
    let value = translations[language];
    for (const k of keys) {
      if (value && value[k]) {
        value = value[k];
      } else {
        console.warn(`Translation key not found: ${key}`);
        return key;
      }
    }
    return value;
  };

  const toggleLanguage = () => {
    setLanguage(prevLang => (prevLang === 'en' ? 'pl' : 'en'));
  };

  const changeLanguage = (lang) => {
    if (['en', 'pl'].includes(lang)) {
      setLanguage(lang);
    } else {
      console.warn(`Unsupported language: ${lang}`);
    }
  };

  return (
    <LanguageContext.Provider value={{ language, t, changeLanguage, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
