/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.html", "./*.js"],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat']
      },
      height: {
        '280': '280px'
      }
    }
  },
  plugins: []
};
