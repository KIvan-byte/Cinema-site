import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { isAuthenticated, isAdmin, currentUser, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center">
          <Link to="/" className="text-xl font-bold">Cinema Tickets</Link>
        </div>
        
        <div className="flex items-center space-x-4">
          <Link to="/" className="hover:text-gray-200">Home</Link>
          
          {isAuthenticated ? (
            <>
              <Link to="/profile" className="hover:text-gray-200">Profile</Link>
              {isAdmin && (
                <Link to="/admin" className="hover:text-gray-200">Admin</Link>
              )}
              <button 
                onClick={handleLogout}
                className="hover:text-gray-200"
              >
                Logout
              </button>
              <span className="ml-2 font-semibold">
                {currentUser?.username}
              </span>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-gray-200">Login</Link>
              <Link to="/register" className="hover:text-gray-200">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
