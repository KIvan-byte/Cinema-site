import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

const MovieDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Fetching movie details for ID:', id);
        
        // Fetch movie details
        const movieResponse = await api.get(`/movies/${id}`);
        console.log('Movie data received:', movieResponse.data);
        setMovie(movieResponse.data);
        
        // Fetch showtimes for this movie
        const showtimesResponse = await api.get(`/showtimes/?movie_id=${id}`);
        console.log('Showtimes received:', showtimesResponse.data);
        setShowtimes(showtimesResponse.data);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(`Failed to fetch movie details: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleSelectShowtime = (showtimeId) => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/seats/${showtimeId}`);
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error || !movie) {
    return <div className="text-center py-10 text-red-600">{error || 'Movie not found'}</div>;
  }

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="md:w-1/3">
        <div className="bg-white rounded-lg overflow-hidden shadow-lg">
          <img 
            src={movie.poster_url} 
            alt={movie.title}
            className="w-full h-auto"
          />
        </div>
      </div>
      
      <div className="md:w-2/3">
        <h1 className="text-3xl font-bold mb-2">{movie.title}</h1>
        <p className="text-gray-700 mb-4">
          {movie.duration} minutes | Released: {movie.release_date}
        </p>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold mb-2">Description</h2>
          <p className="text-gray-700">{movie.description}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">Showtimes</h2>
          
          {showtimes.length === 0 ? (
            <p className="text-gray-600">No showtimes available for this movie.</p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {showtimes.map((showtime) => (
                <div 
                  key={showtime.id}
                  className="bg-white rounded-lg p-4 shadow border border-gray-200"
                >
                  <p className="font-semibold mb-1">
                    {format(new Date(showtime.start_time), 'MMM dd, yyyy')}
                  </p>
                  <p className="text-gray-600 mb-2">
                    {format(new Date(showtime.start_time), 'h:mm a')}
                  </p>
                  <p className="mb-3">Price: ${showtime.price}</p>
                  <button
                    onClick={() => handleSelectShowtime(showtime.id)}
                    className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full"
                  >
                    Select Seats
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
