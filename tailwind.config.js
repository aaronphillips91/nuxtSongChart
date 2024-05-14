/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        c: {
          primary: '#827AF0',
          secondary: '#1A373D',
          accent: '#7BAE68',
          dark: {
            1: '#0B0B14',
            2: '#1E1E25',
          },
          red: '#EF4444',
          amber: '#CA8A04',
          blue: '#3B82F6',
          pink: '#EC4899',
          teal: '#14B8A6',
          lime: '#84CC16',
        }
      }
    },
  },
  plugins: [],
};
