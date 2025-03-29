import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';
import api from '../../services/api';

const ShowtimesManagement = () => {
  const [showtimes, setShowtimes] = useState([]);
  const [movies, setMovies] = useState([]);
  const [halls, setHalls] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [currentShowtime, setCurrentShowtime] = useState(null);
  const [formData, setFormData] = useState({
    movie_id: '',
    hall_id: '',
    start_time: '',
    end_time: '',
    price: ''
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [showtimesResponse, moviesResponse, hallsResponse] = await Promise.all([
        api.get('/showtimes/'),
        api.get('/movies/'),
        api.get('/halls/')
      ]);
      
      setShowtimes(showtimesResponse.data);
      setMovies(moviesResponse.data);
      setHalls(hallsResponse.data);
      setError(null);
    } catch (err) {
      setError('Failed to fetch data');
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

    // When movie or start time changes, recalculate end time
    if ((name === 'movie_id' || name === 'start_time')) {
      const selectedMovieId = name === 'movie_id' ? value : formData.movie_id;
      const selectedStartTime = name === 'start_time' ? value : formData.start_time;
      
      // Only calculate if we have both values
      if (selectedMovieId && selectedStartTime) {
        const endTimeValue = calculateEndTime(selectedMovieId, selectedStartTime);
        setFormData(prev => ({
          ...prev,
          end_time: endTimeValue
        }));
      }
    }
  };

  // Calculate end time based on movie duration and start time
  const calculateEndTime = (movieId, startTime) => {
    // Find the selected movie
    const movie = movies.find(m => m.id.toString() === movieId.toString());
    if (!movie || !startTime) return '';
    
    // Parse the start time
    const start = new Date(startTime);
    if (isNaN(start.getTime())) return '';
    
    // Add movie duration (minutes) to start time
    const end = new Date(start.getTime() + (movie.duration * 60000)); // convert minutes to milliseconds
    
    // Format as YYYY-MM-DDTHH:MM for datetime-local input
    return end.toISOString().slice(0, 16);
  };

  const handleAddShowtime = async (e) => {
    e.preventDefault();
    
    // Validation
    if (!formData.movie_id || !formData.hall_id || !formData.start_time || 
        !formData.end_time || !formData.price) {
      console.error("Validation failed:", formData);
      alert('All fields are required');
      return;
    }

    try {
      await api.post('/showtimes/', {
        ...formData,
        movie_id: parseInt(formData.movie_id),
        hall_id: parseInt(formData.hall_id),
        price: parseFloat(formData.price)
      });
      
      fetchData();
      setIsAddModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to add showtime');
    }
  };

  const handleEditShowtime = async (e) => {
    e.preventDefault();
    
    try {
      await api.put(`/showtimes/${currentShowtime.id}`, {
        ...formData,
        movie_id: parseInt(formData.movie_id),
        hall_id: parseInt(formData.hall_id),
        price: parseFloat(formData.price)
      });
      
      fetchData();
      setIsEditModalOpen(false);
      resetForm();
    } catch (err) {
      alert('Failed to update showtime');
    }
  };

  const handleDeleteShowtime = async (showtimeId) => {
    if (window.confirm('Are you sure you want to delete this showtime?')) {
      try {
        await api.delete(`/showtimes/${showtimeId}`);
        fetchData();
      } catch (err) {
        alert('Failed to delete showtime');
      }
    }
  };

  const openEditModal = (showtime) => {
    setCurrentShowtime(showtime);
    setFormData({
      movie_id: showtime.movie_id.toString(),
      hall_id: showtime.hall_id.toString(),
      start_time: new Date(showtime.start_time).toISOString().slice(0, 16),
      end_time: new Date(showtime.end_time).toISOString().slice(0, 16),
      price: showtime.price.toString()
    });
    setIsEditModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      movie_id: '',
      hall_id: '',
      start_time: '',
      end_time: '',
      price: ''
    });
    setCurrentShowtime(null);
  };

  if (loading && showtimes.length === 0) {
    return <div className="text-center py-10">Loading...</div>;
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Showtimes Management</h1>
        <button
          onClick={() => setIsAddModalOpen(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Add New Showtime
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Movie
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Hall
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Price
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {showtimes.map((showtime) => {
              const movie = movies.find(m => m.id === showtime.movie_id);
              const hall = halls.find(h => h.id === showtime.hall_id);
              
              return (
                <tr key={showtime.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {movie && (
                        <>
                          <div className="h-10 w-10 flex-shrink-0">
                            <img className="h-10 w-10 rounded object-cover" src={movie.poster_url} alt="" />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{movie.title}</div>
                          </div>
                        </>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{hall?.name || 'Unknown'}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {format(new Date(showtime.start_time), 'MMM dd, yyyy')}
                    </div>
                    <div className="text-sm text-gray-500">
                      {format(new Date(showtime.start_time), 'h:mm a')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${showtime.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button 
                      onClick={() => openEditModal(showtime)}
                      className="text-indigo-600 hover:text-indigo-900 mr-4"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteShowtime(showtime.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Add Showtime Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Add New Showtime</h2>
            <form onSubmit={handleAddShowtime}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Movie</label>
                <select
                  name="movie_id"
                  value={formData.movie_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a movie</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Hall</label>
                <select
                  name="hall_id"
                  value={formData.hall_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a hall</option>
                  {halls.map(hall => (
                    <option key={hall.id} value={hall.id}>
                      {hall.name} (Capacity: {hall.capacity})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">End Time</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={formData.end_time}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  required
                  readOnly
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.end_time ? 'Auto-calculated based on movie duration' : 'Select movie and start time first'}
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Ticket Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
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
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Add Showtime
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Showtime Modal */}
      {isEditModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-xl font-bold mb-4">Edit Showtime</h2>
            <form onSubmit={handleEditShowtime}>
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Movie</label>
                <select
                  name="movie_id"
                  value={formData.movie_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a movie</option>
                  {movies.map(movie => (
                    <option key={movie.id} value={movie.id}>
                      {movie.title}
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Hall</label>
                <select
                  name="hall_id"
                  value={formData.hall_id}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                >
                  <option value="">Select a hall</option>
                  {halls.map(hall => (
                    <option key={hall.id} value={hall.id}>
                      {hall.name} (Capacity: {hall.capacity})
                    </option>
                  ))}
                </select>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">Start Time</label>
                <input
                  type="datetime-local"
                  name="start_time"
                  value={formData.start_time}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
                  required
                />
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 mb-2">End Time</label>
                <input
                  type="datetime-local"
                  name="end_time"
                  value={formData.end_time}
                  className="w-full px-3 py-2 border border-gray-300 rounded bg-gray-100"
                  required
                  readOnly
                />
                <p className="text-sm text-gray-500 mt-1">
                  {formData.end_time ? 'Auto-calculated based on movie duration' : 'Select movie and start time first'}
                </p>
              </div>
              
              <div className="mb-6">
                <label className="block text-gray-700 mb-2">Ticket Price ($)</label>
                <input
                  type="number"
                  step="0.01"
                  min="0"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded"
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
                  className="px-4 py-2 text-gray-600 hover:text-gray-800"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                >
                  Update Showtime
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
