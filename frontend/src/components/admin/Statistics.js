import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const Statistics = () => {
  const { t } = useLanguage();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStatistics = async () => {
      try {
        const response = await api.get('/admin/statistics');
        setStats(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching statistics:', err);
        setError('Failed to load statistics');
        setLoading(false);
      }
    };

    fetchStatistics();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative">
        <strong className="font-bold">Error!</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6 text-cinema-black">
        {t("admin.statistics")}
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <StatCard 
          title={t("admin.totalTickets")} 
          value={stats?.totalTickets || 0} 
          color="bg-blue-500" 
        />
        <StatCard 
          title={t("admin.revenue")} 
          value={`$${stats?.totalRevenue?.toFixed(2) || "0.00"}`} 
          color="bg-green-500" 
        />
        <StatCard 
          title={t("admin.upcomingShowtimes")} 
          value={stats?.upcomingShowtimes || 0} 
          color="bg-yellow-500" 
        />
        <StatCard 
          title={t("admin.totalMovies")} 
          value={stats?.totalMovies || 0} 
          color="bg-purple-500" 
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-cinema-black">
            {t("admin.popularMovies")}
          </h2>
          <div className="space-y-4">
            {stats?.popularMovies?.slice(0, 5).map((movie, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium text-cinema-black">{movie.title}</p>
                  <p className="text-sm text-gray-500">
                    {movie.tickets_sold} {t("admin.ticketsSold")}
                  </p>
                </div>
                <div className="font-semibold text-cinema-red-dark">
                  ${movie.revenue?.toFixed(2) || "0.00"}
                </div>
              </div>
            ))}
            {(!stats?.popularMovies || stats.popularMovies.length === 0) && (
              <p className="text-gray-500">{t("admin.noDataAvailable")}</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4 text-cinema-black">
            {t("admin.recentTransactions")}
          </h2>
          <div className="space-y-4">
            {stats?.recentTransactions?.slice(0, 5).map((transaction, index) => (
              <div key={index} className="flex justify-between items-center border-b pb-2">
                <div>
                  <p className="font-medium text-cinema-black">{transaction.user_name}</p>
                  <p className="text-sm text-gray-500">{transaction.movie_title}</p>
                  <p className="text-xs text-gray-400">
                    {new Date(transaction.date).toLocaleString()}
                  </p>
                </div>
                <div className="font-semibold text-cinema-red-dark">
                  ${transaction.amount?.toFixed(2) || "0.00"}
                </div>
              </div>
            ))}
            {(!stats?.recentTransactions || stats.recentTransactions.length === 0) && (
              <p className="text-gray-500">{t("admin.noDataAvailable")}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, color }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden">
    <div className={`${color} h-2`}></div>
    <div className="p-4">
      <h3 className="text-gray-500 text-sm font-medium">{title}</h3>
      <p className="mt-1 text-3xl font-semibold text-cinema-black">{value}</p>
    </div>
  </div>
);

export default Statistics;
