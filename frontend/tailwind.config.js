/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: {
        'auth': "url('/src/assets/images/background.jpg')",
      }
    },
  },
  plugins: [],
}