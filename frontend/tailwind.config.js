/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Primary red colors
        'cinema-red': {
          light: '#fc9c9c', // light red
          DEFAULT: '#fc6464', // medium red
          dark: '#fc1c1c', // deep red
        },
        // Contrast colors
        'cinema-black': '#1c1c1c',
        // Orange accents
        'cinema-orange': {
          DEFAULT: '#ff8c42', // warm orange
          light: '#ffae63', // soft peach
        },
        // Neutral tones
        'cinema-gray': {
          light: '#e0e0e0',
          DEFAULT: '#b0b0b0',
        }
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
