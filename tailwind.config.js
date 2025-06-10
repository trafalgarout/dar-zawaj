/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#04E762',   // Green
        accent: '#F5B700',    // Yellow
        info: '#00A1E4',      // Blue
        secondary: '#DC0073', // Pink
      },
      fontFamily: {
        arabic: ['Cairo', 'Amiri', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
