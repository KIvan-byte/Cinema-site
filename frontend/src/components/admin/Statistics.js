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
    return <div className="text-center py-10">Loading statistics...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Sales Statistics</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-1">Total Revenue</div>
          <div className="text-2xl font-bold">${statistics.total_sales.toFixed(2)}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-1">Tickets Sold</div>
          <div className="text-2xl font-bold">{statistics.tickets_sold}</div>
        </div>
        
        <div className="bg-white rounded-lg shadow p-6">
          <div className="text-gray-500 text-sm mb-1">Average Ticket Price</div>
          <div className="text-2xl font-bold">
            ${statistics.tickets_sold > 0 
              ? (statistics.total_sales / statistics.tickets_sold).toFixed(2) 
              : '0.00'}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="bg-blue-600 text-white p-4">
          <h2 className="font-semibold text-lg">Popular Movies</h2>
        </div>
        <div className="p-4">
          {statistics.popular_movies && statistics.popular_movies.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {statistics.popular_movies.map((movie, index) => (
                <div key={movie.id} className="py-3 flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-gray-500 mr-4">#{index + 1}</span>
                    <span className="font-medium">{movie.title}</span>
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded">
                    {movie.reservations} {movie.reservations === 1 ? 'ticket' : 'tickets'}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No movie sales data available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Statistics;
