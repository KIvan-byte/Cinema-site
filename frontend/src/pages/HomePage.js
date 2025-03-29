import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

const HomePage = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Fetching movies...');
        const response = await api.get('/movies/');
        console.log('Movies received:', response.data);
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(`Failed to fetch movies: ${err.message}`);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-600">{error}</div>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Now Showing</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <Link to={`/movie/${movie.id}`} key={movie.id}>
            <div className="bg-white rounded-lg overflow-hidden shadow-lg transition-transform transform hover:scale-105">
              <div className="h-64 bg-gray-300 overflow-hidden">
                <img 
                  src={movie.poster_url} 
                  alt={movie.title}
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{movie.title}</h3>
                <p className="text-gray-700 text-sm mb-2">
                  {movie.duration} min | {movie.release_date}
                </p>
                <p className="text-gray-600 line-clamp-3">{movie.description}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
