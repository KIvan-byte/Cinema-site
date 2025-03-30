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
      subtitle: "Ciesz się niezapomnianym doświadczeniem kinowym, jak nigdy dotąd." // NEW KEY
    },
    about: {
      title: 'Doświadcz Filmów Jak Nigdy Wcześniej',
      p1: 'Witamy w naszym nowoczesnym kinie, gdzie magia filmu ożywa! Od 2005 roku stawiamy na zapewnienie najlepszych wrażeń filmowych dzięki najnowszej technologii i niezrównanemu komfortowi.',
      p2: 'Nasze sale kinowe oferują krystalicznie czystą projekcję, immersyjny dźwięk Dolby Atmos oraz luksusowe fotele, które odmieniają Twoje doświadczenie oglądania filmu. Niezależnie od tego, czy jesteś miłośnikiem kina, czy szukasz idealnego miejsca na randkę – nasze kino spełni Twoje oczekiwania.',
      learnMore: 'Dowiedz Się Więcej',
      description1: "Nasze kino zostało zaprojektowane, aby ożywić magię filmów.", // NEW KEY
      description2: "Posiadamy najnowocześniejsze systemy dźwięku i projekcji, by zapewnić niezapomniane wrażenia.", // NEW KEY
      learnMoreBtn: "Dowiedz się więcej" // NEW KEY
    },
    nowShowing: {
      title: 'Aktualnie Gramy',
      viewAll: 'Zobacz Wszystkie Filmy',
      bookNow: 'Zarezerwuj',
      mins: 'min',
      viewAllBtn: "Zobacz wszystkie filmy", // NEW KEY
      bookNowBtn: "Zarezerwuj"          // NEW KEY
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
          desc: 'Wyśmienity popcorn, piwa rzemieślnicze i przekąski przygotowywane przez szefa kuchni'
        },
        seating: {
          title: 'Luksusowe Fotele',
          desc: 'Rozkładane fotele skórzane z dodatkową przestrzenią dla nóg oraz osobistymi stolikami'
        },
        sound: {
          title: 'Dolby Atmos',
          desc: 'Technologia dźwięku, która przenosi Cię w środek akcji'
        }
      }
    },
    features: {
      title: "Funkcje Kina", // NEW KEY
      latest: "Najnowsze Premiery", // New or updated
      latestDesc: "Doświadcz najnowszych hitów filmowych w oszałamiającej jakości", // New or updated
      concessions: "Ekskluzywny Bufet", // New or updated
      concessionsDesc: "Wyśmienity popcorn, piwa rzemieślnicze i przekąski przygotowywane przez szefa kuchni", // New or updated
      seating: "Luksusowe Fotele", // New or updated
      seatingDesc: "Rozkładane fotele skórzane z dodatkową przestrzenią dla nóg oraz osobistymi stolikami", // New or updated
      sound: "Dolby Atmos", // New or updated
      soundDesc: "Technologia dźwięku, która przenosi Cię w środek akcji" // New or updated
    },
    newsletter: {
      title: 'Bądź na bieżąco z najnowszymi premierami',
      desc: 'Zapisz się do naszego newslettera, aby otrzymywać informacje o nowych filmach, specjalnych ofertach oraz ekskluzywnych wydarzeniach.',
      placeholder: 'Wpisz swój adres e-mail',
      button: 'Subskrybuj',
      subscribeBtn: "Subskrybuj teraz", // NEW KEY
      description: "Nie przegap najnowszych aktualizacji i specjalnych ofert. Zapisz się do naszego newslettera już dziś." // NEW KEY
    }
  },
  
  // Movies Page
  movies: {
    title: 'Nasza Kolekcja Filmów',
    subtitle: 'Odkryj naszą starannie wyselekcjonowaną kolekcję najnowszych hitów, ponadczasowych klasyków oraz niezależnych perełek. Znajdź swój następny ulubiony film i zarezerwuj bilety online.',
    search: 'Szukaj filmów...',
    genres: 'Wszystkie Gatunki',
    sort: {
      latest: 'Najnowsze premiery',
      az: 'A-Z',
      za: 'Z-A',
      rating: 'Najwyżej oceniane',
      "a-z": "A-Z", // NEW KEY
      "z-a": "Z-A"  // NEW KEY
    },
    nowShowing: 'Tylko aktualnie grane',
    results: {
      singular: 'film znaleziony',
      plural: 'filmów znalezionych'
    },
    result: {
      multiple: "Wiele filmów znalezionych" // NEW KEY
    },
    noResults: {
      title: 'Nie znaleziono filmów',
      message: 'Spróbuj zmienić kryteria wyszukiwania lub filtru'
    },
    hero: {
      title: "Polecane Filmy", // NEW KEY
      description: "Odkryj nasze najnowsze hity oraz ponadczasowe klasyki." // NEW KEY
    },
    showingOnly: "Aktualnie Gramy", // NEW KEY
    bookNow: "Zarezerwuj", // NEW KEY
    genres: {
      all: "Wszystkie Gatunki", // NEW KEY
      action: "Akcja", // NEW KEY
      comedy: "Komedia", // NEW KEY
      drama: "Dramat", // NEW KEY
      horror: "Horror", // NEW KEY
      "sci-fi": "Sci-Fi", // NEW KEY
      animation: "Animacja" // NEW KEY
    }
  },
  
  // About Page
  about: {
    hero: {
      title: 'O Cinema Tickets',
      subtitle: 'Tworzymy niezapomniane filmowe doświadczenia od 1985 roku'
    },
    story: {
      title: 'Nasza Historia',
      p1: 'Cinema Tickets rozpoczęło swoją działalność jako małe kino rodzinne w 1985 roku, z pasją do przybliżania magii kina naszej społeczności. To, co zaczęło się jako skromne kino z dwoma salami, stało się wiodącą destynacją filmową, jaką znamy dzisiaj.',
      p2: 'Nasze zaangażowanie w jakość nigdy nie ustaje. Od bycia jednym z pierwszych kin w regionie, które przeszły na projekcję cyfrową, po niedawne renowacje z luksusowymi fotelami – zawsze idziemy z duchem czasu, zachowując ciepłą i przyjazną atmosferę.',
      p3: 'Przez dekady zmian w przemyśle filmowym, nasza misja pozostaje niezmienna: zapewniać wyjątkowe doświadczenia kinowe, prezentować różnorodność filmów oraz tworzyć przestrzeń, w której społeczność może wspólnie cieszyć się sztuką opowiadania historii.',
      experience: 'filmowych doznań',
      years: "Lata doświadczenia", // NEW KEY
      excellence: "Dziedzictwo filmowej doskonałości" // NEW KEY
    },
    journey: {
      title: 'Nasza Droga'
    },
    timeline: {
      title: "Nasza Oś Czasu", // NEW KEY
      milestones: { // NEW KEY
        "1985": {
          title: "Wielkie Otwarcie",
          description: "Nasze kino otworzyło drzwi zaledwie z dwoma salami oraz wizją dostarczania wysokiej jakości filmów dla społeczności."
        },
        "1995": {
          title: "Pierwsza Ekspansja",
          description: "Rozszerzyliśmy naszą ofertę do 6 sal kinowych i wprowadziliśmy pierwsze audytorium z certyfikatem THX."
        },
        "2005": {
          title: "Cyfrowa Rewolucja",
          description: "Byliśmy jednymi z pierwszych kin w regionie, które całkowicie przeszły na cyfrową projekcję."
        },
        "2012": {
          title: "Luksusowa Renowacja",
          description: "Kompletna renowacja z rozkładanymi fotelami, rozszerzonym bufetem oraz premium doświadczeniem kinowym."
        },
        "2020": {
          title: "Innowacja Online",
          description: "Uruchomiliśmy naszą platformę streamingową i wirtualne kino w odpowiedzi na globalne wyzwania."
        },
        "Today": {
          title: "Ciągła Doskonałość",
          description: "Dalej zapewniamy najwyższe doświadczenia kinowe z najnowszą technologią i komfortem."
        }
      }
    },
    team: {
      title: 'Poznaj Nasz Zespół',
      members: [ // updated placeholder data with image URLs
        {
          name: "Sarah Johnson",
          role: "Dyrektor Generalny",
          image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "Sarah ma z nami 10 lat doświadczenia i wnosi ponad 15 lat doświadczenia w zarządzaniu kinem."
        },
        {
          name: "Michael Chen",
          role: "Dyrektor Techniczny",
          image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "Michael dba o to, aby nasze systemy projekcyjne i dźwiękowe zapewniały niezapomniane doświadczenia kinowe."
        },
        {
          name: "Jessica Rodriguez",
          role: "Koordynator Wydarzeń",
          image: "https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&auto=format&fit=crop&w=461&q=80",
          bio: "Jessica organizuje nasze specjalne pokazy, premiery i wydarzenia filmowe dla społeczności."
        },
        {
          name: "David Wilson",
          role: "Kierownik ds. Gastronomii",
          image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=387&q=80",
          bio: "David dba o naszą wyrafinowaną ofertę bufetową oraz o najwyższej klasy doświadczenia restauracyjne w kinie."
        }
      ]
    },
    facilities: {
      title: 'Nasze Udogodnienia',
      auditoriums: {
        title: 'Luksusowe Sale',
        desc: 'Nasze 8 nowoczesnych sal kinowych wyposażone jest w projekcję laserową 4K, system dźwięku Dolby Atmos i ultra komfortowe fotele z dużą przestrzenią dla nóg.',
        description: "Nasze 8 nowoczesnych sal kinowych wyposażonych jest w projekcję laserową 4K, dźwięk Dolby Atmos oraz ultra komfortowe fotele, aby zapewnić niezapomniane wrażenia."
      },
      concessions: {
        title: 'Gourmet Bufet',
        desc: 'Wyjdź poza tradycyjny popcorn dzięki naszemu menu gourmet, piwom rzemieślniczym, wyszukanym koktajlom oraz doskonałej kawiarni.',
        description: "Rozkoszuj się wyrafinowanym wyborem popcornu, przekąsek i szerokiej gamy orzeźwiających napojów w naszym bufecie."
      },
      lounge: {
        title: 'Strefa Rozrywki',
        desc: 'Nasze przestronne lobby obejmuje salon gier, wygodne miejsca do oczekiwania oraz bar, gdzie możesz odpocząć przed lub po filmie.',
        description: "Zrelaksuj się w naszej strefie rozrywki, która oferuje gry arcade, wygodne fotele i przyjazną atmosferę."
      }
    },
    faq: {
      title: 'Najczęściej Zadawane Pytania',
      more: 'Masz więcej pytań? Skontaktuj się z naszą obsługą klienta.',
      contact: 'Skontaktuj się',
      moreQuestions: "Masz więcej pytań? Skontaktuj się z naszym zespołem wsparcia.",
      contactUs: "Skontaktuj się",
      items: [ // NEW KEY: FAQ placeholders (Polish)
        {
          question: "Jakie są wasze godziny otwarcia?",
          answer: "Otwieramy codziennie o 10:00. Ostatni seans zazwyczaj zaczyna się około 22:30, ale może się różnić w zależności od długości filmu i specjalnych wydarzeń."
        },
        {
          question: "Czy oferujecie zniżki dla studentów lub seniorów?",
          answer: "Tak! Oferujemy bilety w obniżonych cenach dla studentów, seniorów (65+), personelu wojskowego oraz dzieci poniżej 12 lat. Proszę zabrać ważny dowód tożsamości do weryfikacji."
        },
        {
          question: "Czy dozwolone jest jedzenie i picie z zewnątrz?",
          answer: "Jedzenie i napoje spoza kina nie są dozwolone, ponieważ oferujemy szeroki wybór przekąsek – od tradycyjnego popcornu po wykwintne opcje i pełnoprawny bar."
        },
        {
          question: "Jak wcześnie powinienem przybyć przed seans?",
          answer: "Zalecamy przybycie 15-20 minut przed rozpoczęciem seansu, aby znaleźć miejsce i skorzystać z bufetu. Przy seansach premium i wieczorach otwarcia zalecamy 30 minut."
        },
        {
          question: "Czy posiadacie opcje dostępności?",
          answer: "Tak, nasze kino jest w pełni dostępne, oferując miejsca dla osób na wózkach, urządzenia wspomagające słyszenie oraz napisy dla osób niesłyszących dostępne na życzenie."
        }
      ]
    },
    visit: {
      title: 'Odwiedź Nas',
      desc: 'Doświadcz magii kina w niezrównanym komforcie. Od hitów filmowych po niezależne perełki – mamy filmy dla każdego.',
      address: 'Adres',
      phone: 'Telefon',
      hours: 'Godziny otwarcia',
      timespan: 'Poniedziałek - Niedziela: 10:00 - 23:00',
      button: 'Zobacz seanse',
      description: "Doświadcz magii kina dzięki różnorodnej ofercie filmowej i luksusowym udogodnieniom.",
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
      desc: 'Dołącz do nas i przeżyj niezapomniane doświadczenie filmowe dzięki najnowszym produkcjom, luksusowemu komfortowi oraz nowoczesnej technologii.',
      viewMovies: 'Zobacz Filmy',
      contactUs: 'Skontaktuj się',
      description: "Rozpocznij swoją filmową podróż z nami i zanurz się w niezapomnianych doświadczeniach kinowych."
    }
  },
  
  // Common phrases
  common: {
    loading: 'Ładowanie...',
    error: {
      title: 'Błąd',
      tryAgain: 'Spróbuj ponownie'
    },
    signedInAs: 'Zalogowany jako:'
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
    text: "© 2025 Cinema Tickets. Wszystkie prawa zastrzeżone." // New or updated key
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
  register: { // NEW KEYS for register page placeholders
    usernamePlaceholder: "Wpisz swoją nazwę użytkownika",
    emailPlaceholder: "Wpisz swój adres e-mail",
    passwordPlaceholder: "Wpisz swoje hasło",
    confirmPasswordPlaceholder: "Potwierdź swoje hasło",
    alreadyHaveAccount: "Masz już konto?"
  },

  // Movie Page
  movie: {
    description: "Opis", // NEW KEY
    showtimes: "Seanse",
    selectSeats: "Wybierz miejsca"
  },

  // Profile Page
  profile: {
    myProfile: "Mój Profil",
    myTickets: "Moje Bilety",
    noTickets: "Brak biletów",
    downloadTicket: "Pobierz bilet",
    paymentSuccess: "Płatność powiodła się!" // NEW KEY
  },

  // Seat Selection
  seatSelection: {
    title: "Wybierz swoje miejsca",
    noSeatSelected: "Nie wybrano żadnego miejsca",
    confirmButton: "Potwierdź wybór"
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
    pay: "Zapłać"
  },

  // Add or update admin translation placeholders
  admin: {
    panelTitle: "Panel Administratora", // NEW KEY
    statistics: "Statystyki", // NEW KEY
    movies: "Zarządzaj Filmami", // NEW KEY
    showtimes: "Zarządzaj Seansami", // NEW KEY
    halls: "Zarządzaj Salami", // NEW KEY
    addMovie: "Dodaj Film",
    editMovie: "Edytuj Film",
    movieTitle: "Tytuł Filmu",
    description: "Opis",
    duration: "Czas Trwania",
    releaseDate: "Data Premiery",
    posterUrl: "URL Plakatu",
    rating: "Ocena",
    genres: "Gatunki",
    save: "Zapisz",
    cancel: "Anuluj",
    delete: "Usuń",
    edit: "Edytuj",
    confirmDeleteMovie: "Czy na pewno chcesz usunąć ten film?",
    noMoviesFound: "Nie znaleziono filmów",
    
    // Showtimes management
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
    
    // Halls management
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
    
    // Statistics
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
