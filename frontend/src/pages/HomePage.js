import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import { useLanguage } from '../context/LanguageContext';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomePage = () => {
  const { t } = useLanguage();
  const [movies, setMovies] = useState([]);
  const [featuredMovies, setFeaturedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Fetching movies...');
        const response = await api.get('/movies/');
        console.log('Movies received:', response.data);
        
        // All movies
        setMovies(response.data);
        
        // Featured movies (assuming your API returns a 'featured' property or you can filter by rating)
        const featured = response.data
          .filter(movie => movie.rating >= 4.5) // Get highly rated movies as featured
          .slice(0, 3); // Limit to 3 featured movies
        
        setFeaturedMovies(featured);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching movies:', err);
        setError(`Failed to fetch movies: ${err.message}`);
        setLoading(false);
      }
    };

    fetchMovies();
  }, []);

  // Cinema features section data
  const features = [
    {
      icon: "🎬",
      title: t("home.features.latest") || "Latest Releases",
      description: t("home.features.latestDesc") || "Experience the newest blockbusters in stunning quality"
    },
    {
      icon: "🍿",
      title: t("home.features.concessions") || "Premium Concessions",
      description: t("home.features.concessionsDesc") || "Gourmet popcorn, craft beverages, and chef-prepared snacks"
    },
    {
      icon: "🛋️",
      title: t("home.features.seating") || "Luxury Seating",
      description: t("home.features.seatingDesc") || "Reclinable leather seats with extra legroom and personal tables"
    },
    {
      icon: "🔊",
      title: t("home.features.sound") || "Dolby Atmos",
      description: t("home.features.soundDesc") || "Immersive sound technology that places you inside the action"
    }
  ];

  // Loading state UI
  if (loading) {
    return (
      <div className="flex justify-center items-center h-96">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cinema-red"></div>
      </div>
    );
  }

  // Error state UI
  if (error) {
    return (
      <div className="text-center py-16 px-4">
        <div className="bg-red-100 border border-cinema-red text-cinema-red-dark p-6 rounded-lg inline-block max-w-lg">
          <h3 className="text-xl font-bold mb-2">{t("home.error.title")}</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-cinema-red hover:bg-cinema-red-dark text-white py-2 px-4 rounded transition-colors duration-300"
          >
            {t("home.error.tryAgainBtn")}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage">
      {/* Hero Section with Full-Width Slider */}
      <section className="relative w-full">
        {featuredMovies.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-[70vh] min-h-[600px]"
          >
            {featuredMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0 animate-slow-zoom"
                  style={{ backgroundImage: `url(${movie.poster_url || 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1625&q=80'})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-60 z-10" />
                <div className="container mx-auto absolute bottom-0 left-0 right-0 p-10 md:p-20 text-white z-20">
                  <h2 className="text-4xl md:text-7xl font-bold mb-4">{movie.title}</h2>
                  <p className="text-xl mb-8 max-w-3xl">{movie.description}</p>
                  <div className="flex items-center mb-8">
                    {Array(5).fill().map((_, i) => (
                      <svg 
                        key={i} 
                        className={`w-5 h-5 ${i < Math.floor(movie.rating || 0) ? 'text-yellow-400' : 'text-gray-400'}`} 
                        fill="currentColor" 
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                    <span className="ml-2">{movie.rating || 'N/A'}</span>
                  </div>
                  <Link 
                    to={`/movie/${movie.id}`} 
                    className="bg-cinema-red hover:bg-cinema-red-dark text-white font-bold py-4 px-8 rounded-lg transition duration-300 inline-flex items-center"
                  >
                    {t("home.hero.browseBtn")}
                    <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                    </svg>
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-[70vh] min-h-[600px] bg-gradient-to-r from-cinema-red to-cinema-red-dark flex items-center justify-center">
            <div className="text-center text-white p-8">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">{t("home.hero.welcome")}</h1>
              <p className="text-xl md:text-3xl mb-10">{t("home.hero.subtitle")}</p>
              <Link 
                to="/movies" 
                className="bg-white text-cinema-red hover:bg-gray-100 font-bold py-4 px-8 rounded-lg transition duration-300 inline-flex items-center"
              >
                {t("home.hero.browseBtn")}
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* About Cinema Section */}
      <section className="py-20 bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80" 
                  alt="Inside our cinema" 
                  className="rounded-lg shadow-xl"
                />
                <img 
                  src="https://images.unsplash.com/photo-1586899028174-e7098604235b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                  alt="Cinema experience" 
                  className="absolute -bottom-10 -right-10 rounded-lg shadow-xl border-4 border-white hidden md:block w-64"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cinema-black dark:text-white">{t("home.about.title")}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-6 text-lg">
                {t("home.about.description1")}
              </p>
              <p className="text-gray-600 dark:text-gray-300 mb-8 text-lg">
                {t("home.about.description2")}
              </p>
              <Link 
                to="/about" 
                className="bg-cinema-black dark:bg-gray-700 hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center"
              >
                {t("home.about.learnMoreBtn")}
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  className="h-5 w-5 ml-2" 
                  viewBox="0 0 20 20" 
                  fill="currentColor"
                >
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Now Showing Movies */}
      <section className="py-20">
        <div className="container mx-auto px-6 md:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-cinema-black dark:text-white">{t("home.nowShowing.title")}</h2>
            <Link 
              to="/movies" 
              className="text-cinema-red hover:text-cinema-red-dark font-semibold inline-flex items-center"
            >
              {t("home.nowShowing.viewAllBtn")}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-1" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {movies.slice(0, 8).map((movie) => (
              <Link to={`/movie/${movie.id}`} key={movie.id} className="block group">
                <div className="bg-white dark:bg-dark-bg-secondary rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 h-full flex flex-col">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={movie.poster_url} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80';
                      }}
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-1 text-cinema-black dark:text-white group-hover:text-cinema-red transition-colors duration-200">
                      {movie.title}
                    </h3>
                    <p className="text-cinema-gray dark:text-gray-400 text-sm mb-2 flex items-center">
                      <span className="mr-2">{movie.duration} min</span>
                      <span className="w-1.5 h-1.5 rounded-full bg-cinema-gray dark:bg-gray-500 inline-block"></span>
                      <span className="ml-2">{movie.release_date}</span>
                    </p>
                    <p className="text-cinema-black dark:text-gray-300 line-clamp-3 text-sm flex-grow">
                      {movie.description}
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-block bg-cinema-red-light text-cinema-red-dark px-3 py-1 text-sm font-medium rounded-full">
                        {t("home.nowShowing.bookNowBtn")}
                      </span>
                      {movie.rating && (
                        <div className="flex items-center">
                          <svg 
                            className="w-4 h-4 text-yellow-500" 
                            fill="currentColor" 
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                          <span className="ml-1 text-sm">{movie.rating}</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Cinema Features/Amenities - Full Bleed with Background */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-4xl font-bold text-center mb-16 text-cinema-black dark:text-white">{t("home.features.title")}</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-white dark:bg-dark-bg-secondary p-8 rounded-xl shadow-xl transform transition-all duration-300 hover:-translate-y-4 hover:shadow-2xl"
              >
                <div className="text-6xl mb-6 text-cinema-red">{feature.icon}</div>
                <h3 className="text-2xl font-bold mb-4 text-cinema-black dark:text-white">{feature.title}</h3>
                <p className="text-gray-600 dark:text-gray-300 text-lg">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter - Full Width with Enhanced Design */}
      <section className="py-20 bg-cinema-red relative overflow-hidden">
        {/* Add decorative elements */}
        <div className="absolute -top-24 -left-24 w-64 h-64 rounded-full bg-cinema-red-dark opacity-30"></div>
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-cinema-red-dark opacity-30"></div>
        
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6 text-white">{t("home.newsletter.title")}</h2>
            <p className="text-xl mb-10 text-white opacity-90">{t("home.newsletter.description")}</p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder={t("home.newsletter.placeholder")} 
                className="flex-grow py-4 px-6 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800 text-lg"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-cinema-red hover:bg-gray-100 py-4 px-8 rounded-lg font-bold transition duration-300 text-lg"
              >
                {t("home.newsletter.subscribeBtn")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
