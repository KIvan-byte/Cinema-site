const pl = {
  // Navigation
  nav: {
    home: 'Strona Główna',
    movies: 'Filmy',
    about: 'O Nas',
    profile: 'Profil',
    admin: 'Admin',
    login: 'Logowanie',
    register: 'Rejestracja',
    logout: 'Wyloguj'
  },

  // Home Page
  home: {
    hero: {
      welcome: 'Witamy w Cinema Tickets',
      tagline: 'Twoje najlepsze miejsce na najnowsze hity filmowe',
      browseBtn: 'Przeglądaj Wszystkie Filmy',
      subtitle: "Ciesz się niezapomnianym doświadczeniem kinowym, jak nigdy dotąd."
    },
    about: {
      title: 'Doświadcz Filmów Jak Nigdy Wcześniej',
      p1: 'Witamy w naszym nowoczesnym kinie, gdzie magia filmu ożywa! Od 2005 roku stawiamy na zapewnienie najlepszych wrażeń filmowych dzięki najnowszej technologii i niezrównanemu komfortowi.',
      p2: 'Nasze sale kinowe oferują krystalicznie czystą projekcję, immersyjny dźwięk Dolby Atmos oraz luksusowe fotele – idealne zarówno na randkę, jak i na wspólne seanse z rodziną.',
      learnMore: 'Dowiedz Się Więcej',
      // Optional extra descriptions merged here
      details: [
        "Nasze kino zostało zaprojektowane, aby ożywić magię filmów.",
        "Posiadamy najnowocześniejsze systemy dźwięku i projekcji, by zapewnić niezapomniane wrażenia."
      ],
      description1: "Nasze kino zostało zaprojektowane, aby ożywić magię filmów.",
      description2: "Posiadamy najnowocześniejsze systemy dźwięku i projekcji, by zapewnić niezapomniane wrażenia.",
      learnMoreBtn: "Dowiedz się więcej"
    },
    nowShowing: {
      title: 'Aktualnie Gramy',
      viewAll: 'Zobacz Wszystkie Filmy',
      bookNow: 'Zarezerwuj',
      viewAllBtn: "Zobacz wszystkie filmy",
      bookNowBtn: "Zarezerwuj",
      noMovies: "Aktualnie brak filmów w repertuarze."
    },
    why: {
      title: 'Dlaczego Warto Wybrać Nasze Kino',
      features: {
        latest: {
          title: 'Najnowsze Premiery',
          desc: 'Doświadcz najnowszych hitów filmowych w oszałamiającej jakości'
        },
        concessions: {
          title: 'Ekskluzywny Bufet',
          desc: 'Wyśmienity popcorn, piwa rzemieślnicze oraz przekąski przygotowywane przez szefa kuchni'
        },
        seating: {
          title: 'Luksusowe Fotele',
          desc: 'Rozkładane fotele skórzane z dodatkową przestrzenią na nogi oraz osobistymi stolikami'
        },
        sound: {
          title: 'Dolby Atmos',
          desc: 'Technologia dźwięku, która przenosi Cię w środek akcji'
        }
      }
    },
    features: {
      title: "Funkcje Kina",
      latest: "Najnowsze Premiery",
      latestDesc: "Doświadcz najnowszych hitów filmowych w oszałamiającej jakości",
      concessions: "Ekskluzywny Bufet",
      concessionsDesc: "Wyśmienity popcorn oraz szeroki wybór przekąsek i napojów",
      seating: "Luksusowe Fotele",
      seatingDesc: "Fotele z dodatkową przestrzenią i osobistymi stolikami",
      sound: "Dolby Atmos",
      soundDesc: "Zanurz się w technologii dźwięku przenoszącego Cię w centrum akcji"
    },
    newsletter: {
      title: 'Bądź na bieżąco z najnowszymi premierami',
      desc: 'Zapisz się do naszego newslettera, aby otrzymywać wiadomości o nowych filmach, specjalnych ofertach i ekskluzywnych wydarzeniach.',
      placeholder: 'Wpisz swój adres e-mail',
      button: 'Subskrybuj',
      subscribeBtn: "Subskrybuj teraz",
      description: "Nie przegap aktualności i specjalnych ofert – zapisz się do naszego newslettera już dziś."
    },
    error: {
      tryAgainBtn: 'Spróbuj ponownie',
      titleCollection: 'Nie można załadować kolekcji'
    }
  },

  // Movies Page
  movies: {
    title: 'Nasza Kolekcja Filmów',
    subtitle: 'Odkryj starannie wyselekcjonowaną kolekcję najnowszych hitów, klasyków oraz niezależnych perełek. Znajdź swój następny ulubiony film i zarezerwuj bilety online.',
    search: 'Szukaj filmów...',
    // Remove duplicate "genres" string – use object instead:
    genres: {
      all: "Wszystkie Gatunki",
      action: "Akcja",
      comedy: "Komedia",
      drama: "Dramat",
      horror: "Horror",
      'sci-fi': "Sci-Fi",
      animation: "Animacja"
    },
    sort: {
      latest: 'Najnowsze premiery',
      az: 'A-Z',
      za: 'Z-A',
      rating: 'Najwyżej oceniane'
    },
    nowShowing: 'Tylko aktualnie grane',
    results: {
      singular: 'film znaleziony',
      plural: 'filmów znalezionych'
    },
    result: {
      multiple: "Wiele filmów znalezionych"
    },
    noResults: {
      title: 'Nie znaleziono filmów',
      message: 'Spróbuj zmienić kryteria wyszukiwania lub filtru'
    },
    hero: {
      title: "Polecane Filmy",
      description: "Odkryj nasze najnowsze hity oraz klasyki."
    },
    showingOnly: "Aktualnie Gramy",
    bookNow: "Zarezerwuj",
    exploreCollection: 'Przeglądaj Kolekcję'
  },

  // About Page
  about: {
    hero: {
      title: 'O Cinema Tickets',
      subtitle: 'Tworzymy niezapomniane doświadczenia filmowe od 1985 roku'
    },
    story: {
      title: 'Nasza Historia',
      p1: 'Cinema Tickets zaczęło jako małe kino rodzinne w 1985 roku, z pasją do przybliżania magii kina społeczności.',
      p2: 'Od skromnych początków z dwoma salami do nowoczesnego kompleksu – stale podążamy za duchem czasu, zachowując przyjazną atmosferę.',
      p3: 'Nasza misja pozostaje niezmienna: dostarczać wyjątkowe doświadczenia, prezentować różnorodność filmów i budować społeczność miłośników kina.',
      experience: 'filmowych doznań',
      years: "Lata doświadczenia",
      excellence: "Dziedzictwo filmowej doskonałości"
    },
    journey: {
      title: 'Nasza Droga'
    },
    timeline: {
      title: "Nasza Oś Czasu",
      milestones: {
        "1985": {
          title: "Wielkie Otwarcie",
          description: "Kino otworzyło się z dwoma salami i wizją wysokiej jakości filmów."
        },
        "1995": {
          title: "Pierwsza Ekspansja",
          description: "Rozszerzyliśmy ofertę do 6 sal kinowych z certyfikowanym audytorium THX."
        },
        "2005": {
          title: "Cyfrowa Rewolucja",
          description: "Przeszliśmy całkowicie na cyfrową projekcję."
        },
        "2012": {
          title: "Luksusowa Renowacja",
          description: "Renowacja z rozkładanymi fotelami i rozszerzonym bufetem."
        },
        "2020": {
          title: "Innowacja Online",
          description: "Uruchomienie platformy streamingowej i wirtualnego kina."
        },
        "Today": {
          title: "Ciągła Doskonałość",
          description: "Najwyższe doświadczenia kinowe z najnowszą technologią."
        }
      }
    },
    team: {
      title: 'Poznaj Nasz Zespół',
      members: [
        {
          name: "Sarah Johnson",
          role: "Dyrektor Generalny",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "Sarah ma 10 lat doświadczenia i wnosi ponad 15 lat w zarządzaniu kinem."
        },
        {
          name: "Michael Chen",
          role: "Dyrektor Techniczny",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "Michael dba o nasze systemy projekcyjne i dźwiękowe."
        },
        {
          name: "Jessica Rodriguez",
          role: "Koordynator Wydarzeń",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=461&q=80",
          bio: "Jessica organizuje specjalne pokazy i wydarzenia filmowe."
        },
        {
          name: "David Wilson",
          role: "Kierownik ds. Gastronomii",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "David odpowiada za nasz bufet i doświadczenia kulinarne."
        }
      ]
    },
    facilities: {
      title: 'Nasze Udogodnienia',
      auditoriums: {
        title: 'Luksusowe Sale',
        desc: '8 nowoczesnych sal kinowych z projekcją laserową 4K, systemem Dolby Atmos i ultra komfortowymi fotelami.',
        description: "Nowoczesne sale z 4K projekcją, Dolby Atmos i wygodnymi fotelami."
      },
      concessions: {
        title: 'Gourmet Bufet',
        desc: 'Menu gourmet, piwa rzemieślnicze, wyszukane koktajle oraz doskonała kawiarnia.',
        description: "Wyrafinowany wybór przekąsek i orzeźwiających napojów."
      },
      lounge: {
        title: 'Strefa Rozrywki',
        desc: 'Lobby z salą gier, wygodnymi miejscami do oczekiwania oraz barem.',
        description: "Strefa rozrywki z grami arcade i przyjazną atmosferą."
      }
    },
    faq: {
      title: 'Najczęściej Zadawane Pytania',
      more: 'Masz więcej pytań? Skontaktuj się z naszą obsługą klienta.',
      contact: 'Skontaktuj się',
      moreQuestions: "Masz więcej pytań? Skontaktuj się z naszym wsparciem.",
      contactUs: "Skontaktuj się",
      items: [
        {
          question: "Jakie są wasze godziny otwarcia?",
          answer: "Otwieramy codziennie o 10:00. Ostatni seans zaczyna się około 22:30, w zależności od filmu i specjalnych wydarzeń."
        },
        {
          question: "Czy oferujecie zniżki dla studentów lub seniorów?",
          answer: "Tak! Oferujemy bilety w obniżonych cenach dla studentów, seniorów (65+), wojskowych oraz dzieci poniżej 12 lat. Proszę zabrać dowód tożsamości."
        },
        {
          question: "Czy jedzenie i napoje z zewnątrz są dozwolone?",
          answer: "Nie. Oferujemy szeroki wybór przekąsek – od tradycyjnego popcornu po wyszukane opcje w naszym barze."
        },
        {
          question: "Jak wcześnie przybyć przed seansem?",
          answer: "Zalecamy przybycie 15-20 minut wcześniej, a przy premierach – 30 minut."
        },
        {
          question: "Czy kino jest dostępne?",
          answer: "Tak, oferujemy miejsca dla osób na wózkach, urządzenia wspomagające słyszenie i napisy dla niesłyszących."
        }
      ]
    },
    visit: {
      title: 'Odwiedź Nas',
      desc: 'Doświadcz magii kina w komfortowych warunkach. Od hitów filmowych po niezależne perełki – mamy coś dla każdego.',
      button: 'Zobacz seanse',
      description: "Doświadcz magii kina z luksusowymi udogodnieniami.",
      address: {
        title: "Lokalizacja",
        description: "Ulica Kina 123, Miasto Filmowe, Kraj"
      },
      phone: {
        title: "Zadzwoń do nas",
        description: "123-456-7890"
      },
      hours: {
        title: "Godziny otwarcia",
        description: "Poniedziałek - Niedziela: 10:00 - 23:00"
      },
      showtimes: "Zobacz seanse"
    },
    cta: {
      title: 'Doświadcz kina na najwyższym poziomie',
      desc: 'Dołącz do nas i przeżyj niezapomniane doświadczenia filmowe dzięki najnowszym produkcjom i luksusowemu komfortowi.',
      viewMovies: 'Zobacz Filmy',
      contactUs: 'Skontaktuj się',
      description: "Rozpocznij filmową podróż i zanurz się w kinowych emocjach."
    }
  },

  // Common phrases
  common: {
    loading: 'Ładowanie...',
    error: {
      title: 'Błąd',
      tryAgain: 'Spróbuj ponownie'
    },
    signedInAs: 'Zalogowany jako:',
    days: {
      mon: "Pon",
      tue: "Wt",
      wed: "Śr",
      thu: "Czw",
      fri: "Pt",
      sat: "Sob",
      sun: "Niedz"
    },
    months: {
      jan: "Styczeń",
      feb: "Luty",
      mar: "Marzec",
      apr: "Kwiecień",
      may: "Maj",
      jun: "Czerwiec",
      jul: "Lipiec",
      aug: "Sierpień",
      sep: "Wrzesień",
      oct: "Październik",
      nov: "Listopad",
      dec: "Grudzień"
    }
  },

  // Language switcher
  language: {
    en: 'Angielski',
    pl: 'Polski',
    changeTo: 'Przełącz na',
    current: 'Język bieżący:'
  },

  // Footer
  footer: {
    text: "© 2025 Cinema Tickets. Wszystkie prawa zastrzeżone."
  },

  // Login Page
  login: {
    username: "Nazwa użytkownika",
    usernamePlaceholder: "Wpisz swoją nazwę użytkownika",
    password: "Hasło",
    passwordPlaceholder: "Wpisz swoje hasło",
    noAccount: "Nie masz konta?"
  },

  // Register Page
  register: {
    usernamePlaceholder: "Wpisz swoją nazwę użytkownika",
    emailPlaceholder: "Wpisz swój adres e-mail",
    passwordPlaceholder: "Wpisz swoje hasło",
    confirmPasswordPlaceholder: "Potwierdź swoje hasło",
    alreadyHaveAccount: "Masz już konto?"
  },

  // Movie Page (details)
  movie: {
    description: "Opis",
    showtimes: "Seanse",
    selectSeats: "Wybierz miejsca",
    availableShowtimes: "Dostępne Seanse",
    noShowtimes: "Brak dostępnych seansów"
  },

  // Profile Page
  profile: {
    myProfile: "Mój Profil",
    myTickets: "Moje Bilety",
    noTickets: "Brak biletów",
    downloadTicket: "Pobierz bilet",
    paymentSuccess: "Płatność powiodła się!"
  },

  // Seat Selection
  seatSelection: {
    title: "Wybierz swoje miejsca",
    noSeatSelected: "Nie wybrano żadnego miejsca",
    confirmButton: "Potwierdź wybór",
    fetchError: "Nie udało się załadować informacji o miejscach"
  },

  // Checkout
  checkout: {
    title: "Podsumowanie zamówienia",
    orderSummary: "Podsumowanie zamówienia",
    totalAmount: "Łączna kwota",
    paymentMethod: "Metoda płatności",
    creditCard: "Karta kredytowa",
    paypal: "PayPal",
    cardNumber: "Numer karty",
    expirationDate: "Data ważności",
    cvv: "CVV",
    pay: "Zapłać",
    fetchError: "Nie udało się załadować zamówienia",
    paymentError: "Błąd podczas dokonywania płatności",
    reservationNotFound: "Nie znaleziono rezerwacji"
  },

  // Admin
  admin: {
    panelTitle: "Panel Administratora",
    statistics: "Statystyki",
    movies: "Zarządzaj Filmami",
    showtimes: "Zarządzaj Seansami",
    halls: "Zarządzaj Salami",
    addMovie: "Dodaj Film",
    editMovie: "Edytuj Film",
    movieTitle: "Tytuł Filmu",
    description: "Opis",
    duration: "Czas Trwania",
    releaseDate: "Data Premiery",
    posterUrl: "URL Plakatu",
    rating: "Ocena",
    // Only keep one genres key (object format)
    genres: {
      all: "Wszystkie Gatunki",
      action: "Akcja",
      comedy: "Komedia",
      drama: "Dramat",
      horror: "Horror",
      'sci-fi': "Sci-Fi",
      animation: "Animacja"
    },
    save: "Zapisz",
    cancel: "Anuluj",
    delete: "Usuń",
    edit: "Edytuj",
    confirmDeleteMovie: "Czy na pewno chcesz usunąć ten film?",
    noMoviesFound: "Nie znaleziono filmów",
    addShowtime: "Dodaj Seans",
    editShowtime: "Edytuj Seans",
    movie: "Film",
    hall: "Sala",
    startTime: "Czas Rozpoczęcia",
    price: "Cena",
    selectMovie: "Wybierz Film",
    selectHall: "Wybierz Salę",
    confirmDeleteShowtime: "Czy na pewno chcesz usunąć ten seans?",
    noShowtimesFound: "Nie znaleziono seansów",
    addHall: "Dodaj Salę",
    editHall: "Edytuj Salę",
    hallName: "Nazwa Sali",
    capacity: "Pojemność",
    rows: "Rzędy",
    seatsPerRow: "Miejsca w Rzędzie",
    capacityCalculated: "Pojemność jest automatycznie obliczana na podstawie rzędów i miejsc w rzędzie",
    confirmDeleteHall: "Czy na pewno chcesz usunąć tę salę?",
    cannotDeleteHall: "Nie można usunąć sali z przypisanymi seansami",
    noHallsFound: "Nie znaleziono sal",
    totalTickets: "Sprzedane Bilety",
    revenue: "Całkowity Przychód",
    upcomingShowtimes: "Nadchodzące Seanse",
    totalMovies: "Liczba Filmów",
    popularMovies: "Popularne Filmy",
    ticketsSold: "sprzedanych biletów",
    recentTransactions: "Ostatnie Transakcje",
    noDataAvailable: "Brak dostępnych danych"
  }
};

export default pl;
