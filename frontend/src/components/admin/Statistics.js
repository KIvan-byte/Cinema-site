import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const Statistics = () => {
  const [statistics, setStatistics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await api.get('/admin/statistics');
        setStatistics(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load statistics data');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-cinema-red-dark">{error}</div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-cinema-black">Sales Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-cinema-gray text-sm mb-1">Total Revenue</div>
          <div className="text-2xl font-bold text-cinema-red-dark">${statistics.total_sales.toFixed(2)}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-cinema-gray text-sm mb-1">Tickets Sold</div>
          <div className="text-2xl font-bold text-cinema-black">{statistics.tickets_sold}</div>
        </div>
        
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="text-cinema-gray text-sm mb-1">Average Ticket Price</div>
          <div className="text-2xl font-bold text-cinema-orange">
            ${statistics.tickets_sold > 0 
              ? (statistics.total_sales / statistics.tickets_sold).toFixed(2) 
              : '0.00'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-cinema-red to-cinema-red-dark text-white p-5">
          <h2 className="font-semibold text-lg">Popular Movies</h2>
        </div>
        <div className="p-5">
          {statistics.popular_movies && statistics.popular_movies.length > 0 ? (
            <div className="divide-y divide-cinema-gray-light">
              {statistics.popular_movies.map((movie, index) => (
                <div key={movie.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-cinema-gray mr-4">#{index + 1}</span>
                    <span className="font-medium text-cinema-black">{movie.title}</span>
                  </div>
                  <span className="bg-cinema-red-light text-cinema-red-dark text-xs font-medium px-3 py-1 rounded-full">
                    {movie.reservations} {movie.reservations === 1 ? 'ticket' : 'tickets'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-cinema-gray">No movie sales data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
