import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HomePage = () => {
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
      title: "Latest Releases",
      description: "Experience the newest blockbusters in stunning quality"
    },
    {
      icon: "🍿",
      title: "Premium Concessions",
      description: "Gourmet popcorn, craft beverages, and chef-prepared snacks"
    },
    {
      icon: "🛋️",
      title: "Luxury Seating",
      description: "Reclinable leather seats with extra legroom and personal tables"
    },
    {
      icon: "🔊",
      title: "Dolby Atmos",
      description: "Immersive sound technology that places you inside the action"
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
          <h3 className="text-xl font-bold mb-2">Error Loading Movies</h3>
          <p>{error}</p>
          <button 
            onClick={() => window.location.reload()} 
            className="mt-4 bg-cinema-red hover:bg-cinema-red-dark text-white py-2 px-4 rounded transition-colors duration-300"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="homepage pb-12">
      {/* Hero Section with Movie Carousel */}
      <section className="relative mb-16">
        {featuredMovies.length > 0 ? (
          <Swiper
            modules={[Autoplay, Pagination, Navigation, EffectFade]}
            effect="fade"
            spaceBetween={0}
            slidesPerView={1}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            navigation
            className="w-full h-[600px] rounded-xl overflow-hidden"
          >
            {featuredMovies.map((movie) => (
              <SwiperSlide key={movie.id} className="relative">
                <div 
                  className="absolute inset-0 bg-cover bg-center z-0" 
                  style={{ backgroundImage: `url(${movie.poster_url || 'https://source.unsplash.com/random/1200x600/?cinema'})` }}
                />
                <div className="absolute inset-0 bg-black bg-opacity-50 z-10" />
                <div className="absolute bottom-0 left-0 right-0 p-10 text-white z-20">
                  <h2 className="text-4xl md:text-5xl font-bold mb-2">{movie.title}</h2>
                  <p className="text-xl mb-6">{movie.description}</p>
                  <div className="flex items-center mb-6">
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
                    className="bg-cinema-red hover:bg-cinema-red-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300"
                  >
                    Book Tickets
                  </Link>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        ) : (
          <div className="w-full h-[400px] bg-gradient-to-r from-cinema-red to-cinema-red-dark flex items-center justify-center rounded-xl">
            <div className="text-center text-white p-8">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">Welcome to Cinema Tickets</h1>
              <p className="text-xl md:text-2xl mb-8">Your premier destination for the latest blockbusters</p>
              <Link 
                to="/movies" 
                className="bg-white text-cinema-red hover:bg-gray-100 font-bold py-3 px-6 rounded-lg transition duration-300"
              >
                Browse All Movies
              </Link>
            </div>
          </div>
        )}
      </section>

      {/* About Cinema Section */}
      <section className="py-16 bg-white rounded-xl shadow-md mb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-10 md:mb-0">
              <div className="relative">
                <img 
                  src="https://source.unsplash.com/random/600x400/?cinema,theater" 
                  alt="Inside our cinema" 
                  className="rounded-lg shadow-xl"
                />
                <img 
                  src="https://source.unsplash.com/random/300x200/?popcorn,movies" 
                  alt="Cinema experience" 
                  className="absolute -bottom-10 -right-10 rounded-lg shadow-xl border-4 border-white hidden md:block w-64"
                />
              </div>
            </div>
            <div className="md:w-1/2 md:pl-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-cinema-black">Experience Movies Like Never Before</h2>
              <p className="text-gray-600 mb-6 text-lg">
                Welcome to our state-of-the-art cinema, where movie magic comes alive! Since 2005, we've been dedicated to providing the ultimate movie experience with cutting-edge technology and unparalleled comfort.
              </p>
              <p className="text-gray-600 mb-8 text-lg">
                Our theaters feature crystal-clear projection, immersive Dolby Atmos sound, and luxurious seating that will transform your movie-watching experience. Whether you're a film enthusiast or looking for a perfect date night, our cinema offers the perfect setting.
              </p>
              <Link 
                to="/about" 
                className="bg-cinema-black hover:bg-gray-800 text-white font-bold py-3 px-6 rounded-lg transition duration-300 inline-flex items-center"
              >
                Learn More About Us
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
      <section className="mb-16">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-cinema-black">Now Showing</h2>
            <Link 
              to="/movies" 
              className="text-cinema-red hover:text-cinema-red-dark font-semibold inline-flex items-center"
            >
              View All Movies
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
                <div className="bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl transform hover:-translate-y-1 h-full flex flex-col">
                  <div className="h-64 overflow-hidden">
                    <img 
                      src={movie.poster_url} 
                      alt={movie.title}
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = 'https://via.placeholder.com/300x450?text=No+Image';
                      }}
                    />
                  </div>
                  <div className="p-4 flex-grow flex flex-col">
                    <h3 className="font-bold text-lg mb-1 text-cinema-black group-hover:text-cinema-red transition-colors duration-200">
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
                    <div className="mt-4 flex justify-between items-center">
                      <span className="inline-block bg-cinema-red-light text-cinema-red-dark px-3 py-1 text-sm font-medium rounded-full">
                        Book Now
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

      {/* Cinema Features/Amenities */}
      <section className="py-16 bg-gray-50 rounded-xl shadow-md mb-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-cinema-black">Why Choose Our Cinema</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-md text-center transform transition duration-300 hover:-translate-y-2 hover:shadow-lg">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2 text-cinema-black">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-cinema-red rounded-xl text-white shadow-md">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl font-bold mb-4">Stay Updated With Our Latest Releases</h2>
            <p className="text-lg mb-8">Subscribe to our newsletter and get updates on new movies, special offers, and exclusive events.</p>
            <form className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-grow py-3 px-4 rounded-lg focus:outline-none focus:ring-2 focus:ring-white text-gray-800"
                required
              />
              <button 
                type="submit" 
                className="bg-white text-cinema-red hover:bg-gray-100 py-3 px-6 rounded-lg font-bold transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
