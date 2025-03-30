import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
  const { t, toggleLanguage, language } = useLanguage(); // Using language functions
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Replace hardcoded labels with translation placeholders
  const navLinks = [
    { path: '/', label: t("nav.home") },
    { path: '/movies', label: t("nav.movies") },
    { path: '/about', label: t("nav.about") }
  ];

  return (
    <nav className="bg-cinema-red-dark dark:bg-gray-900 text-white shadow-lg transition-colors duration-300">
      <div className="container mx-auto px-4 py-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <Link to="/" className="text-xl font-bold tracking-wide">
              <span className="bg-white text-cinema-red-dark px-2 py-1 rounded mr-1">CINEMA</span>
              <span>TICKETS</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-medium transition duration-150 ${
                  location.pathname === link.path
                    ? 'text-cinema-orange border-b-2 border-cinema-orange'
                    : 'hover:text-cinema-orange'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Language Switcher Button */}
            <button onClick={toggleLanguage} className="text-sm hover:text-cinema-orange">
              {language === 'en' ? 'Polski' : 'English'}
            </button>

            {isAuthenticated ? (
              <>
                <Link to="/profile" className="font-medium hover:text-cinema-orange transition duration-150">
                  {t("nav.profile")}
                </Link>
                {isAdmin && (
                  <Link to="/admin" className="font-medium hover:text-cinema-orange transition duration-150">
                    {t("nav.admin")}
                  </Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="font-medium hover:text-cinema-orange transition duration-150"
                >
                  {t("nav.logout")}
                </button>
                <span className="ml-2 px-3 py-1 bg-white text-cinema-red-dark rounded-full font-medium text-sm">
                  {currentUser?.username}
                </span>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium hover:text-cinema-orange transition duration-150">
                  {t("nav.login")}
                </Link>
                <Link 
                  to="/register" 
                  className="bg-white text-cinema-red-dark px-4 py-2 rounded-lg font-medium hover:bg-cinema-gray-light hover:text-cinema-red transition duration-150"
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-white focus:outline-none"
            >
              <svg 
                className="h-6 w-6" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pt-4 pb-2 space-y-3">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path}
                className="block py-2 font-medium hover:bg-cinema-red"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}

            {/* Mobile Language Switcher */}
            <button onClick={toggleLanguage} className="block py-2 font-medium hover:bg-cinema-red">
              {language === 'en' ? 'Polski' : 'English'}
            </button>

            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 font-medium hover:bg-cinema-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.profile")}
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block py-2 font-medium hover:bg-cinema-red"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t("nav.admin")}
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 font-medium hover:bg-cinema-red"
                >
                  {t("nav.logout")}
                </button>
                <div className="py-2 font-medium">
                  {t("common.signedInAs")} <span className="font-bold">{currentUser?.username}</span>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 font-medium hover:bg-cinema-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.login")}
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 font-medium hover:bg-cinema-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {t("nav.register")}
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
