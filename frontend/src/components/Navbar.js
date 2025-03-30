import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
  const { t, toggleLanguage, language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setIsProfileDropdownOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Handle scroll effect for navbar
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown when clicking outside
  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest('.profile-dropdown') && isProfileDropdownOpen) {
        setIsProfileDropdownOpen(false);
      }
    };
    document.addEventListener('click', closeDropdown);
    return () => document.removeEventListener('click', closeDropdown);
  }, [isProfileDropdownOpen]);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  const handleLogout = () => {
    logout();
    navigate('/login');
    setIsProfileDropdownOpen(false);
  };

  // Main navigation links
  const mainNavLinks = [
    { path: '/', label: t("nav.home"), icon: '🏠' },
    { path: '/movies', label: t("nav.movies"), icon: '🎬' },
    { path: '/about', label: t("nav.about"), icon: 'ℹ️' },
  ];

  return (
    <nav className={`sticky top-0 z-50 transition-all duration-300 w-full ${isScrolled ? 'bg-cinema-red-dark shadow-md' : 'bg-gradient-to-r from-cinema-red-dark to-cinema-black'}`}>
      {/* Removed container class constraints for full width */}
      <div className="px-6 md:px-10 py-4 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="bg-white text-cinema-red-dark px-3 py-2 rounded font-bold text-2xl mr-2">CINEMA</span>
          <span className="text-white font-bold text-2xl">TICKETS</span>
        </Link>

        {/* Desktop Navigation with more spacing */}
        <div className="hidden md:flex items-center space-x-2">
          {/* Main Navigation Links */}
          <div className="flex items-center">
            {mainNavLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`px-5 py-2 rounded-lg font-medium transition duration-150 mx-1 ${
                  location.pathname === link.path
                    ? 'bg-white text-cinema-red-dark'
                    : 'text-white hover:bg-white/10'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Right Side: Language & Auth */}
          <div className="flex items-center ml-6 space-x-3">
            {/* Language Switcher */}
            <button 
              onClick={toggleLanguage} 
              className="px-3 py-1 text-sm text-white hover:bg-white/10 rounded-lg transition duration-150"
              aria-label="Change Language"
            >
              {language === 'en' ? '🇵🇱' : '🇬🇧'}
            </button>

            {/* Authentication */}
            {isAuthenticated ? (
              <div className="relative profile-dropdown">
                <button 
                  onClick={() => setIsProfileDropdownOpen(!isProfileDropdownOpen)}
                  className="flex items-center space-x-1 px-3 py-2 rounded-lg hover:bg-white/10 transition-colors text-white"
                >
                  <span className="font-medium">{currentUser?.username}</span>
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={isProfileDropdownOpen ? "M5 15l7-7 7 7" : "M19 9l-7 7-7-7"} />
                  </svg>
                </button>

                {/* Profile Dropdown */}
                {isProfileDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl py-2 z-50">
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-cinema-black hover:bg-gray-100 transition-colors"
                    >
                      {t("nav.profile")}
                    </Link>
                    {isAdmin && (
                      <Link 
                        to="/admin" 
                        className="block px-4 py-2 text-cinema-black hover:bg-gray-100 transition-colors"
                      >
                        {t("nav.admin")}
                      </Link>
                    )}
                    <hr className="my-1 border-gray-200" />
                    <button 
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-cinema-black hover:bg-gray-100 transition-colors"
                    >
                      {t("nav.logout")}
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link 
                  to="/login" 
                  className="px-4 py-2 text-white hover:bg-white/10 rounded-lg transition-colors"
                >
                  {t("nav.login")}
                </Link>
                <Link 
                  to="/register" 
                  className="px-4 py-2 bg-white text-cinema-red-dark hover:bg-gray-100 rounded-lg transition-colors font-medium"
                >
                  {t("nav.register")}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu Button */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none"
            aria-label={isMobileMenuOpen ? "Close Menu" : "Open Menu"}
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden mt-4 py-2 border-t border-white/20 space-y-2">
          {/* Main Navigation Links */}
          {mainNavLinks.map((link) => (
            <Link 
              key={link.path}
              to={link.path}
              className={`flex items-center px-4 py-3 rounded-lg font-medium transition-colors ${
                location.pathname === link.path
                  ? 'bg-white text-cinema-red-dark'
                  : 'text-white hover:bg-white/10'
              }`}
            >
              <span className="mr-3">{link.icon}</span>
              <span>{link.label}</span>
            </Link>
          ))}

          {/* Language Switcher - Fix incorrect closing tag */}
          <button 
            onClick={toggleLanguage}
            className="w-full text-left flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-lg"
          >
            <span className="mr-3">{language === 'en' ? '🇵🇱' : '🇬🇧'}</span>
            <span>{language === 'en' ? 'Polski' : 'English'}</span>
          </button>

          {/* Auth Links */}
          {isAuthenticated ? (
            <>
              <div className="px-4 py-2 text-gray-300">
                {t("common.signedInAs")} <span className="font-semibold text-white">{currentUser?.username}</span>
              </div>

              <Link 
                to="/profile" 
                className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-lg"
              >
                <span className="mr-3">👤</span>
                <span>{t("nav.profile")}</span>
              </Link>

              {isAdmin && (
                <Link 
                  to="/admin" 
                  className="flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-lg"
                >
                  <span className="mr-3">⚙️</span>
                  <span>{t("nav.admin")}</span>
                </Link>
              )}

              <button 
                onClick={handleLogout}
                className="w-full text-left flex items-center px-4 py-3 text-white hover:bg-white/10 rounded-lg"
              >
                <span className="mr-3">🚪</span>
                <span>{t("nav.logout")}</span>
              </button>
            </>
          ) : (
            <div className="space-y-2 pt-2 border-t border-white/10">
              <Link 
                to="/login" 
                className="block px-4 py-3 text-white hover:bg-white/10 rounded-lg"
              >
                {t("nav.login")}
              </Link>
              <Link 
                to="/register" 
                className="block px-4 py-3 bg-white text-cinema-red-dark hover:bg-gray-100 rounded-lg text-center font-medium mx-4"
              >
                {t("nav.register")}
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
