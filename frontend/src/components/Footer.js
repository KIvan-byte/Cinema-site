import React from 'react';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  return (
    <footer className="bg-cinema-black text-white py-4 text-center">
      {/* Use a translation placeholder for footer text */}
      <p>{t("footer.text") || "© 2023 Cinema Tickets. All rights reserved."}</p>
    </footer>
  );
};

export default Footer;
