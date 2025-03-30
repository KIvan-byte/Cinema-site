import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
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
    <nav className="bg-cinema-red-dark text-white shadow-lg">
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
