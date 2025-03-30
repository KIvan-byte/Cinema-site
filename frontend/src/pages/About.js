import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();
  const [activeAccordion, setActiveAccordion] = useState(null);
  
  // Reuse the existing data setup
  const translatedTeam = t("about.team.members");
  const teamMembers = Array.isArray(translatedTeam) ? translatedTeam : [
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
  ];

  const translatedFaqs = t("about.faq.items");
  const faqs = Array.isArray(translatedFaqs) ? translatedFaqs : [
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
  ];

  const timelineMilestones = t("about.timeline.milestones") || {
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
  };

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? null : index);
  };

  return (
    <div className="about-page overflow-hidden">
      {/* Hero Section - Enhanced with parallax effect and cinema-themed decorations */}
      <section className="relative min-h-[80vh] flex items-center justify-center">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&auto=format&fit=crop&w=1479&q=80" 
            alt="Cinema auditorium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
        </div>
        
        {/* Cinema decorative elements */}
        <div className="absolute top-10 left-10 w-20 h-20 border-t-4 border-l-4 border-cinema-red opacity-60"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 border-b-4 border-r-4 border-cinema-red opacity-60"></div>
        
        <div className="container mx-auto px-6 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 text-white reveal-text">
            {t("about.hero.title")}
          </h1>
          <div className="h-1 w-24 bg-cinema-red mx-auto mb-8"></div>
          <p className="text-xl md:text-2xl text-gray-200 max-w-3xl mx-auto mb-10 leading-relaxed">
            {t("about.hero.subtitle")}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a 
              href="#our-story" 
              className="btn-pulse px-8 py-3 bg-cinema-red hover:bg-cinema-red-dark text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
            >
              {t("about.story.title")}
            </a>
            <Link 
              to="/movies" 
              className="px-8 py-3 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all"
            >
              {t("about.cta.viewMovies")}
            </Link>
          </div>
        </div>
        
        {/* Film strip decorative element */}
        <div className="absolute bottom-0 w-full h-12 overflow-hidden">
          <div className="film-strip w-full h-8 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="film-hole bg-black opacity-70"></div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section - with dynamic content layout */}
      <section id="our-story" className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <div className="mb-8">
                <h2 className="text-4xl font-bold mb-4 text-cinema-black dark:text-white">
                  {t("about.story.title")}
                </h2>
                <div className="h-1 w-16 bg-cinema-red"></div>
              </div>
              
              <div className="prose prose-lg max-w-none dark:prose-invert">
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("about.story.p1")}
                </p>
                <p className="mb-6 text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("about.story.p2")}
                </p>
                <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                  {t("about.story.p3")}
                </p>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="grid grid-cols-2 gap-4">
                <div className="relative rounded-lg overflow-hidden group transform transition hover:-translate-y-2 h-64">
                  <img 
                    src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                    alt="Cinema Experience" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-white font-medium">{t("about.story.years")}</p>
                  </div>
                </div>
                
                <div className="relative rounded-lg overflow-hidden group transform transition hover:-translate-y-2 h-64 mt-12">
                  <img 
                    src="https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-4.0.3&auto=format&fit=crop&w=1171&q=80" 
                    alt="Historic cinema" 
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <p className="text-white font-medium">{t("about.story.excellence")}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section - with animated connections and better visual hierarchy */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-cinema-black dark:text-white">
              {t("about.timeline.title")}
            </h2>
            <div className="h-1 w-16 bg-cinema-red mx-auto"></div>
          </div>
          
          <div className="relative">
            {/* The vertical timeline line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-cinema-red"></div>
            
            <div className="space-y-24">
              {Object.keys(timelineMilestones)
                .sort((a, b) => {
                  if (a === "Today") return 1;
                  if (b === "Today") return -1;
                  return parseInt(a) - parseInt(b);
                })
                .map((year, index) => {
                  const milestone = timelineMilestones[year];
                  const isEven = index % 2 === 0;
                  
                  return (
                    <div 
                      key={year}
                      className="timeline-item relative animate-on-scroll opacity-0"
                      style={{animationDelay: `${index * 200}ms`}}
                    >
                      {/* Connection dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-4 w-10 h-10 rounded-full bg-white dark:bg-gray-900 border-4 border-cinema-red z-10 shadow-xl"></div>
                      
                      <div className={`flex flex-col md:flex-row items-center ${isEven ? '' : 'md:flex-row-reverse'}`}>
                        {/* Year */}
                        <div className={`md:w-1/2 p-4 ${isEven ? 'md:text-right md:pr-16' : 'md:text-left md:pl-16'}`}>
                          <span className="inline-block px-6 py-2 bg-cinema-red text-white font-bold text-2xl rounded-lg shadow-lg">
                            {year}
                          </span>
                        </div>
                        
                        {/* Content */}
                        <div className={`md:w-1/2 p-4 ${isEven ? 'md:pl-16' : 'md:pr-16'}`}>
                          <div className="bg-white dark:bg-gray-900 p-8 rounded-xl shadow-xl hover:shadow-2xl transition-shadow">
                            <h3 className="text-2xl font-bold mb-4 text-cinema-black dark:text-white">
                              {milestone.title}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400">
                              {milestone.description}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section - improved card design with hover effects */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-cinema-black dark:text-white">
              {t("about.team.title")}
            </h2>
            <div className="h-1 w-16 bg-cinema-red mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              {t("about.facilities.intro")}            </p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
            {teamMembers.map((member, index) => (
              <div 
                key={index} 
                className="team-card group"
              >
                <div className="relative overflow-hidden rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                  <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-0 group-hover:opacity-70 transition-opacity z-10"></div>
                  
                  {/* Team member image */}
                  <div className="h-72 overflow-hidden">
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  {/* Content */}
                  <div className="bg-white dark:bg-gray-800 p-6 relative z-20">
                    <h3 className="font-bold text-xl mb-1 text-cinema-black dark:text-white group-hover:text-cinema-red transition-colors">
                      {member.name}
                    </h3>
                    <p className="text-cinema-red font-medium mb-3">
                      {member.role}
                    </p>
                    
                    {/* Bio text that expands on hover */}
                    <div className="overflow-hidden transition-all duration-300 max-h-0 group-hover:max-h-32 opacity-0 group-hover:opacity-100">
                      <p className="text-gray-600 dark:text-gray-300 text-sm mt-3 border-t border-gray-200 dark:border-gray-700 pt-3">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Facilities Section - with enhanced visual presentation */}
      <section className="py-20 bg-gray-100 dark:bg-gray-800">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-cinema-black dark:text-white">
              {t("about.facilities.title")}
            </h2>
            <div className="h-1 w-16 bg-cinema-red mx-auto mb-8"></div>
            <p className="text-xl text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
              Discover premium amenities designed to enhance your cinema experience.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {/* Premium Auditoriums */}
            <div className="facility-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="Premium Auditoriums"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-cinema-red rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-cinema-black dark:text-white">
                  {t("about.facilities.auditoriums.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("about.facilities.auditoriums.description")}
                </p>
              </div>
            </div>
            
            {/* Gourmet Concessions - FIXED IMAGE AND DESIGN */}
            <div className="facility-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1613564834361-9436948817d1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1742&q=80"
                  alt="Gourmet Concessions"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1569180880150-df4eed93c90b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-cinema-red rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"></path>
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-cinema-black dark:text-white">
                  {t("about.facilities.concessions.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("about.facilities.concessions.description")}
                </p>
              </div>
            </div>
            
            {/* Entertainment Lounge - FIXED DESIGN */}
            <div className="facility-card bg-white dark:bg-gray-900 rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-56 overflow-hidden relative">
                <img 
                  src="https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1170&q=80"
                  alt="Entertainment Lounge"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1650&q=80";
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent opacity-60"></div>
                <div className="absolute top-4 left-4 bg-cinema-red rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-10">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </div>
              </div>
              
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3 text-cinema-black dark:text-white">
                  {t("about.facilities.lounge.title")}
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  {t("about.facilities.lounge.description")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section - with interactive accordion */}
      <section className="py-20 bg-white dark:bg-gray-900">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 text-cinema-black dark:text-white">
              {t("about.faq.title")}
            </h2>
            <div className="h-1 w-16 bg-cinema-red mx-auto mb-8"></div>
          </div>
          
          <div className="max-w-3xl mx-auto">
            {faqs.map((faq, index) => (
              <div 
                key={index} 
                className="mb-4 bg-gray-50 dark:bg-gray-800 rounded-xl overflow-hidden shadow-md"
              >
                <button
                  className="w-full flex justify-between items-center p-5 text-left font-semibold text-cinema-black dark:text-white focus:outline-none"
                  onClick={() => toggleAccordion(index)}
                >
                  <span>{faq.question}</span>
                  <svg 
                    className={`w-5 h-5 transition-transform ${activeAccordion === index ? 'transform rotate-180' : ''}`} 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                
                <div 
                  className={`overflow-hidden transition-max-height duration-300 ease-in-out ${
                    activeAccordion === index ? 'max-h-72' : 'max-h-0'
                  }`}
                >
                  <div className="p-5 pt-0 text-gray-600 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700">
                    {faq.answer}
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-12">
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              {t("about.faq.moreQuestions")}
            </p>
            <Link 
              to="/contact" 
              className="inline-block px-8 py-3 bg-cinema-red hover:bg-cinema-red-dark text-white font-bold rounded-lg transition-colors shadow-lg"
            >
              {t("about.faq.contactUs")}
            </Link>
          </div>
        </div>
      </section>

      {/* Visit Us Section - improved layout and visual hierarchy */}
      <section className="py-20 bg-gradient-to-b from-gray-900 to-black text-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              {t("about.visit.title")}
            </h2>
            <div className="h-1 w-16 bg-cinema-red mx-auto mb-8"></div>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              {t("about.visit.description")}
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row items-start gap-12">
            <div className="md:w-1/2">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                {/* Location */}
                <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cinema-red transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="bg-cinema-red rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{t("about.visit.address.title")}</h3>
                  </div>
                  <p className="text-gray-300 ml-14">{t("about.visit.address.description")}</p>
                </div>
                
                {/* Phone */}
                <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cinema-red transition-colors">
                  <div className="flex items-center mb-4">
                    <div className="bg-cinema-red rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{t("about.visit.phone.title")}</h3>
                  </div>
                  <p className="text-gray-300 ml-14">{t("about.visit.phone.description")}</p>
                </div>
                
                {/* Hours */}
                <div className="p-6 bg-gray-800/50 rounded-xl border border-gray-700 hover:border-cinema-red transition-colors md:col-span-2">
                  <div className="flex items-center mb-4">
                    <div className="bg-cinema-red rounded-full p-3 mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold">{t("about.visit.hours.title")}</h3>
                  </div>
                  <p className="text-gray-300 ml-14">{t("about.visit.hours.description")}</p>
                </div>
              </div>
              
              <div className="text-center md:text-left">
                <Link 
                  to="/movies" 
                  className="inline-block px-10 py-4 bg-cinema-red hover:bg-cinema-red-dark text-white font-bold rounded-lg transition-all transform hover:scale-105 shadow-lg"
                >
                  <span className="flex items-center">
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"></path>
                    </svg>
                    {t("about.visit.showtimes")}
                  </span>
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2">
              <div className="relative rounded-xl overflow-hidden shadow-2xl h-80 md:h-96">
                {/* Map element */}
                <img 
                  src="https://images.unsplash.com/photo-1524512099866-c65c6bfb2617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                  alt="Map location" 
                  className="w-full h-full object-cover"
                />
                
                {/* Map pin */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-cinema-red rounded-full w-8 h-8 flex items-center justify-center animate-pulse">
                  <div className="bg-white rounded-full w-4 h-4"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="py-20 bg-cinema-red text-white">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">{t("about.cta.title")}</h2>
          <p className="text-xl mb-10 max-w-3xl mx-auto">
            {t("about.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Link 
              to="/movies" 
              className="px-10 py-4 bg-white text-cinema-red-dark font-bold rounded-lg hover:bg-gray-100 transition-colors shadow-xl transform hover:-translate-y-1"
            >
              {t("about.cta.viewMovies")}
            </Link>
            <Link 
              to="/contact" 
              className="px-10 py-4 bg-transparent border-2 border-white text-white font-bold rounded-lg hover:bg-white/10 transition-all transform hover:-translate-y-1"
            >
              {t("about.cta.contactUs")}
            </Link>
          </div>
        </div>
        
        {/* Film strip decorative element */}
        <div className="w-full h-12 overflow-hidden mt-10">
          <div className="film-strip w-full h-8 flex">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="film-hole bg-white opacity-20"></div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
