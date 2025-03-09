/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ivory': '#F8F1E9',
        'charcoal': '#333333',
        'rose-gold': '#D4A5A5',
        'emerald': '#2E5A50',
        'taupe': '#B9A394',
      },
      fontFamily: {
        'display': ['Playfair Display', 'serif'], // For the elegant headings
        'sans': ['Inter', 'sans-serif'],          // For regular text
      },
    },
  },
  plugins: [],
}

