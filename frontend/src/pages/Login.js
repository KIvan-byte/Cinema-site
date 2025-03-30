import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  // Get redirect path from location state or default to home
  const from = location.state?.from || '/';
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!username || !password) {
      setError(t('login.enterBoth'));
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
        setError(t('login.invalidCredentials'));
      }
    } catch (err) {
      setError(t('login.errorOccurred'));
      console.error('Login error details:', err);
    }
    
    setLoading(false);
  };
  
  return (
    <div className="max-w-md mx-auto mt-8">
      <div className="bg-white p-8 border border-cinema-gray-light rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold mb-6 text-center text-cinema-black">{t('nav.login')}</h1>
        
        {error && (
          <div className="bg-red-100 border border-cinema-red text-cinema-red-dark px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="username" className="block text-cinema-black mb-2">
              {t('login.username')}
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-3 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
              placeholder={t('login.usernamePlaceholder')}
            />
          </div>
          
          <div className="mb-6">
            <label htmlFor="password" className="block text-cinema-black mb-2">
              {t('login.password')}
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-3 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
              placeholder={t('login.passwordPlaceholder')}
            />
          </div>
          
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 px-4 rounded-lg font-bold text-white ${
              loading ? 'bg-cinema-gray cursor-not-allowed' : 'bg-cinema-red-dark hover:bg-cinema-red transition-colors'
            }`}
          >
            {loading ? t('common.loading') : t('nav.login')}
          </button>
        </form>
        
        <div className="mt-4 text-center">
          <p className="text-cinema-black">
            {t('login.noAccount')}{' '}
            <Link to="/register" className="text-cinema-red-dark hover:text-cinema-orange transition-colors">
              {t('nav.register')}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
