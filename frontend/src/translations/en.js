const en = {
  // Navigation
  nav: {
    home: 'Home',
    movies: 'Movies',
    about: 'About Us',
    profile: 'Profile',
    admin: 'Admin',
    login: 'Login',
    register: 'Register',
    logout: 'Logout'
  },
  
  // Home Page
  home: {
    hero: {
      welcome: 'Welcome to Cinema Tickets',
      tagline: 'Your premier destination for the latest blockbusters',
      browseBtn: 'Browse All Movies',
      subtitle: "Enjoy an immersive cinematic experience like never before." // NEW KEY
    },
    about: {
      title: 'Experience Movies Like Never Before',
      p1: 'Welcome to our state-of-the-art cinema, where movie magic comes alive! Since 2005, we\'ve been dedicated to providing the ultimate movie experience with cutting-edge technology and unparalleled comfort.',
      p2: 'Our theaters feature crystal-clear projection, immersive Dolby Atmos sound, and luxurious seating that will transform your movie-watching experience. Whether you\'re a film enthusiast or looking for a perfect date night, our cinema offers the perfect setting.',
      learnMore: 'Learn More About Us',
      description1: "Our cinema is designed to bring the magic of movies to life.",         // NEW KEY
      description2: "We feature state-of-the-art sound and projection systems for an unforgettable viewing experience.", // NEW KEY
      learnMoreBtn: "Learn More"  // NEW KEY
    },
    nowShowing: {
      title: 'Now Showing',
      viewAll: 'View All Movies',
      bookNow: 'Book Now',
      mins: 'min',
      viewAllBtn: "View All Movies",  // NEW KEY
      bookNowBtn: "Book Now"         // NEW KEY
    },
    why: {
      title: 'Why Choose Our Cinema',
      features: {
        latest: {
          title: 'Latest Releases',
          desc: 'Experience the newest blockbusters in stunning quality'
        },
        concessions: {
          title: 'Premium Concessions',
          desc: 'Gourmet popcorn, craft beverages, and chef-prepared snacks'
        },
        seating: {
          title: 'Luxury Seating',
          desc: 'Reclinable leather seats with extra legroom and personal tables'
        },
        sound: {
          title: 'Dolby Atmos',
          desc: 'Immersive sound technology that places you inside the action'
        }
      }
    },
    features: {
      title: "Cinema Features and Amenities", // NEW KEY
      latest: "Latest Releases", // New or updated
      latestDesc: "Experience the newest blockbusters in stunning quality", // New or updated
      concessions: "Premium Concessions", // New or updated
      concessionsDesc: "Gourmet popcorn, craft beverages, and chef-prepared snacks", // New or updated
      seating: "Luxury Seating", // New or updated
      seatingDesc: "Reclinable leather seats with extra legroom and personal tables", // New or updated
      sound: "Dolby Atmos", // New or updated
      soundDesc: "Immersive sound technology that places you inside the action" // New or updated
    },
    newsletter: {
      title: 'Stay Updated With Our Latest Releases',
      desc: 'Subscribe to our newsletter and get updates on new movies, special offers, and exclusive events.',
      placeholder: 'Enter your email address',
      button: 'Subscribe',
      subscribeBtn: "Subscribe Now", // NEW KEY
      description: "Don’t miss out on the latest updates and special offers. Subscribe to our newsletter today." // NEW KEY
    }
  },
  
  // Movies Page
  movies: {
    title: 'Our Movie Collection',
    subtitle: 'Discover our curated selection of the latest blockbusters, timeless classics, and independent gems. Find your next favorite film and book your tickets online.',
    search: 'Search for movies...',
    genres: 'All Genres',
    sort: {
      latest: 'Latest Releases',
      az: 'A-Z',
      za: 'Z-A',
      rating: 'Highest Rated',
      "a-z": "A-Z", // NEW KEY
      "z-a": "Z-A"  // NEW KEY
    },
    nowShowing: 'Now Showing Only',
    results: {
      singular: 'movie found',
      plural: 'movies found'
    },
    // Add new result key for multiple movies
    result: {
      multiple: "Multiple movies found" // NEW KEY
    },
    noResults: {
      title: 'No Movies Found',
      message: 'Try adjusting your search or filter criteria'
    },
    hero: {
      title: "Featured Movies", // NEW KEY
      description: "Discover our latest blockbusters and timeless classics." // NEW KEY
    },
    showingOnly: "Now Showing", // NEW KEY
    bookNow: "Book Now", // NEW KEY
    genres: {
      all: "All Genres", // NEW KEY
      action: "Action", // NEW KEY
      comedy: "Comedy", // NEW KEY
      drama: "Drama", // NEW KEY
      horror: "Horror", // NEW KEY
      "sci-fi": "Sci-Fi", // NEW KEY
      animation: "Animation" // NEW KEY
    }
  },
  
  // About Page
  about: {
    hero: {
      title: 'About Cinema Tickets',
      subtitle: 'Creating unforgettable movie experiences since 1985'
    },
    story: {
      title: 'Our Story',
      p1: 'Cinema Tickets began as a small, family-owned movie theater in 1985, driven by a passion for bringing the magic of cinema to our community. What started as a modest two-screen venue has evolved into the premier movie destination you know today.',
      p2: 'Our commitment to quality has never wavered. From being one of the first theaters in the region to adopt digital projection to our recent renovations featuring luxury recliner seating, we\'ve always stayed ahead of the curve while maintaining the warm, welcoming atmosphere our patrons love.',
      p3: 'Through decades of change in the film industry, our mission remains constant: to provide an exceptional movie-going experience, showcase a diverse selection of films, and create a space where the community can come together to share in the art of storytelling.',
      experience: 'of cinematic excellence',
      years: "Celebrating Years of Experience", // NEW KEY
      excellence: "A Legacy of Cinematic Excellence" // NEW KEY
    },
    timeline: {
      title: "Our Timeline", // NEW KEY
      milestones: { // NEW KEY
        "1985": {
          title: "Grand Opening",
          description: "Our cinema opened its doors with just two screens and a vision to bring quality films to the community."
        },
        "1995": {
          title: "First Expansion",
          description: "We expanded to 6 screens and introduced our first THX-certified auditorium."
        },
        "2005": {
          title: "Digital Revolution",
          description: "We were among the first theaters in the region to convert fully to digital projection technology."
        },
        "2012": {
          title: "Luxury Renovation",
          description: "Complete renovation with reclining seats, expanded concessions, and a premium viewing experience."
        },
        "2020": {
          title: "Online Innovation",
          description: "Launched our streaming platform and virtual cinema experience during global challenges."
        },
        "Today": {
          title: "Continuing Excellence",
          description: "Continuing to provide the ultimate cinema experience with the latest technology and comfort."
        }
      }
    },
    journey: {
      title: 'Our Journey'
    },
    team: {
      title: 'Meet Our Team',
      members: [ // updated placeholder data with image URLs
        {
          name: "Sarah Johnson",
          role: "General Manager",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "Sarah has been with us for 10 years and brings 15+ years of cinema management experience."
        },
        {
          name: "Michael Chen",
          role: "Technical Director",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "Michael ensures our projection and sound systems deliver the ultimate cinematic experience."
        },
        {
          name: "Jessica Rodriguez",
          role: "Events Coordinator",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=461&q=80",
          bio: "Jessica organizes our special screenings, premieres, and community film events."
        },
        {
          name: "David Wilson",
          role: "Food & Beverage Manager",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "David curates our gourmet concession offerings and premium theater dining experience."
        }
      ]
    },
    facilities: {
      title: 'Our Facilities',
      auditoriums: {
        title: 'Premium Auditoriums',
        desc: 'Our 8 state-of-the-art auditoriums feature 4K laser projection, Dolby Atmos sound, and ultra-comfortable reclining seats with ample legroom.',
        description: "Our 8 state-of-the-art auditoriums feature 4K laser projection, immersive Dolby Atmos sound, and ultra-comfortable reclining seats for unforgettable viewing." // NEW KEY replacing or supplementing "desc"
      },
      concessions: {
        title: 'Gourmet Concessions',
        desc: 'Go beyond traditional popcorn with our gourmet food menu, craft beers, specialty cocktails, and premium coffee bar.',
        description: "Indulge in a gourmet selection of popcorn, artisanal snacks, and a wide range of refreshing beverages at our concessions." // NEW KEY replacing or supplementing "desc"
      },
      lounge: {
        title: 'Entertainment Lounge',
        desc: 'Our spacious lobby includes an arcade, comfortable waiting areas, and a bar where you can relax before or after your movie.',
        description: "Relax and unwind in our entertainment lounge featuring arcade games, comfortable seating, and a vibrant atmosphere." // NEW KEY replacing or supplementing "desc"
      }
    },
    faq: {
      title: 'Frequently Asked Questions',
      more: 'Have more questions? Feel free to contact our customer service team.',
      contact: 'Contact Us',
      moreQuestions: "Have more questions? Reach out to our support team for help.", // NEW KEY
      contactUs: "Contact Us", // NEW KEY
      items: [ // NEW KEY: FAQ placeholders
        {
          question: "What are your operating hours?",
          answer: "We open daily at 10:00 AM. The last showtime typically starts around 10:30 PM, but this may vary based on film length and special events."
        },
        {
          question: "Do you offer discounts for students or seniors?",
          answer: "Yes! We offer discounted tickets for students, seniors (65+), military personnel, and children under 12. Please bring valid ID for verification."
        },
        {
          question: "Is outside food and drink permitted?",
          answer: "Outside food and drinks are not permitted as we offer a wide range of concessions, from traditional popcorn to gourmet options and a full bar."
        },
        {
          question: "How early should I arrive before my movie?",
          answer: "We recommend arriving 15-20 minutes before showtime to find seating and get concessions. For premium showings and opening nights, 30 minutes is advisable."
        },
        {
          question: "Do you have accessibility options?",
          answer: "Yes, our theater is fully accessible with wheelchair spaces, assisted listening devices, and closed caption devices available upon request."
        }
      ]
    },
    visit: {
      title: "Visit Us Today", // new placeholder (if not present)
      description: "Experience the magic of cinema in unparalleled comfort. Book your tickets today.", // new key replacing or supplementing the existing "desc"
      address: {
        title: "Our Location", // ensure this key exists
        description: "123 Cinema Street, Film City, Country" // ensure this key exists
      },
      phone: {
        title: "Call Us", // new placeholder
        description: "123-456-7890" // new placeholder
      },
      hours: {
        title: "Opening Hours", // new placeholder
        description: "Monday - Sunday: 10:00 AM - 11:00 PM" // new placeholder
      },
      showtimes: "View Showtimes", // new placeholder
      mapAlt: "Map location" // new key for the map image alt text
    },
    cta: {
      title: "Experience Cinema at Its Finest", // new placeholder
      description: "Embark on your cinematic journey with us and immerse yourself in unforgettable movie experiences.", // new placeholder
      viewMovies: "View Movies", // new placeholder
      contactUs: "Contact Us" // new placeholder
    }
    // ...existing keys...
  },
  
  // Common
  common: {
    loading: 'Loading...',
    error: {
      title: 'Error',
      tryAgain: 'Try Again'
    },
    signedInAs: 'Signed in as:'
  },

  // Language switcher
  language: {
    en: 'English',
    pl: 'Polish',
    changeTo: 'Switch to',
    current: 'Current language:'
  },
  
  footer: {
    text: "© 2025 Cinema Tickets. All rights reserved." // New or updated key
  },

  login: {
    username: "Username",
    usernamePlaceholder: "Enter your username",
    password: "Password",
    passwordPlaceholder: "Enter your password",
    noAccount: "Don't have an account?"
  },
  register: { // NEW KEYS for register page placeholders
    usernamePlaceholder: "Enter your desired username",
    emailPlaceholder: "Enter your email address",
    passwordPlaceholder: "Enter your password",
    confirmPasswordPlaceholder: "Confirm your password",
    alreadyHaveAccount: "Already have an account?"
  },
  movie: {
    description: "Description", // NEW KEY
    showtimes: "Showtimes",
    selectSeats: "Select Seats"
  },
  profile: {
    myProfile: "My Profile",
    myTickets: "My Tickets",
    noTickets: "No Tickets Available",
    downloadTicket: "Download Ticket",
    paymentSuccess: "Payment was successful!" // NEW KEY
  },
  seatSelection: {
    title: "Select Your Seats",
    noSeatSelected: "No seats selected",
    confirmButton: "Confirm Selection"
  },
  checkout: {
    title: "Checkout",
    orderSummary: "Order Summary",
    totalAmount: "Total Amount",
    paymentMethod: "Payment Method",
    creditCard: "Credit Card",
    paypal: "PayPal",
    cardNumber: "Card Number",
    expirationDate: "Expiration Date",
    cvv: "CVV",
    pay: "Pay"
  },
  // Add or update admin translation placeholders
  admin: {
    panelTitle: "Admin Dashboard", // NEW KEY
    statistics: "Statistics", // NEW KEY
    movies: "Manage Movies", // NEW KEY
    showtimes: "Manage Showtimes", // NEW KEY
    halls: "Manage Halls" // NEW KEY
  }
};

export default en;
