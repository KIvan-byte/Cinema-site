import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/movies', label: 'Movies' },
    { path: '/about', label: 'About Us' }
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
            
            {/* Theme Toggle Button */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-cinema-red focus:outline-none focus:ring-2 focus:ring-white transition-colors duration-300"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
            {isAuthenticated ? (
              <>
                <Link to="/profile" className="font-medium hover:text-cinema-orange transition duration-150">Profile</Link>
                {isAdmin && (
                  <Link to="/admin" className="font-medium hover:text-cinema-orange transition duration-150">Admin</Link>
                )}
                <button 
                  onClick={handleLogout}
                  className="font-medium hover:text-cinema-orange transition duration-150"
                >
                  Logout
                </button>
                <span className="ml-2 px-3 py-1 bg-white text-cinema-red-dark rounded-full font-medium text-sm">
                  {currentUser?.username}
                </span>
              </>
            ) : (
              <>
                <Link to="/login" className="font-medium hover:text-cinema-orange transition duration-150">Login</Link>
                <Link 
                  to="/register" 
                  className="bg-white text-cinema-red-dark px-4 py-2 rounded-lg font-medium hover:bg-cinema-gray-light hover:text-cinema-red transition duration-150"
                >
                  Register
                </Link>
              </>
            )}
          </div>
          
          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            {/* Mobile Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-cinema-red focus:outline-none focus:ring-2 focus:ring-white mr-2 transition-colors duration-300"
              aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
            >
              {theme === 'dark' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              )}
            </button>
            
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
            
            {isAuthenticated ? (
              <>
                <Link 
                  to="/profile" 
                  className="block py-2 font-medium hover:bg-cinema-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Profile
                </Link>
                {isAdmin && (
                  <Link 
                    to="/admin" 
                    className="block py-2 font-medium hover:bg-cinema-red"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Admin
                  </Link>
                )}
                <button 
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="block w-full text-left py-2 font-medium hover:bg-cinema-red"
                >
                  Logout
                </button>
                <div className="py-2 font-medium">
                  Signed in as: <span className="font-bold">{currentUser?.username}</span>
                </div>
              </>
            ) : (
              <>
                <Link 
                  to="/login" 
                  className="block py-2 font-medium hover:bg-cinema-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Login
                </Link>
                <Link 
                  to="/register" 
                  className="block py-2 font-medium hover:bg-cinema-red"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Register
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
