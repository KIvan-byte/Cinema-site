import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';
import { format } from 'date-fns';

const ShowtimesManagement = () => {
  const { t } = useLanguage();
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingShowtime, setEditingShowtime] = useState(null);
  const [formData, setFormData] = useState({
    movie_id: '',
    hall_id: '',
    start_time: '',
    price: ''
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const [showtimesRes, moviesRes, hallsRes] = await Promise.all([
          api.get('/showtimes/'),
          api.get('/movies/'),
          api.get('/halls/')
        ]);
        
        setShowtimes(showtimesRes.data);
        setMovies(moviesRes.data);
        setHalls(hallsRes.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleOpenModal = (showtime = null) => {
    if (showtime) {
      // Format the date and time for the input
      const startTime = new Date(showtime.start_time);
      const formattedDateTime = format(startTime, "yyyy-MM-dd'T'HH:mm");
      
      setEditingShowtime(showtime);
      setFormData({
        movie_id: showtime.movie_id || showtime.movie?.id || '',
        hall_id: showtime.hall_id || showtime.hall?.id || '',
        start_time: formattedDateTime,
        price: showtime.price ? String(showtime.price) : ''
      });
    } else {
      setEditingShowtime(null);
      setFormData({
        movie_id: '',
        hall_id: '',
        start_time: '',
        price: ''
      });
    }
    
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const showtimeData = {
        ...formData,
        movie_id: parseInt(formData.movie_id),
        hall_id: parseInt(formData.hall_id),
        price: parseFloat(formData.price)
      };

      if (editingShowtime) {
        await api.put(`/showtimes/${editingShowtime.id}`, showtimeData);
      } else {
        await api.post('/showtimes/', showtimeData);
      }

      // Refresh the list of showtimes
      const response = await api.get('/showtimes/');
      setShowtimes(response.data);
      
      handleCloseModal();
    } catch (err) {
      console.error('Error saving showtime:', err);
      setError('Failed to save showtime');
    }
  };

  const handleDeleteShowtime = async (id) => {
    if (!window.confirm(t("admin.confirmDeleteShowtime") || "Are you sure you want to delete this showtime?")) return;
    
    try {
      await api.delete(`/showtimes/${id}`);
      
      // Refresh the list
      const response = await api.get('/showtimes/');
      setShowtimes(response.data);
    } catch (err) {
      console.error('Error deleting showtime:', err);
      setError('Failed to delete showtime');
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cinema-black">
          {t("admin.showtimes")}
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-cinema-red-dark text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors"
        >
          {t("admin.addShowtime")}
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4">
          <strong className="font-bold">Error!</strong>
          <span className="block sm:inline"> {error}</span>
        </div>
      )}

      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.movieTitle")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.hall")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.startTime")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.price")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {showtimes.map((showtime) => (
                <tr key={showtime.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {showtime.movie?.title || 'Unknown Movie'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {showtime.hall?.name || 'Unknown Hall'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {format(new Date(showtime.start_time), 'dd-MM-yyyy HH:mm')}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    ${showtime.price}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(showtime)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      {t("admin.edit")}
                    </button>
                    <button
                      onClick={() => handleDeleteShowtime(showtime.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      {t("admin.delete")}
                    </button>
                  </td>
                </tr>
              ))}
              {showtimes.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    {t("admin.noShowtimesFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Showtime Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-md p-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-cinema-black">
                {editingShowtime ? t("admin.editShowtime") : t("admin.addShowtime")}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="movie_id">
                  {t("admin.movie")}
                </label>
                <select
                  name="movie_id"
                  id="movie_id"
                  value={formData.movie_id}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">{t("admin.selectMovie")}</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="hall_id">
                  {t("admin.hall")}
                </label>
                <select
                  name="hall_id"
                  id="hall_id"
                  value={formData.hall_id}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                >
                  <option value="">{t("admin.selectHall")}</option>
                  {halls.map(hall => (
                    <option key={hall.id} value={hall.id}>
                      {hall.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="start_time">
                  {t("admin.startTime")}
                </label>
                <input
                  type="datetime-local"
                  name="start_time"
                  id="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="price">
                  {t("admin.price")}
                </label>
                <input
                  type="number"
                  name="price"
                  id="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  step="0.01"
                  min="0"
                  required
                />
              </div>

              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleCloseModal}
                  className="bg-gray-300 text-gray-800 px-4 py-2 rounded-lg mr-2 hover:bg-gray-400 transition-colors"
                >
                  {t("admin.cancel")}
                </button>
                <button
                  type="submit"
                  className="bg-cinema-red-dark text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors"
                >
                  {t("admin.save")}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default ShowtimesManagement;
