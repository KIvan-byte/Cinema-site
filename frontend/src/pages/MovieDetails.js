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
  const [selectedDate, setSelectedDate] = useState(null);

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

  const handleSelectShowtime = (showtimeId) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/movie/${id}` } });
    } else {
      navigate(`/seats/${showtimeId}`);
    }
  };

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

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
      </div>
    );
  }

  if (error || !movie) {
    return (
      <div className="text-center py-10 px-4">
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark p-4 rounded-lg inline-block">
          {error || 'Movie not found'}
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
        <div className="md:flex">
          {/* Movie Poster */}
          <div className="md:w-1/3 bg-cinema-black">
            <div className="h-96 md:h-full">
              <img 
                src={movie.poster_url} 
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Movie Details */}
          <div className="md:w-2/3 p-6">
            <h1 className="text-3xl font-bold mb-2 text-cinema-black">{movie.title}</h1>
            <div className="flex flex-wrap items-center text-sm text-cinema-gray mb-4">
              <span className="mr-4">{movie.duration} minutes</span>
              <span className="mr-4">Released: {movie.release_date}</span>
            </div>
            
            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2 text-cinema-black">Description</h2>
              <p className="text-cinema-black">{movie.description}</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Showtimes Section */}
      <div className="bg-white rounded-xl shadow-lg p-6">
        <h2 className="text-2xl font-semibold mb-6 text-cinema-black">Showtimes</h2>
        
        {showtimes.length === 0 ? (
          <p className="text-cinema-gray">No showtimes available for this movie.</p>
        ) : (
          <>
            {/* Date Selection */}
            <div className="mb-6 overflow-x-auto">
              <div className="flex space-x-2 min-w-max">
                {availableDates.map(date => (
                  <button
                    key={date}
                    onClick={() => setSelectedDate(date)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                      selectedDate === date
                        ? 'bg-cinema-red-dark text-white'
                        : 'bg-cinema-gray-light text-cinema-black hover:bg-cinema-red-light'
                    }`}
                  >
                    {format(new Date(date), 'EEE, MMM d')}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Showtime Cards */}
            {selectedDate && (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {groupedShowtimes[selectedDate]
                  .sort((a, b) => new Date(a.start_time) - new Date(b.start_time))
                  .map((showtime) => (
                  <div 
                    key={showtime.id}
                    className="bg-cinema-gray-light rounded-lg p-5 border border-cinema-gray-light transition-all hover:shadow-md"
                  >
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        <p className="font-semibold text-cinema-black">
                          {format(new Date(showtime.start_time), 'h:mm a')}
                        </p>
                        <p className="text-sm text-cinema-gray">
                          Hall: {showtime.hall?.name || 'Unknown'}
                        </p>
                      </div>
                      <div className="bg-white px-3 py-1 rounded-full text-cinema-red-dark font-medium">
                        ${showtime.price}
                      </div>
                    </div>
                    <button
                      onClick={() => handleSelectShowtime(showtime.id)}
                      className="w-full bg-cinema-red-dark text-white py-2 px-4 rounded-lg hover:bg-cinema-red transition-colors font-medium"
                    >
                      Select Seats
                    </button>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default MovieDetails;
