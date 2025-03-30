import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const validateForm = () => {
    const newErrors = {};
    
    if (!username) {
      newErrors.username = t('register.usernameRequired') || 'Username is required';
    } else if (username.length < 3) {
      newErrors.username = t('register.usernameLength') || 'Username must be at least 3 characters';
    }
    
    if (!email) {
      newErrors.email = t('register.emailRequired') || 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = t('register.emailInvalid') || 'Invalid email format';
    }
    
    if (!password) {
      newErrors.password = t('register.passwordRequired') || 'Password is required';
    } else if (password.length < 6) {
      newErrors.password = t('register.passwordLength') || 'Password must be at least 6 characters';
    }
    
    if (!confirmPassword) {
      newErrors.confirmPassword = t('register.confirmPasswordRequired') || 'Please confirm your password';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = t('register.passwordMismatch') || 'Passwords do not match';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setLoading(true);
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/login', { state: { registered: true } });
      } else {
        setErrors({ general: t('register.registrationFailed') || 'Registration failed. Please try again.' });
      }
    } catch (err) {
      console.error('Registration error:', err);
      const errorMessage = err.response?.data?.detail || t('register.errorOccurred') || 'An error occurred';
      setErrors({ general: errorMessage });
    }
    setLoading(false);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-opacity-50 relative">
      {/* Decorative Cinema Element - Top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden h-16 z-0">
        <div className="cinema-reel w-full h-16 border-b border-cinema-red-dark dark:border-cinema-red"></div>
      </div>
      
      {/* Registration Container */}
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
            {t('nav.register')}
          </h2>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t('register.createAccount') || 'Create your account to access exclusive features'}
          </p>
        </div>

        {/* General Error Message */}
        {errors.general && (
          <div className="bg-red-50 dark:bg-red-900/30 border-l-4 border-cinema-red p-4 rounded-lg shadow-sm animate-fade-in">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-400" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-600 dark:text-red-400">{errors.general}</p>
              </div>
            </div>
          </div>
        )}

        {/* Registration Form */}
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div className="rounded-md shadow-sm space-y-4">
            {/* Username Field */}
            <div className="group">
              <label htmlFor="username" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register.username') || 'Username'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-cinema-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="username"
                  name="username"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className={`focus:ring-cinema-red focus:border-cinema-red block w-full pl-10 pr-3 py-3 border ${errors.username ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors`}
                  placeholder={t('register.usernamePlaceholder')}
                />
              </div>
              {errors.username && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.username}</p>
              )}
            </div>

            {/* Email Field */}
            <div className="group">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register.email') || 'Email'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-cinema-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                  </svg>
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`focus:ring-cinema-red focus:border-cinema-red block w-full pl-10 pr-3 py-3 border ${errors.email ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors`}
                  placeholder={t('register.emailPlaceholder')}
                />
              </div>
              {errors.email && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.email}</p>
              )}
            </div>

            {/* Password Field */}
            <div className="group">
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register.password') || 'Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-cinema-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="password"
                  name="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={`focus:ring-cinema-red focus:border-cinema-red block w-full pl-10 pr-3 py-3 border ${errors.password ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors`}
                  placeholder={t('register.passwordPlaceholder')}
                />
              </div>
              {errors.password && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Field */}
            <div className="group">
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                {t('register.confirmPassword') || 'Confirm Password'}
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400 group-focus-within:text-cinema-red" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                  </svg>
                </div>
                <input
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className={`focus:ring-cinema-red focus:border-cinema-red block w-full pl-10 pr-3 py-3 border ${errors.confirmPassword ? 'border-red-500 dark:border-red-500' : 'border-gray-300 dark:border-gray-700'} rounded-lg shadow-sm placeholder-gray-400 dark:placeholder-gray-600 bg-white dark:bg-gray-800 text-gray-900 dark:text-white transition-colors`}
                  placeholder={t('register.confirmPasswordPlaceholder')}
                />
              </div>
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-600 dark:text-red-400">{errors.confirmPassword}</p>
              )}
            </div>
          </div>

          {/* Submit Button */}
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
                t('nav.register')
              )}
            </button>
          </div>
        </form>

        {/* Login Link */}
        <div className="text-center mt-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">
            {t('register.alreadyHaveAccount')}{' '}
            <Link to="/login" className="font-medium text-cinema-red hover:text-cinema-red-dark dark:hover:text-cinema-red-light transition-colors">
              {t('nav.login')}
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

export default Register;
