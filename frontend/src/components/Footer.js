import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-cinema-black text-white py-6">
      <div className="container mx-auto px-6 md:px-8 text-center">
        <p className="text-gray-400">{t("footer.text")}</p>
        <p className="text-gray-400 mt-2">Made with ❤️ for movie lovers</p>
      </div>
    </footer>
  );
};

export default Footer;
