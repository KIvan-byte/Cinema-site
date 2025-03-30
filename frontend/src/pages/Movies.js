import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';
import LoadingSpinner from '../components/LoadingSpinner';

const Movies = () => {
  const { t } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    genre: 'all',
    sortBy: 'latest',
    showingOnly: false
  });
  
  // Sample genres - ideally these would come from your API
  const genres = [
    { id: 'all', name: t("movies.genres.all") || 'All Genres' },
    { id: 'action', name: t("movies.genres.action") || 'Action' },
    { id: 'comedy', name: t("movies.genres.comedy") || 'Comedy' },
    { id: 'drama', name: t("movies.genres.drama") || 'Drama' },
    { id: 'horror', name: t("movies.genres.horror") || 'Horror' },
    { id: 'sci-fi', name: t("movies.genres.sci-fi") || 'Sci-Fi' },
    { id: 'animation', name: t("movies.genres.animation") || 'Animation' },
  ];
  
  // Fetch movies from API
  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        
        // You might need to update the API endpoint according to your backend structure
        // For example: `/movies/?genre=${filters.genre}&sort=${filters.sortBy}`
        const response = await api.get('/movies/');
        setMovies(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(`${t("movies.error.message")}: ${err.message}`);
        setLoading(false);
      }
    };

    fetchMovies();
  }, [filters, t]); // Re-fetch when filters change
  
  // Filter and sort movies based on user selections
  const filteredMovies = movies.filter(movie => {
    // Search filter
    const matchesSearch = searchQuery === '' || 
                          movie.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          (movie.description && movie.description.toLowerCase().includes(searchQuery.toLowerCase()));
    
    // Genre filter
    const matchesGenre = filters.genre === 'all' || 
                         (movie.genres && movie.genres.includes(filters.genre));
    
    // Now showing filter
    const matchesShowing = !filters.showingOnly || movie.now_showing;
    
    return matchesSearch && matchesGenre && matchesShowing;
  }).sort((a, b) => {
    // Sort movies based on selected sort option
    switch(filters.sortBy) {
      case 'a-z':
        return a.title.localeCompare(b.title);
      case 'z-a':
        return b.title.localeCompare(a.title);
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'latest':
      default:
        return new Date(b.release_date) - new Date(a.release_date);
    }
  });
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };
  
  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };
  
  const handleShowingToggle = () => {
    setFilters(prev => ({
      ...prev,
      showingOnly: !prev.showingOnly
    }));
  };
  
  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <LoadingSpinner size="large" color="cinema-red" />
      </div>
    );
  }
  
  // Error state
  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark p-6 rounded-lg inline-block max-w-lg">
          <h3 className="text-xl font-bold mb-2">{t("movies.error.title")}</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-cinema-red hover:bg-cinema-red-dark text-white py-2 px-4 rounded transition-colors duration-300"
          >
            {t("movies.error.tryAgain")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="movies-page">
      {/* Enhanced Hero Banner - Full Width with cinema-inspired design */}
      <div className="bg-cinema-black text-white relative overflow-hidden">
        {/* Film reel top decoration */}
        <div className="absolute top-0 left-0 w-full h-10 bg-black bg-opacity-30 flex space-x-4 px-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-full w-6 bg-white bg-opacity-10"></div>
          ))}
        </div>
        
        {/* Background with parallax effect */}
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80" 
            alt="Cinema background" 
            className="w-full h-full object-cover transform scale-110 origin-center"
            style={{ opacity: 0.15 }}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-cinema-black via-cinema-black/90 to-cinema-red-dark/90"></div>
        </div>
      
        <div className="container mx-auto px-4 py-20 md:py-32 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Decorative film icon */}
            <div className="inline-flex mb-6 p-3 bg-cinema-red-dark/30 backdrop-blur-sm rounded-full">
              <svg className="w-8 h-8 text-cinema-red-light" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
              </svg>
            </div>
            
            {/* Main heading with enhanced typography */}
            <h1 className="text-5xl md:text-7xl font-extrabold mb-4 tracking-tight">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-cinema-red-light">
                {t("movies.hero.title")}
              </span>
            </h1>
            
            {/* Stylized subtitle */}
            <p className="text-xl md:text-2xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {t("movies.hero.description")}
            </p>
            
            {/* Call-to-action button */}
            <div className="mt-8">
              <a 
                href="#movies-grid" 
                className="inline-flex items-center px-6 py-3 rounded-lg bg-cinema-red hover:bg-cinema-red-dark transition-all shadow-lg hover:shadow-cinema-red/30 text-white font-semibold text-lg"
              >
                {t("movies.exploreCollection") || "Przeglądaj kolekcję"}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </div>
        
        {/* Film reel bottom decoration */}
        <div className="absolute bottom-0 left-0 w-full h-10 bg-black bg-opacity-30 flex space-x-4 px-4">
          {[...Array(20)].map((_, i) => (
            <div key={i} className="h-full w-6 bg-white bg-opacity-10"></div>
          ))}
        </div>
        
        {/* Diagonal split design element */}
        <div className="absolute bottom-0 left-0 w-full h-24 z-10">
          <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 100V0L100 100H0Z" fill="white" className="dark:fill-dark-bg-secondary" />
          </svg>
        </div>
      </div>
      
      {/* Add ID for scroll target */}
      <div id="movies-grid" className="container mx-auto px-6 md:px-8 mb-16 pt-4">
        {/* Search and Filters Section with enhanced styling */}
        <div className="bg-white dark:bg-dark-bg-secondary p-8 rounded-2xl shadow-xl dark:shadow-gray-900 mb-10 transition-colors duration-300">
          <div className="flex flex-col md:flex-row gap-4 mb-6">
            {/* Search Input */}
            <div className="md:flex-1">
              <div className="relative">
                <input
                  type="text"
                  placeholder={t("movies.search") || "Search for movies..."}
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="w-full py-3 px-12 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red focus:border-transparent"
                />
                <svg 
                  className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" 
                  xmlns="http://www.w3.org/2000/svg" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            {/* Genre Filter */}
            <div className="md:w-1/4">
              <select 
                value={filters.genre}
                onChange={(e) => handleFilterChange('genre', e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red focus:border-transparent appearance-none bg-white"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"%23666\"><path fill-rule=\"evenodd\" d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\" clip-rule=\"evenodd\" /></svg>')", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "3rem" }}
              >
                {genres.map((genre) => (
                  <option key={genre.id} value={genre.id}>{genre.name}</option>
                ))}
              </select>
            </div>
            
            {/* Sort Filter */}
            <div className="md:w-1/4">
              <select 
                value={filters.sortBy}
                onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-cinema-red focus:border-transparent appearance-none bg-white"
                style={{ backgroundImage: "url('data:image/svg+xml;charset=US-ASCII,<svg xmlns=\"http://www.w3.org/2000/svg\" viewBox=\"0 0 20 20\" fill=\"%23666\"><path fill-rule=\"evenodd\" d=\"M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z\" clip-rule=\"evenodd\" /></svg>')", backgroundPosition: "right 1rem center", backgroundRepeat: "no-repeat", backgroundSize: "1.5em 1.5em", paddingRight: "3rem" }}
              >
                <option value="latest">{t("movies.sort.latest")}</option>
                <option value="a-z">{t("movies.sort.a-z")}</option>
                <option value="z-a">{t("movies.sort.z-a")}</option>
                <option value="rating">{t("movies.sort.rating")}</option>
              </select>
            </div>
          </div>
          
          {/* Now Showing Toggle with dark mode */}
          <div className="flex items-center">
            <label className="inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer" 
                checked={filters.showingOnly}
                onChange={handleShowingToggle}
              />
              <div className="relative w-11 h-6 bg-gray-200 dark:bg-gray-700 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-cinema-red-light dark:peer-focus:ring-cinema-red-dark rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-cinema-red"></div>
              <span className="ml-3 text-sm font-medium text-gray-700 dark:text-gray-300">{t("movies.showingOnly")}</span>
            </label>
          </div>
        </div>
        
        {/* Results Count */}
        <div className="mb-8">
          <p className="text-lg text-gray-600 dark:text-gray-400">
            {filteredMovies.length} {filteredMovies.length === 1 ? t("movies.result.single") : t("movies.result.multiple")}
          </p>
        </div>
        
        {/* Movies Grid with enhanced animations and hover effects */}
        {filteredMovies.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-8">
            {filteredMovies.map((movie, index) => (
              <Link 
                to={`/movie/${movie.id}`} 
                key={movie.id} 
                className="block group movie-card" 
                style={{ '--animation-order': index }}
              >
                <div className="bg-white dark:bg-dark-bg-secondary rounded-2xl overflow-hidden shadow-xl dark:shadow-gray-900 transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-2 h-full flex flex-col">
                  <div className="relative h-96 sm:h-80 overflow-hidden movie-poster-hover">
                    <img 
                      src={movie.poster_url} 
                      alt={movie.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        // Use a specific movie poster placeholder
                        e.target.src = 'https://images.unsplash.com/photo-1594909122845-11baa439b7bf?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80';
                      }}
                    />
                    {movie.now_showing && (
                      <div className="absolute top-4 left-0 bg-cinema-red text-white py-1 px-4 rounded-r-full text-sm font-bold shadow-lg">
                        {t("movies.nowShowing")}
                      </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                      <div className="flex items-center text-white">
                        {movie.rating && (
                          <>
                            <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1">{movie.rating}</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-1 text-cinema-black dark:text-white group-hover:text-cinema-red dark:group-hover:text-cinema-red transition-colors duration-200">
                      {movie.title}
                    </h3>
                    <p className="text-cinema-gray dark:text-gray-400 text-sm mb-2 flex items-center flex-wrap">
                      <span className="mr-2">{movie.duration} min</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cinema-gray dark:bg-gray-500 inline-block mx-1"></span>
                      <span>{movie.release_date}</span>
                    </p>
                    <p className="text-cinema-black dark:text-gray-300 line-clamp-3 text-sm flex-grow">
                      {movie.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-block bg-cinema-red-light text-cinema-red-dark px-3 py-1 text-sm font-medium rounded-full">
                        {t("movies.bookNow")}
                      </span>
                      {movie.genres && movie.genres.length > 0 && (
                        <span className="text-xs text-cinema-gray dark:text-gray-400">
                          {movie.genres[0]}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white dark:bg-dark-bg-secondary p-16 text-center rounded-2xl shadow-xl dark:shadow-gray-900">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-bold text-gray-700 dark:text-gray-300 mb-1">{t("movies.noResults.title")}</h3>
            <p className="text-gray-500 dark:text-gray-400">{t("movies.noResults.description")}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Movies;
