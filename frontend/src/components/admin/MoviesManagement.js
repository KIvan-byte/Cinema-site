import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { useLanguage } from '../../context/LanguageContext';

const MoviesManagement = () => {
  const { t } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingMovie, setEditingMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    release_date: '',
    poster_url: '',
    rating: '',
    genres: ''
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      setLoading(true);
      const response = await api.get('/movies/');
      setMovies(response.data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching movies:', err);
      setError('Failed to load movies');
      setLoading(false);
    }
  };

  const handleOpenModal = (movie = null) => {
    if (movie) {
      setEditingMovie(movie);
      setFormData({
        title: movie.title || '',
        description: movie.description || '',
        duration: movie.duration ? String(movie.duration) : '',
        release_date: movie.release_date || '',
        poster_url: movie.poster_url || '',
        rating: movie.rating ? String(movie.rating) : '',
        genres: movie.genres ? movie.genres.join(', ') : ''
      });
    } else {
      setEditingMovie(null);
      setFormData({
        title: '',
        description: '',
        duration: '',
        release_date: '',
        poster_url: '',
        rating: '',
        genres: ''
      });
    }
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingMovie(null);
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
      const movieData = {
        ...formData,
        duration: parseInt(formData.duration, 10),
        rating: parseFloat(formData.rating),
        genres: formData.genres.split(',').map(g => g.trim()).filter(g => g)
      };

      if (editingMovie) {
        await api.put(`/movies/${editingMovie.id}`, movieData);
      } else {
        await api.post('/movies/', movieData);
      }

      fetchMovies();
      handleCloseModal();
    } catch (err) {
      console.error('Error saving movie:', err);
      setError('Failed to save movie');
    }
  };

  const handleDeleteMovie = async (id) => {
    if (!window.confirm(t("admin.confirmDeleteMovie"))) return;
    
    try {
      await api.delete(`/movies/${id}`);
      fetchMovies();
    } catch (err) {
      console.error('Error deleting movie:', err);
      setError('Failed to delete movie');
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
          {t("admin.movies")}
        </h1>
        <button
          onClick={() => handleOpenModal()}
          className="bg-cinema-red-dark text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors"
        >
          {t("admin.addMovie")}
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
                  {t("admin.duration")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.releaseDate")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.rating")}
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  {t("admin.actions")}
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {movies.map((movie) => (
                <tr key={movie.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {movie.title}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movie.duration} min
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movie.release_date}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {movie.rating}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button
                      onClick={() => handleOpenModal(movie)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      {t("admin.edit")}
                    </button>
                    <button
                      onClick={() => handleDeleteMovie(movie.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      {t("admin.delete")}
                    </button>
                  </td>
                </tr>
              ))}
              {movies.length === 0 && (
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-center text-sm text-gray-500">
                    {t("admin.noMoviesFound")}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Movie Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg w-full max-w-2xl p-6 max-h-screen overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-cinema-black">
                {editingMovie ? t("admin.editMovie") : t("admin.addMovie")}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-700">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path>
                </svg>
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
                  {t("admin.movieTitle")}
                </label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="description">
                  {t("admin.description")}
                </label>
                <textarea
                  name="description"
                  id="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="4"
                  required
                ></textarea>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="duration">
                    {t("admin.duration")} (min)
                  </label>
                  <input
                    type="number"
                    name="duration"
                    id="duration"
                    value={formData.duration}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                    min="1"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="release_date">
                    {t("admin.releaseDate")}
                  </label>
                  <input
                    type="date"
                    name="release_date"
                    id="release_date"
                    value={formData.release_date}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="poster_url">
                    {t("admin.posterUrl")}
                  </label>
                  <input
                    type="url"
                    name="poster_url"
                    id="poster_url"
                    value={formData.poster_url}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="rating">
                    {t("admin.rating")} (0-5)
                  </label>
                  <input
                    type="number"
                    name="rating"
                    id="rating"
                    value={formData.rating}
                    onChange={handleInputChange}
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    step="0.1"
                    min="0"
                    max="5"
                  />
                </div>
              </div>

              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="genres">
                  {t("admin.genres")} (comma separated)
                </label>
                <input
                  type="text"
                  name="genres"
                  id="genres"
                  value={formData.genres}
                  onChange={handleInputChange}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  placeholder="Action, Drama, Comedy"
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

export default MoviesManagement;
