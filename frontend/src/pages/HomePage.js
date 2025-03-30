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
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 px-4">
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark p-4 rounded-lg inline-block">
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="pb-10">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-cinema-red to-cinema-red-dark text-white py-10 px-4 mb-10 rounded-b-lg shadow-lg">
        <div className="container mx-auto">
          <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center">Welcome to Cinema Tickets</h1>
          <p className="text-lg md:text-xl text-center max-w-2xl mx-auto">
            Discover the latest movies and book your tickets online with just a few clicks
          </p>
        </div>
      </div>
      
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-cinema-black">Now Showing</h2>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {movies.map((movie) => (
            <Link to={`/movie/${movie.id}`} key={movie.id} className="block group">
              <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 h-full flex flex-col">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={movie.poster_url} 
                    alt={movie.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                </div>
                <div className="p-4 flex-grow flex flex-col">
                  <h3 className="font-bold text-lg mb-1 text-cinema-black group-hover:text-cinema-red-dark transition-colors duration-200">
                    {movie.title}
                  </h3>
                  <p className="text-cinema-gray text-sm mb-2 flex items-center">
                    <span className="mr-2">{movie.duration} min</span>
                    <span className="w-1.5 h-1.5 rounded-full bg-cinema-gray inline-block"></span>
                    <span className="ml-2">{movie.release_date}</span>
                  </p>
                  <p className="text-cinema-black line-clamp-3 text-sm flex-grow">
                    {movie.description}
                  </p>
                  <div className="mt-4">
                    <span className="inline-block bg-cinema-red-light text-cinema-red-dark px-3 py-1 text-sm font-medium rounded-full">
                      Book Now
                    </span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
