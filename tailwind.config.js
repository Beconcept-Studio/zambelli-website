/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './app/**/*.{vue,js,ts}',
  ],
  theme: {
    extend: {
      fontFamily: {
        helvetica: ['HelveticaNow', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        martian: ['Martian Mono', 'monospace'],
      },
      colors: {
        'glassgray' : '#A5A5A5',
      }
    },
  },
  plugins: [],
}