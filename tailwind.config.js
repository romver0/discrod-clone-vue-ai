/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        discord: {
          gray: {
            100: '#36393f',
            200: '#2f3136',
            300: '#202225',
          }
        }
      }
    },
  },
  plugins: [],
}