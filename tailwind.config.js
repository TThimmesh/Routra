/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class', // ← enables class-based dark mode
  theme: {
    extend: {
      fontFamily: {
        bebas: ['"Bebas Neue"', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
        gradient: 'gradientBG 8s ease infinite',
      },
      colors: {
        routraBg: '#F9FAFB',
        routraPanel: '#FFFFFF',
        routraText: '#1F2937',
        routraAccent: '#FCA5A5',
        routraAccentHover: '#F87171',
        routraBorder: '#E5E7EB',
        darkBg: '#0d0d0d', // optional dark background
        darkPanel: '#1a1a1a', // optional dark panels
        darkText: '#e5e5e5', // optional text
      },
      backgroundImage: {
        'animated-gradient': 'linear-gradient(-45deg, #FCA5A5, #FCD34D, #A5F3FC, #C4B5FD)',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
};
