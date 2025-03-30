import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const About = () => {
  const { t } = useLanguage();

  // Replace hardcoded team data with placeholder from translations.
  const translatedTeam = t("about.team.members");
  const teamMembers = Array.isArray(translatedTeam)
    ? translatedTeam
    : [
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

  // Add FAQ placeholder using translations. If not available, fallback to hardcoded FAQs.
  const translatedFaqs = t("about.faq.items");
  const faqs = Array.isArray(translatedFaqs)
    ? translatedFaqs
    : [
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

  // Inline fallback for timeline milestones instead of importing from AboutUs.js
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

  return (
    <div className="about-page pb-12">
      {/* Hero Section */}
      <section className="relative">
        <div className="h-96 overflow-hidden">
          <img 
            src="https://images.unsplash.com/photo-1595769816263-9b910be24d5f?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1479&q=80" 
            alt="Cinema auditorium"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-60" />
        </div>
        <div className="absolute inset-0 flex items-center justify-center text-center">
          <div className="px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">{t("about.hero.title")}</h1>
            <p className="text-xl text-white max-w-3xl mx-auto">{t("about.hero.subtitle")}</p>
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="md:w-1/2">
              <h2 className="text-3xl font-bold mb-6 text-cinema-black dark:text-white">{t("about.story.title")}</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.story.p1")}</p>
              <p className="text-gray-600 dark:text-gray-300 mb-4">{t("about.story.p2")}</p>
              <p className="text-gray-600 dark:text-gray-300">{t("about.story.p3")}</p>
            </div>
            <div className="md:w-1/2">
              <div className="relative">
                <img 
                  src="https://images.unsplash.com/photo-1460881680858-30d872d5b530?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1171&q=80" 
                  alt="Historic cinema" 
                  className="rounded-lg shadow-xl w-full"
                />
                <div className="absolute -bottom-4 -right-4 bg-cinema-red text-white p-4 rounded shadow-lg">
                  <p className="font-bold text-xl">{t("about.story.years")}</p>
                  <p>{t("about.story.excellence")}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-cinema-black dark:text-white">
            {t("about.timeline.title")}
          </h2>
          
          <div className="relative">
            {/* Vertical line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-cinema-red"></div>
            
            <div className="space-y-16">
              {Object.keys(timelineMilestones)
                .sort((a, b) => a - b)
                .map((year, index) => {
                  const milestone = timelineMilestones[year];
                  return (
                    <div 
                      key={year} 
                      className={`flex flex-col md:flex-row items-center ${index % 2 === 0 ? 'md:flex-row-reverse' : ''}`}
                    >
                      {/* Timeline dot */}
                      <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 rounded-full bg-cinema-red border-4 border-white dark:border-gray-900"></div>
                      
                      {/* Content */}
                      <div className="md:w-1/2 p-4">
                        <div className={`bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md ${index % 2 === 0 ? 'md:mr-8' : 'md:ml-8'}`}>
                          <div className="inline-block px-4 py-2 bg-cinema-red-light text-cinema-red-dark rounded-full font-bold mb-4">
                            {year}
                          </div>
                          <h3 className="text-xl font-bold mb-2 dark:text-white">{milestone.title}</h3>
                          <p className="text-gray-600 dark:text-gray-300">{milestone.description}</p>
                        </div>
                      </div>
                      
                      {/* Spacer */}
                      <div className="md:w-1/2"></div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      </section>

      {/* Our Team Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-cinema-black dark:text-white">{t("about.team.title")}</h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={member.image} 
                    alt={member.name} 
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="font-bold text-xl mb-1 dark:text-white">{member.name}</h3>
                  <p className="text-cinema-red font-medium mb-3">{member.role}</p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Facilities */}
      <section className="py-16 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-cinema-black dark:text-white">{t("about.facilities.title")}</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-cinema-red">🎬</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{t("about.facilities.auditoriums.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("about.facilities.auditoriums.description")}
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-cinema-red">🍽️</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{t("about.facilities.concessions.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("about.facilities.concessions.description")}
              </p>
            </div>
            
            <div className="bg-white dark:bg-dark-bg-secondary p-6 rounded-lg shadow-md">
              <div className="text-4xl mb-4 text-cinema-red">🎮</div>
              <h3 className="text-xl font-bold mb-3 dark:text-white">{t("about.facilities.lounge.title")}</h3>
              <p className="text-gray-600 dark:text-gray-300">
                {t("about.facilities.lounge.description")}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-white dark:bg-dark-bg-secondary transition-colors duration-300">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12 text-cinema-black dark:text-white">{t("about.faq.title")}</h2>
          
          <div className="max-w-3xl mx-auto space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-sm">
                <h3 className="font-bold text-lg mb-2 text-cinema-black dark:text-white">{faq.question}</h3>
                <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-10">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              {t("about.faq.moreQuestions")}
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center bg-cinema-red hover:bg-cinema-red-dark text-white font-bold py-3 px-6 rounded-lg transition duration-300"
            >
              {t("about.faq.contactUs")}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className="h-5 w-5 ml-2" 
                viewBox="0 0 20 20" 
                fill="currentColor"
              >
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Visit Us Section */}
      <section className="py-16 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center">
            <div className="md:w-1/2 mb-8 md:mb-0">
              <h2 className="text-3xl font-bold mb-6">{t("about.visit.title")}</h2>
              <p className="mb-6 text-gray-300">
                {t("about.visit.description")}
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-cinema-red mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                  <div>
                    <p className="font-bold">{t("about.visit.address.title")}</p>
                    <p className="text-gray-300">{t("about.visit.address.description")}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-cinema-red mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                  <div>
                    <p className="font-bold">{t("about.visit.phone.title")}</p>
                    <p className="text-gray-300">{t("about.visit.phone.description")}</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <svg className="w-6 h-6 text-cinema-red mr-3 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                  </svg>
                  <div>
                    <p className="font-bold">{t("about.visit.hours.title")}</p>
                    <p className="text-gray-300">{t("about.visit.hours.description")}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <Link 
                  to="/movies" 
                  className="inline-block bg-cinema-red hover:bg-cinema-red-dark text-white font-bold py-3 px-8 rounded-lg transition duration-300"
                >
                  {t("about.visit.showtimes")}
                </Link>
              </div>
            </div>
            
            <div className="md:w-1/2 md:pl-8">
              {/* You can replace this with an actual Google Maps embed */}
              <div className="bg-gray-800 p-4 rounded-lg shadow-lg overflow-hidden h-80">
                <img 
                  src="https://images.unsplash.com/photo-1524512099866-c65c6bfb2617?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80" 
                  alt="Map location" 
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-12 bg-cinema-red text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">{t("about.cta.title")}</h2>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            {t("about.cta.description")}
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link 
              to="/movies" 
              className="bg-white text-cinema-red hover:bg-gray-100 font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              {t("about.cta.viewMovies")}
            </Link>
            <Link 
              to="/contact" 
              className="bg-transparent border-2 border-white text-white hover:bg-white hover:text-cinema-red font-bold py-3 px-8 rounded-lg transition duration-300"
            >
              {t("about.cta.contactUs")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
