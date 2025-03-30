import React, { useState, useEffect } from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import MoviesManagement from '../components/admin/MoviesManagement';
import ShowtimesManagement from '../components/admin/ShowtimesManagement';
import HallsManagement from '../components/admin/HallsManagement';
import Statistics from '../components/admin/Statistics';

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [loading, setLoading]       = useState(true);
  const [error, setError]           = useState(null);

  useEffect(() => {
    setLoading(false);
  }, [t]);
  
  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        {t("common.loading")}
      </div>
    );
  }
  
  if (error) {
    return (
      <div className="text-center py-10">
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-64 bg-cinema-black text-white md:min-h-screen p-4">
        <h1 className="text-xl font-bold mb-6">{t("admin.panelTitle")}</h1>
        <nav className="space-y-2">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-cinema-red-dark' : 'hover:bg-cinema-red hover:bg-opacity-60'}`
            }
          >
            {t("admin.statistics")}
          </NavLink>
          <NavLink 
            to="/admin/movies" 
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-cinema-red-dark' : 'hover:bg-cinema-red hover:bg-opacity-60'}`
            }
          >
            {t("admin.movies")}
          </NavLink>
          <NavLink 
            to="/admin/showtimes" 
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-cinema-red-dark' : 'hover:bg-cinema-red hover:bg-opacity-60'}`
            }
          >
            {t("admin.showtimes")}
          </NavLink>
          <NavLink 
            to="/admin/halls" 
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-cinema-red-dark' : 'hover:bg-cinema-red hover:bg-opacity-60'}`
            }
          >
            {t("admin.halls")}
          </NavLink>
        </nav>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 p-4 bg-cinema-gray-light">
        <Routes>
          <Route path="/" element={<Statistics />} />
          <Route path="/movies" element={<MoviesManagement />} />
          <Route path="/showtimes" element={<ShowtimesManagement />} />
          <Route path="/halls" element={<HallsManagement />} />
        </Routes>
      </div>
    </div>
  );
};

export default AdminDashboard;
