/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./*.html",
    "./assets/js/**/*.js"
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          purple: '#3D1A5B',
          dark: '#230C36',
          deep: '#180626',
          light: '#F6F1FB',
          accent: '#522579'
        },
        gold: {
          DEFAULT: '#D4AF37',
          light: '#F8E9BA',
          dark: '#B8861B',
          warm: '#C59B27'
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: [],
}
