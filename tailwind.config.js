/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0, transform: 'translateY(10px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      animation: {
        fadeIn: 'fadeIn 0.8s ease-out forwards',
      },
    },
      colors: {
        routraBg: '#F9FAFB',
        routraPanel: '#FFFFFF',
        routraText: '#1F2937',
        routraAccent: '#FCA5A5',
        routraAccentHover: '#F87171',
        routraBorder: '#E5E7EB',
      },
      backgroundImage: {
        'animated-gradient': 'linear-gradient(-45deg, #FCA5A5, #FCD34D, #A5F3FC, #C4B5FD)',
      },
      animation: {
        gradient: "gradientBG 8s ease infinite",
      },
      keyframes: {
        gradientBG: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}

