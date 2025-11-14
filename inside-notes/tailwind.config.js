/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',
          dark: '#FF8C00'
        },
        secondary: {
          DEFAULT: '#000000',
          light: '#333333'
        },
        tertiary: {
          DEFAULT: '#808080',
          light: '#A9A9A9'
        }
      }
    }
  },
  plugins: []
}
