import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Check if user was redirected from registration
  useEffect(() => {
    if (location.state?.registered) {
      setShowSuccessMessage(true);
      // Hide the message after 5 seconds
      const timer = setTimeout(() => setShowSuccessMessage(false), 5000);
      return () => clearTimeout(timer);
    }
  }, [location.state]);
  
  // Get redirect path from location state or default to home
  const from = location.state?.from || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError(t('login.enterBoth') || 'Please enter both username and password');
      return;
    }
    
    setError('');
    setLoading(true);
    
    try {
      console.log('Attempting login with:', username, 'password length:', password.length);
      const success = await login(username, password);
      
      if (success) {
        navigate(from, { replace: true });
      } else {
        setError(t('login.invalidCredentials') || 'Invalid username or password');
      }
    } catch (err) {
      setError(t('login.errorOccurred') || 'An error occurred. Please try again.');
      console.error('Login error details:', err);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-opacity-50 relative">
      {/* Decorative Cinema Element - Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-16 z-0">
        <div className="cinema-reel w-full h-16 border-b border-cinema-red-dark dark:border-cinema-red"></div>
      </div>
      
      {/* Login Container */}
      <div className="max-w-md w-full space-y-8 relative z-10">
        {/* Cinema Logo/Header */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <span className="px-4 py-2 bg-cinema-red dark:bg-cinema-red-dark text-white rounded-lg shadow-lg transform -rotate-3 text-2xl font-extrabold tracking-wider">
              CINEMA
            </span>
            <span className="ml-3 text-3xl font-bold text-cinema-black dark:text-white">
              TICKETS
            </span>
          </div>
          <h2 className="mt-6 text-3xl font-extrabold text-cinema-black dark:text-white">
            {t('nav.login')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('login.welcomeBack')}
          </p>
        </div>
        
        {/* Success Message */}
        {showSuccessMessage && (
          <div className="bg-green-100 dark:bg-green-900 border border-green-400 dark:border-green-600 text-green-700 dark:text-green-200 px-4 py-3 rounded-lg relative animate-fade-in">
            <span className="block sm:inline">{t('register.successMessage') || 'Registration successful! Please log in.'}</span>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-cinema-red p-4 rounded-lg shadow-sm animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
              </div>
            </div>
          </div>
        )}
        
        {/* Login Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            <div className="group">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('login.username')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-cinema-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="focus:ring-cinema-red focus:border-cinema-red block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  placeholder={t('login.usernamePlaceholder')}
                />
              </div>
            </div>
            
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('login.password')}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-cinema-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="focus:ring-cinema-red focus:border-cinema-red block w-full pl-10 pr-3 py-3 border border-gray-300 dark:border-gray-700 rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors"
                  placeholder={t('login.passwordPlaceholder')}
                />
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="remember_me"
                name="remember_me"
                type="checkbox"
                className="h-4 w-4 text-cinema-red focus:ring-cinema-red border-gray-300 rounded"
              />
              <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-900 dark:text-gray-300">
                {t('login.rememberMe') || 'Remember me'}
              </label>
            </div>

            <div className="text-sm">
              <a href="#" className="font-medium text-cinema-red hover:text-cinema-red-dark dark:hover:text-cinema-red-light">
                {t('login.forgotPassword') || 'Forgot your password?'}
              </a>
            </div>
          </div>

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-3 px-4 border border-transparent rounded-lg text-lg font-medium text-white bg-cinema-red hover:bg-cinema-red-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-cinema-red-light disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 shadow-md"
            >
              {loading ? (
                <>
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  {t('common.loading')}
                </>
              ) : (
                t('nav.login')
              )}
            </button>
          </div>
        </form>

        {/* Register Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="font-medium text-cinema-red hover:text-cinema-red-dark dark:hover:text-cinema-red-light transition-colors">
              {t('nav.register')}
            </Link>
          </p>
        </div>
        
        {/* Decorative Film Element */}
        <div className="absolute bottom-0 left-0 w-full overflow-hidden h-16 z-0">
          <div className="film-strip w-full h-8 flex">
            {[...Array(20)].map((_, index) => (
              <div key={index} className="film-hole bg-cinema-black dark:bg-gray-700 opacity-50"></div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
