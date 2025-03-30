/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class', // Enable class-based dark mode
  theme: {
    extend: {
      colors: {
        // Primary red colors
        'cinema-red': {
          DEFAULT: '#e53e3e',
          dark: '#c53030',
          light: '#fed7d7',
          // New dark mode specific shades
          'dark': '#b91c1c',
          'light-dark': '#f87171',  // Brighter red for dark mode
        },
        // Contrast colors
        'cinema-black': '#2d3748',
        // Orange accents
        'cinema-orange': {
          DEFAULT: '#ff8c42', // warm orange
          light: '#ffae63', // soft peach
          dark: '#e67e22', // darker orange for dark mode
        },
        // Neutral tones
        'cinema-gray': {
          DEFAULT: '#718096',
          'dark': '#4B5563', // darker gray for dark mode
        },
        // Dark mode specific colors
        'dark-bg-primary': '#0f172a', // Darker background
        'dark-bg-secondary': '#1e293b', // Slightly lighter for card backgrounds
        'dark-text-primary': '#f8fafc', // Almost white
        'dark-text-secondary': '#cbd5e0', // Light gray
        // Dark mode surface colors
        'dark-surface': {
          primary: '#1f2937',   // Primary surface color
          secondary: '#374151', // Secondary surface color
          accent: '#4B5563',    // Accent surface color
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      },
      boxShadow: {
        'dark-lg': '0 10px 15px -3px rgba(0, 0, 0, 0.7), 0 4px 6px -2px rgba(0, 0, 0, 0.6)'
      }
    },
  },
  plugins: [],
}
