import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import Movies from './pages/Movies';
import About from './pages/About';
import MovieDetails from './pages/MovieDetails';
import SeatSelection from './pages/SeatSelection';
import Checkout from './pages/Checkout';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import LoadingSpinner from './components/LoadingSpinner';
import { AuthProvider, useAuth } from './context/AuthContext';
import { ThemeProvider } from './context/ThemeContext';
import { LanguageProvider } from './context/LanguageContext'; // New import
import './App.css';

const App = () => {
  return (
    <Router>
      <ThemeProvider>
        <LanguageProvider> {/* Wrap with LanguageProvider */}
          <AuthProvider>
            <div className="min-h-screen bg-gray-100 dark:bg-dark-bg-primary text-gray-900 dark:text-dark-text-primary transition-colors duration-300 flex flex-col">
              <Navbar />
              {/* Remove the container width constraint and padding */}
              <div className="flex-grow">
                <Routes>
                  <Route path="/" element={<HomePage />} />
                  <Route path="/movies" element={<Movies />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/movie/:id" element={<MovieDetails />} />
                  <Route 
                    path="/seats/:showtimeId" 
                    element={
                      <ProtectedRoute>
                        <SeatSelection />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/checkout/:reservationId" 
                    element={
                      <ProtectedRoute>
                        <Checkout />
                      </ProtectedRoute>
                    } 
                  />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route 
                    path="/profile" 
                    element={
                      <ProtectedRoute>
                        <Profile />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/admin/*" 
                    element={
                      <AdminRoute>
                        <AdminDashboard />
                      </AdminRoute>
                    } 
                  />
                </Routes>
              </div>
              <Footer />
            </div>
          </AuthProvider>
        </LanguageProvider>
      </ThemeProvider>
    </Router>
  );
};

const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) return (
    <div className="text-center py-10">
      <LoadingSpinner size="medium" color="cinema-red" />
    </div>
  );
  
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

const AdminRoute = ({ children }) => {
  const { isAuthenticated, isAdmin, loading } = useAuth();
  
  if (loading) return (
    <div className="text-center py-10">
      <LoadingSpinner size="medium" color="cinema-red" />
    </div>
  );
  
  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/login" />;
  }
  
  return children;
};

export default App;
