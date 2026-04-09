/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif'],
        helvetica: ['HelveticaNow', 'sans-serif'],
      },
      colors: {
        'glassgray' : '#A5A5A5',
      }
    },
  },
  plugins: [],
}