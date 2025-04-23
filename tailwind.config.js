/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}", // Scan all components for classes
  ],
  theme: {
    extend: {
      colors: {
        routraPurple: '#6D28D9', // soft purple
        routraGray: '#1F1F1F',   // dark base
        routraCard: '#2A2A2A',   // card background
      },
    },
  },
  plugins: [], // ← required even if empty
}