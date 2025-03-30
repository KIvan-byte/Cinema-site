import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../services/api';

const HomePage = () => {
  const { t } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        setLoading(true);
        const response = await api.get('/movies');
        console.log('Movies API response:', response.data);
        
        // First try to get movies that are now showing
        let nowShowingMovies = response.data
          .filter(movie => movie.now_showing)
          .slice(0, 5);
        
        // If no "now showing" movies found, just display the latest 5 movies
        if (nowShowingMovies.length === 0) {
          console.log('No movies marked as "now_showing", displaying latest movies instead');
          nowShowingMovies = response.data
            .sort((a, b) => new Date(b.release_date) - new Date(a.release_date))
            .slice(0, 5);
        }
        
        setMovies(nowShowingMovies);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(t('home.error.titleCollection') || 'Unable to load movies');
        setLoading(false);
      }
    };

    fetchMovies();

    // Auto slideshow for hero section
    const slideInterval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % (movies.length || 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [t]);

  const nextSlide = () => {
    setCurrentSlide((currentSlide + 1) % movies.length);
  };

  const prevSlide = () => {
    setCurrentSlide((currentSlide - 1 + movies.length) % movies.length);
  };

  return (
    <div className="min-h-screen">
      {/* Enhanced Hero Section with Dynamic Background */}
      <section className="relative h-[80vh] overflow-hidden">
        {loading ? (
          <div className="absolute inset-0 bg-cinema-black flex items-center justify-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-cinema-red"></div>
          </div>
        ) : error ? (
          <div className="absolute inset-0 bg-cinema-black flex items-center justify-center text-white text-center px-4">
            <div>
              <p className="text-xl font-bold mb-4">{error}</p>
              <button 
                onClick={() => window.location.reload()} 
                className="bg-cinema-red hover:bg-cinema-red-dark text-white py-2 px-6 rounded-full transition-colors"
              >
                {t('home.error.tryAgainBtn') || 'Try Again'}
              </button>
            </div>
          </div>
        ) : (
          <>
            {/* Dynamic background with featured movie */}
            {movies.length > 0 && movies.map((movie, index) => (
              <div 
                key={movie.id}
                className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                  index === currentSlide ? 'opacity-100' : 'opacity-0'
                }`}
              >
                <div className="absolute inset-0 bg-black bg-opacity-60 z-10"></div>
                <img 
                  src={movie.poster_url} 
                  alt={movie.title}
                  className="w-full h-full object-cover object-center scale-110 transform transition-transform duration-10000 ease-in-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-70 z-20"></div>
              </div>
            ))}
            
            {/* Hero Content */}
            <div className="container mx-auto px-4 h-full relative z-30 flex flex-col justify-center items-start">
              <div className="max-w-2xl">
                <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 drop-shadow-lg animate-fade-in-up">
                  {t("home.hero.welcome")}
                </h1>
                <p className="text-xl md:text-2xl text-white mb-8 drop-shadow-md animate-fade-in-up animation-delay-200">
                  {t("home.hero.subtitle")}
                </p>
                <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-400">
                  <Link 
                    to="/movies" 
                    className="bg-cinema-red hover:bg-cinema-red-dark text-white px-8 py-4 rounded-full font-bold transition-all duration-300 hover:shadow-lg transform hover:-translate-y-1"
                  >
                    {t("home.hero.browseBtn")}
                  </Link>
                </div>
              </div>
              
              {/* Featured Movie Info (if movies available) */}
              {movies.length > 0 && (
                <div className="absolute bottom-8 left-4 right-4 md:left-8 md:right-auto bg-black bg-opacity-75 backdrop-blur-sm p-4 rounded-xl animate-fade-in-up animation-delay-600 max-w-lg">
                  <h3 className="text-white font-bold text-2xl mb-2">
                    {movies[currentSlide].title}
                  </h3>
                  <p className="text-gray-300 line-clamp-2 mb-4">
                    {movies[currentSlide].description}
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <span className="bg-cinema-red px-3 py-1 rounded-full text-white text-sm mr-3">
                        {movies[currentSlide].duration} min
                      </span>
                      {movies[currentSlide].rating && (
                        <div className="flex items-center">
                          <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-white">{movies[currentSlide].rating}</span>
                        </div>
                      )}
                    </div>
                    <Link 
                      to={`/movie/${movies[currentSlide].id}`}
                      className="text-cinema-red hover:text-white hover:bg-cinema-red px-4 py-2 rounded-lg transition-colors font-medium"
                    >
                      {t("home.nowShowing.bookNowBtn")}
                    </Link>
                  </div>
                </div>
              )}
              
              {/* Carousel Navigation */}
              {movies.length > 1 && (
                <div className="absolute bottom-6 right-6 flex space-x-2">
                  <button 
                    onClick={prevSlide} 
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
                    aria-label="Previous slide"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button 
                    onClick={nextSlide} 
                    className="bg-black bg-opacity-50 hover:bg-opacity-70 text-white rounded-full p-2 transition-all"
                    aria-label="Next slide"
                  >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </div>
              )}
              
              {/* Slide Indicators */}
              {movies.length > 1 && (
                <div className="absolute bottom-6 left-0 right-0 flex justify-center space-x-2">
                  {movies.map((_, index) => (
                    <button 
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`h-2 rounded-full transition-all ${
                        index === currentSlide ? 'w-8 bg-cinema-red' : 'w-2 bg-white bg-opacity-50'
                      }`}
                      aria-label={`Go to slide ${index + 1}`}
                    />
                  ))}
                </div>
              )}
            </div>
          </>
        )}
      </section>

      {/* Now Showing Section with Modern Card Design */}
      <section className="py-16 bg-gradient-to-b from-gray-900 to-black">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-white">
              <span className="inline-block border-b-4 border-cinema-red pb-2">
                {t("home.nowShowing.title")}
              </span>
            </h2>
            <Link 
              to="/movies" 
              className="flex items-center text-cinema-red hover:text-white px-4 py-2 rounded-lg hover:bg-cinema-red transition-colors font-medium"
            >
              {t("home.nowShowing.viewAllBtn")}
              <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-cinema-red"></div>
            </div>
          ) : error ? (
            <div className="bg-red-900 bg-opacity-20 border border-red-900 text-red-200 rounded-lg p-4 text-center">
              {error}
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
              {movies.map((movie, index) => (
                <Link 
                  to={`/movie/${movie.id}`} 
                  key={movie.id}
                  className="movie-card group relative overflow-hidden rounded-xl bg-gray-800 transform transition-all duration-300 hover:scale-105 hover:shadow-xl shadow-md"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <div className="aspect-[2/3] overflow-hidden">
                    <img 
                      src={movie.poster_url} 
                      alt={movie.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Poster';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                      <h3 className="text-xl font-bold text-white mb-1">{movie.title}</h3>
                      <div className="flex items-center mb-2">
                        <span className="text-sm text-gray-300 mr-3">{movie.duration} {t("home.nowShowing.mins")}</span>
                        {movie.rating && (
                          <div className="flex items-center">
                            <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-white">{movie.rating}</span>
                          </div>
                        )}
                      </div>
                      <p className="text-sm text-gray-300 line-clamp-3">{movie.description}</p>
                      <div className="mt-4 text-center">
                        <span className="bg-cinema-red text-white py-2 px-6 rounded-lg inline-block w-full">
                          {t("home.nowShowing.bookNowBtn")}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="absolute top-2 right-2 bg-cinema-red text-white text-xs font-bold px-2 py-1 rounded-full">
                    NEW
                  </div>
                </Link>
              ))}
              
              {movies.length === 0 && !error && !loading && (
                <div className="col-span-full text-center py-10 text-gray-400">
                  {t("home.nowShowing.noMovies") || "No movies are currently showing."}
                  <p className="mt-3 text-sm text-gray-500">Please check back later for updates to our movie schedule.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      {/* About Section with Overlapping Images */}
      <section className="py-20 bg-black relative overflow-hidden">
        <div className="absolute opacity-5 -right-40 -top-40 w-[600px] h-[600px] rounded-full bg-cinema-red blur-3xl"></div>
        <div className="absolute opacity-5 -left-40 -bottom-40 w-[600px] h-[600px] rounded-full bg-cinema-red blur-3xl"></div>
        
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2 relative">
              <div className="grid grid-cols-2 gap-4">
                <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Cinema Experience" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl translate-y-8">
                  <img 
                    src="https://images.unsplash.com/photo-1478720568477-152d9b164e26?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Movie Theater" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl -translate-y-8">
                  <img 
                    src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Cinema Seating" 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="aspect-square overflow-hidden rounded-2xl shadow-2xl">
                  <img 
                    src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80" 
                    alt="Concessions" 
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              {/* Floating element */}
              <div className="hidden lg:block absolute -bottom-10 -right-10 bg-cinema-red text-white p-6 rounded-full shadow-xl transform rotate-12">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm3 2h6v4H7V5zm8 8v2h1v-2h-1zm-2-2H7v4h6v-4zm2 0h1V9h-1v2zm1-4V5h-1v2h1zM5 5v2H4V5h1zm0 4H4v2h1V9zm-1 4h1v2H4v-2z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
            
            <div className="md:w-1/2 text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">
                {t("home.about.title")}
              </h2>
              <p className="text-gray-300 mb-4">
                {t("home.about.description1")}
              </p>
              <p className="text-gray-300 mb-6">
                {t("home.about.description2")}
              </p>
              <Link 
                to="/about" 
                className="inline-flex items-center bg-transparent border-2 border-cinema-red text-cinema-red hover:bg-cinema-red hover:text-white px-6 py-3 rounded-lg font-bold transition-colors"
              >
                {t("home.about.learnMoreBtn")}
                <svg className="ml-2 w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section with Animated Icons */}
      <section className="py-20 bg-gradient-to-b from-black to-gray-900">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-white text-center mb-12">
            {t("home.features.title")}
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="bg-gray-800 p-8 rounded-2xl text-white transform transition-all hover:-translate-y-2 hover:shadow-xl shadow-md feature-card">
              <div className="bg-cinema-red p-4 rounded-full inline-block mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t("home.features.latest")}</h3>
              <p className="text-gray-400">{t("home.features.latestDesc")}</p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-2xl text-white transform transition-all hover:-translate-y-2 hover:shadow-xl shadow-md feature-card">
              <div className="bg-cinema-red p-4 rounded-full inline-block mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t("home.features.concessions")}</h3>
              <p className="text-gray-400">{t("home.features.concessionsDesc")}</p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-2xl text-white transform transition-all hover:-translate-y-2 hover:shadow-xl shadow-md feature-card">
              <div className="bg-cinema-red p-4 rounded-full inline-block mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t("home.features.seating")}</h3>
              <p className="text-gray-400">{t("home.features.seatingDesc")}</p>
            </div>
            
            <div className="bg-gray-800 p-8 rounded-2xl text-white transform transition-all hover:-translate-y-2 hover:shadow-xl shadow-md feature-card">
              <div className="bg-cinema-red p-4 rounded-full inline-block mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.536a5 5 0 001.414 1.414m2.828-9.9a9 9 0 013.464-3.464" />
                </svg>
              </div>
              <h3 className="text-xl font-bold mb-3">{t("home.features.sound")}</h3>
              <p className="text-gray-400">{t("home.features.soundDesc")}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter Section with Glass Effect */}
      <section className="py-20 bg-cover bg-center bg-fixed relative" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1925&q=80')" }}>
        <div className="absolute inset-0 bg-black bg-opacity-70"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-2xl mx-auto text-center bg-gray-900 bg-opacity-50 backdrop-blur-md p-8 rounded-xl border border-white border-opacity-10">
            <h2 className="text-3xl font-bold text-white mb-4">
              {t("home.newsletter.title")}
            </h2>
            <p className="text-gray-300 mb-6">
              {t("home.newsletter.description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder={t("home.newsletter.placeholder")}
                className="flex-grow px-4 py-3 rounded-lg bg-black bg-opacity-50 border border-gray-500 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-cinema-red"
              />
              <button className="bg-cinema-red hover:bg-cinema-red-dark text-white px-6 py-3 rounded-lg font-bold transition-colors whitespace-nowrap">
                {t("home.newsletter.subscribeBtn")}
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
