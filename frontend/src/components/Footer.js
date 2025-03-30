import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-gray-800 dark:bg-gray-900 text-white mt-auto transition-colors duration-300">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Cinema Info */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">Cinema Tickets</h3>
            <p className="mb-2">Your premier destination for the latest movies</p>
            <p className="mb-2">Comfortable seating, amazing sound, unforgettable experiences</p>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">Quick Links</h3>
            <ul>
              <li className="mb-2"><Link to="/" className="hover:text-red-400">Home</Link></li>
              <li className="mb-2"><Link to="/movies" className="hover:text-red-400">Movies</Link></li>
              <li className="mb-2"><Link to="/profile" className="hover:text-red-400">My Account</Link></li>
              <li className="mb-2"><Link to="/about" className="hover:text-red-400">About Us</Link></li>
            </ul>
          </div>
          
          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">Contact Us</h3>
            <p className="mb-2">123 Cinema Street</p>
            <p className="mb-2">Movie City, MC 12345</p>
            <p className="mb-2">Phone: (123) 456-7890</p>
            <p className="mb-2">Email: info@cinematickets.com</p>
          </div>
          
          {/* Social Media */}
          <div>
            <h3 className="text-xl font-bold text-red-500 mb-4">Follow Us</h3>
            <div className="flex flex-col space-y-2">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">Facebook</a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">Twitter</a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">Instagram</a>
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" className="hover:text-red-400">YouTube</a>
            </div>
          </div>
        </div>
        
        {/* Copyright */}
        <div className="mt-8 pt-4 border-t border-gray-700 dark:border-gray-800 text-center">
          <p>&copy; {currentYear} Cinema Tickets. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
