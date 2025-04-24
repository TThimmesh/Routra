module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        routraBg: '#F9FAFB',           // light background
        routraPanel: '#FFFFFF',        // white panels
        routraText: '#1F2937',         // slate gray text
        routraAccent: '#FCA5A5',       // pastel red
        routraAccentHover: '#F87171',  // hover red
        routraBorder: '#E5E7EB',       // soft border
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
