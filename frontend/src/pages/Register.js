import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !email || !password || !confirmPassword) {
      setError(t('register.allFieldsRequired'));
      return;
    }
    if (password !== confirmPassword) {
      setError(t('register.passwordMismatch'));
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError(t('register.invalidEmail'));
      return;
    }
    if (password.length < 6) {
      setError(t('register.shortPassword'));
      return;
    }
    setError('');
    setLoading(true);
    try {
      const success = await register(username, email, password);
      if (success) {
        navigate('/login', { state: { registered: true } });
      } else {
        setError(t('register.registrationFailed'));
      }
    } catch (err) {
      setError(t('register.errorOccurred'));
      console.error(err);
    }
    setLoading(false);
  };

  return (
    <div className="max-w-md mx-auto mt-8">
      <h1 className="text-2xl font-bold mb-6">{t("nav.register")}</h1>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder={t("register.usernamePlaceholder")} value={username} onChange={(e) => setUsername(e.target.value)} className="w-full px-4 py-3 mb-4 rounded-lg" />
        <input type="email" placeholder={t("register.emailPlaceholder")} value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-3 mb-4 rounded-lg" />
        <input type="password" placeholder={t("register.passwordPlaceholder")} value={password} onChange={(e) => setPassword(e.target.value)} className="w-full px-4 py-3 mb-4 rounded-lg" />
        <input type="password" placeholder={t("register.confirmPasswordPlaceholder")} value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} className="w-full px-4 py-3 mb-6 rounded-lg" />
        <button type="submit" className="w-full py-3 rounded-lg font-bold bg-cinema-red-dark text-white">{loading ? t("common.loading") : t("nav.register")}</button>
        {error && <div className="mt-4 text-red-600">{error}</div>}
      </form>
      <div className="mt-4 text-center">
        <p className="text-cinema-black">
          {t("register.alreadyHaveAccount")} <Link to="/login" className="text-cinema-red-dark hover:text-cinema-orange transition-colors">{t("nav.login")}</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
