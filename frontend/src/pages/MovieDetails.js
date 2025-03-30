import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

const MovieDetails = () => {
  console.log("MovieDetails component rendering - NEW VERSION"); // Debug log
  
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { t } = useLanguage();
  const [movie, setMovie] = useState(null);
  const [showtimes, setShowtimes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    console.log("MovieDetails useEffect running, id:", id); // Debug log
    
    const fetchData = async () => {
      try {
        // Fetch movie details
        const movieResponse = await api.get(`/movies/${id}`);
        console.log("Fetched movie data:", movieResponse.data); // Debug log
        setMovie(movieResponse.data);
        
        // Fetch showtimes for this movie
        const showtimesResponse = await api.get(`/showtimes/?movie_id=${id}`);
        console.log("Fetched showtimes:", showtimesResponse.data); // Debug log
        setShowtimes(showtimesResponse.data);
        
        // Set the first date as selected if showtimes exist
        if (showtimesResponse.data.length > 0) {
          const dates = [...new Set(showtimesResponse.data.map(st => 
            format(new Date(st.start_time), 'yyyy-MM-dd')
          ))].sort();
          setSelectedDate(dates[0]);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movie details:', err);
        setError(`Failed to fetch movie details: ${err.message}`);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  // Group showtimes by date
  const groupShowtimesByDate = () => {
    const groupedShowtimes = {};
    showtimes.forEach(showtime => {
      const date = format(new Date(showtime.start_time), 'yyyy-MM-dd');
      if (!groupedShowtimes[date]) {
        groupedShowtimes[date] = [];
      }
      groupedShowtimes[date].push(showtime);
    });
    return groupedShowtimes;
  };

  const groupedShowtimes = groupShowtimesByDate();
  const availableDates = Object.keys(groupedShowtimes).sort();

  const handleSelectShowtime = (showtimeId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/movie/${id}` } });
    } else {
      navigate(`/seats/${showtimeId}`);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center py-28">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cinema-red"></div>
        <p className="ml-3 text-xl text-cinema-red-dark">Loading movie details...</p>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-20 px-4">
        <div className="bg-red-100 border-2 border-red-400 text-red-700 p-4 rounded-lg inline-block max-w-lg shadow-md">
          <h2 className="text-xl font-bold mb-2">Error</h2>
          <p>{error || t("movie.notFound")}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-100 dark:bg-gray-900 min-h-screen">
      {/* Completely New Header - Movie Showcase */}
      <div 
        className="relative w-full h-[70vh] bg-cover bg-center flex items-center"
        style={{ 
          backgroundImage: `linear-gradient(to bottom, rgba(0,0,0,0.1), rgba(0,0,0,0.9)), url(${movie.backdrop_url || movie.poster_url})`,
        }}
      >
        <div className="container mx-auto px-4 md:px-12 z-10">
          <div className="flex flex-col md:flex-row items-center">
            {/* Movie Poster */}
            <div className="w-64 md:w-80 mb-8 md:mb-0 md:mr-12 rounded-lg overflow-hidden shadow-2xl dark:shadow-blue-900/20 transform transition-transform hover:scale-105">
              <img 
                src={movie.poster_url} 
                alt={movie.title}
                className="w-full h-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                }}
              />
            </div>
            
            {/* Movie Info */}
            <div className="text-white max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold mb-3 text-center md:text-left">{movie.title}</h1>
              
              {/* Movie basic info tags */}
              <div className="flex flex-wrap justify-center md:justify-start gap-3 mb-6">
                <span className="px-3 py-1 bg-cinema-red rounded-full text-sm font-medium">
                  {movie.duration} min
                </span>
                <span className="px-3 py-1 bg-gray-800 bg-opacity-70 rounded-full text-sm">
                  {movie.release_date}
                </span>
                {movie.rating && (
                  <span className="px-3 py-1 bg-yellow-600 rounded-full text-sm font-medium flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    {movie.rating}
                  </span>
                )}
              </div>
              
              {/* Genres */}
              {movie.genres && movie.genres.length > 0 && (
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                  {movie.genres.map((genre, index) => (
                    <span key={index} className="px-3 py-1 bg-gray-800 bg-opacity-50 text-gray-200 text-sm rounded-md">
                      {genre}
                    </span>
                  ))}
                </div>
              )}
              
              {/* Description */}
              <p className="text-gray-200 text-lg mb-6 text-center md:text-left leading-relaxed">
                {movie.description}
              </p>
              
              {/* CTA for showtimes */}
              <div className="text-center md:text-left">
                <a 
                  href="#showtimes" 
                  className="inline-block px-8 py-3 bg-cinema-red hover:bg-cinema-red-dark text-white font-bold rounded-lg transition-colors shadow-lg dark:shadow-red-900/30"
                >
                  View Showtimes
                  <svg className="w-5 h-5 inline-block ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Showtimes Section */}
      <div id="showtimes" className="container mx-auto px-4 py-12 md:px-12">
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl dark:shadow-blue-900/10 p-8 mb-12">
          <h2 className="text-3xl font-bold mb-8 text-center text-cinema-black dark:text-white">
            <span className="border-b-4 border-cinema-red pb-2">{t("movie.availableShowtimes")}</span>
          </h2>
          
          {showtimes.length === 0 ? (
            <div className="text-center py-12">
              <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
              </svg>
              <p className="mt-4 text-xl text-gray-500 dark:text-gray-400">{t("movie.noShowtimes")}</p>
              <p className="text-gray-400 dark:text-gray-500">Check back soon for upcoming showtimes</p>
            </div>
          ) : (
            <>
              {/* Date selector - NEW STYLE */}
              <div className="mb-10">
                <div className="flex overflow-x-auto py-2 hide-scrollbar">
                  <div className="flex space-x-2 mx-auto">
                    {availableDates.map(date => {
                      const dateObj = new Date(date);
                      const isToday = new Date().toDateString() === dateObj.toDateString();
                      const isSelected = date === selectedDate;
                      
                      return (
                        <button
                          key={date}
                          onClick={() => setSelectedDate(date)}
                          className={`flex flex-col items-center justify-center py-3 px-6 rounded-xl min-w-[120px] transition-all ${
                            isSelected 
                              ? 'bg-cinema-red text-white dark:bg-cinema-red-dark dark:text-white' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600'
                          }`}
                        >
                          <span className={`text-xs uppercase font-bold ${isToday ? 'text-cinema-red dark:text-cinema-red-light' : ''}`}>
                            {t(`common.days.${format(dateObj, 'EEE').toLowerCase()}`)}
                          </span>
                          <span className="text-2xl font-bold my-1">
                            {format(dateObj, 'dd')}
                          </span>
                          <span className="text-xs">
                            {t(`common.months.${format(dateObj, 'MMM').toLowerCase()}`)}
                          </span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
              
              {/* Showtime Cards - NEW GRID LAYOUT */}
              {selectedDate && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {groupedShowtimes[selectedDate]
                    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                    .map((showtime) => (
                    <div 
                      key={showtime.id}
                      className="bg-gray-50 dark:bg-gray-700 rounded-xl overflow-hidden border border-gray-100 dark:border-gray-600 transition-all hover:-translate-y-1 hover:shadow-xl dark:hover:shadow-blue-900/20"
                    >
                      <div className="bg-gradient-to-r from-cinema-red to-cinema-red-dark text-white p-4">
                        <div className="flex justify-between items-center">
                          <p className="font-bold text-xl">
                            {format(new Date(showtime.start_time), 'h:mm a')}
                          </p>
                          <span className="bg-white dark:bg-gray-900 text-cinema-red-dark dark:text-cinema-red-light px-3 py-1 rounded-full font-bold">
                            ${showtime.price}
                          </span>
                        </div>
                      </div>
                      
                      <div className="p-4">
                        <div className="flex justify-between items-center mb-6">
                          <div className="flex items-center">
                            <svg className="w-5 h-5 text-cinema-red dark:text-cinema-red-light mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                            </svg>
                            <p className="font-medium text-cinema-black dark:text-white">
                              {showtime.hall?.name || 'Unknown Hall'}
                            </p>
                          </div>
                          <div className="text-xs text-gray-500 dark:text-gray-400">
                            {format(new Date(showtime.start_time), 'EEEE')}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => handleSelectShowtime(showtime.id)}
                          className="w-full bg-cinema-red text-white py-3 rounded-lg hover:bg-cinema-red-dark transition-colors font-bold flex items-center justify-center"
                        >
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                          </svg>
                          {t("movie.selectSeats")}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default MovieDetails;
