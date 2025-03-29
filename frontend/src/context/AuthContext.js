import React, { createContext, useState, useContext, useEffect } from 'react';
import jwt_decode from 'jwt-decode';
import axios from 'axios';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const decoded = jwt_decode(token);
        const currentTime = Date.now() / 1000;

        if (decoded.exp > currentTime) {
          setCurrentUser({
            id: decoded.user_id,
            username: decoded.sub,
            isAdmin: decoded.is_admin
          });
          setIsAuthenticated(true);
          setIsAdmin(decoded.is_admin);
        } else {
          // Token expired
          localStorage.removeItem('token');
        }
      } catch (error) {
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  const login = async (username, password) => {
    try {
      console.log('Attempting login with:', username);
      
      const formData = new URLSearchParams();
      formData.append('username', username);
      formData.append('password', password);
      
      const response = await axios.post('http://localhost:8000/token', formData, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
      
      console.log('Login response:', response.data);
      
      if (response.data && response.data.access_token) {
        const { access_token } = response.data;
        console.log('Login successful, token received');
        
        localStorage.setItem('token', access_token);
        
        const decoded = jwt_decode(access_token);
        console.log('Decoded token:', decoded);
        
        setCurrentUser({
          id: decoded.user_id,
          username: decoded.sub,
          isAdmin: decoded.is_admin
        });
        setIsAuthenticated(true);
        setIsAdmin(decoded.is_admin);
        
        return true;
      } else {
        console.error('No access token in response');
        return false;
      }
    } catch (error) {
      console.error('Login error:', error.response ? error.response.data : error.message);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setIsAdmin(false);
  };

  const register = async (username, email, password) => {
    try {
      await axios.post('http://localhost:8000/users/', {
        username,
        email,
        password
      });
      return true;
    } catch (error) {
      console.error('Registration error:', error.response ? error.response.data : error.message);
      return false;
    }
  };

  const value = {
    currentUser,
    isAuthenticated,
    isAdmin,
    loading,
    login,
    logout,
    register
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
