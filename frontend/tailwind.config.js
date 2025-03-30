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
        'cinema-red': '#e53e3e',
        'cinema-red-dark': '#c53030',
        'cinema-red-light': '#fed7d7',
        // Contrast colors
        'cinema-black': '#2d3748',
        // Orange accents
        'cinema-orange': {
          DEFAULT: '#ff8c42', // warm orange
          light: '#ffae63', // soft peach
        },
        // Neutral tones
        'cinema-gray': '#718096',
        // Dark mode specific colors
        'dark-bg-primary': '#121212',
        'dark-bg-secondary': '#1e1e1e',
        'dark-text-primary': '#f7fafc',
        'dark-text-secondary': '#cbd5e0',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    },
  },
  plugins: [],
}
