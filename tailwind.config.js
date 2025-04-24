/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        routraBg: '#0F0F0F',         // jet black
        routraPanel: '#1A1A2E',      // deep indigo
        routraAccent: '#915EFF',     // electric purple
        routraButton: '#38BDF8',     // sky blue
        routraText: '#F5F5F5',       // light text
      },
      borderRadius: {
        lg: '0.75rem',
        xl: '1rem',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
