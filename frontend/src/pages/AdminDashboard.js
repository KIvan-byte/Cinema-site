import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import MoviesManagement from '../components/admin/MoviesManagement';
import ShowtimesManagement from '../components/admin/ShowtimesManagement';
import HallsManagement from '../components/admin/HallsManagement';
import Statistics from '../components/admin/Statistics';

const AdminDashboard = () => {
  return (
    <div className="flex flex-col md:flex-row">
      {/* Sidebar */}
      <div className="md:w-64 bg-gray-800 text-white md:min-h-screen p-4">
        <h1 className="text-xl font-bold mb-6">Admin Panel</h1>
        <nav className="space-y-2">
          <NavLink 
            to="/admin" 
            end
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Statistics
          </NavLink>
          <NavLink 
            to="/admin/movies" 
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Movies
          </NavLink>
          <NavLink 
            to="/admin/showtimes" 
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Showtimes
          </NavLink>
          <NavLink 
            to="/admin/halls" 
            className={({ isActive }) => 
              `block p-2 rounded ${isActive ? 'bg-blue-600' : 'hover:bg-gray-700'}`
            }
          >
            Halls
          </NavLink>
        </nav>
      </div>
      
      {/* Content Area */}
      <div className="flex-1 p-4">
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
