/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        zen: ['"Zen Kaku Gothic New"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
