import React, { useState, useEffect } from 'react';
import api from '../../services/api';

const MoviesManagement = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentMovie, setCurrentMovie] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    duration: '',
    poster_url: '',
    release_date: ''
  });

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    setLoading(true);
    try {
      const response = await api.get('/movies/');
      setMovies(response.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch movies');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleAddMovie = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.description || !formData.duration || 
        !formData.poster_url || !formData.release_date) {
      alert('All fields are required');
      return;
    }

    try {
      await api.post('/movies/', {
        ...formData,
        duration: parseInt(formData.duration)
      });
      
      fetchMovies();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to add movie');
    }
  };

  const handleEditMovie = async (e) => {
    e.preventDefault();
    
    try {
      await api.put(`/movies/${currentMovie.id}`, {
        ...formData,
        duration: parseInt(formData.duration)
      });
      
      fetchMovies();
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to update movie');
    }
  };

  const handleDeleteMovie = async (movieId) => {
    if (window.confirm('Are you sure you want to delete this movie?')) {
      try {
        await api.delete(`/movies/${movieId}`);
        fetchMovies();
      } catch (err) {
        alert('Failed to delete movie');
      }
    }
  };

  const openEditModal = (movie) => {
    setCurrentMovie(movie);
    setFormData({
      title: movie.title,
      description: movie.description,
      duration: movie.duration.toString(),
      poster_url: movie.poster_url,
      release_date: movie.release_date
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      duration: '',
      poster_url: '',
      release_date: ''
    });
    setCurrentMovie(null);
  };

  if (loading && movies.length === 0) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-cinema-black">Movies Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-cinema-red-dark text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors"
        >
          Add New Movie
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark px-4 py-3 rounded-lg mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        <table className="min-w-full divide-y divide-cinema-gray-light">
          <thead className="bg-cinema-gray-light">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cinema-black uppercase tracking-wider">
                Title
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cinema-black uppercase tracking-wider">
                Release Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-cinema-black uppercase tracking-wider">
                Duration
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-cinema-black uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-cinema-gray-light">
            {movies.map((movie) => (
              <tr key={movie.id} className="hover:bg-cinema-gray-light transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 flex-shrink-0">
                      <img className="h-10 w-10 rounded object-cover" src={movie.poster_url} alt="" />
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-cinema-black">{movie.title}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cinema-black">{movie.release_date}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-cinema-black">{movie.duration} min</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button 
                    onClick={() => openEditModal(movie)}
                    className="text-cinema-orange hover:text-cinema-orange-light mr-4"
                  >
                    Edit
                  </button>
                  <button 
                    onClick={() => handleDeleteMovie(movie.id)}
                    className="text-cinema-red-dark hover:text-cinema-red"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Movie Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-cinema-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-cinema-black">Add New Movie</h2>
            <form onSubmit={handleAddMovie}>
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                  min="1"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Poster URL</label>
                <input
                  type="url"
                  name="poster_url"
                  value={formData.poster_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-cinema-black mb-2">Release Date</label>
                <input
                  type="text"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  placeholder="YYYY-MM-DD"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsAddModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-cinema-gray hover:text-cinema-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cinema-red-dark text-white rounded-lg hover:bg-cinema-red transition-colors"
                >
                  Add Movie
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Movie Modal - Similar structure as Add Modal but with updated heading and button text */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-cinema-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6 shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-cinema-black">Edit Movie</h2>
            <form onSubmit={handleEditMovie}>
              {/* Same form fields as Add Modal */}
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Description</label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  rows="3"
                  required
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Duration (minutes)</label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                  min="1"
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-cinema-black mb-2">Poster URL</label>
                <input
                  type="url"
                  name="poster_url"
                  value={formData.poster_url}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  required
                />
              </div>
              
              <div className="mb-6">
                <label className="block text-cinema-black mb-2">Release Date</label>
                <input
                  type="text"
                  name="release_date"
                  value={formData.release_date}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-cinema-gray-light rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red-light"
                  placeholder="YYYY-MM-DD"
                  required
                />
              </div>
              
              <div className="flex justify-end space-x-4">
                <button
                  type="button"
                  onClick={() => {
                    setIsEditModalOpen(false);
                    resetForm();
                  }}
                  className="px-4 py-2 text-cinema-gray hover:text-cinema-black transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-cinema-red-dark text-white rounded-lg hover:bg-cinema-red transition-colors"
                >
                  Update Movie
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
