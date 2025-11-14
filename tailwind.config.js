module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}", 
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#FF6B00',  // Laranja
          dark: '#FF8C00'
        },
        secondary: {
          DEFAULT: '#000000',  // Preto
          light: '#333333'
        },
        tertiary: {
          DEFAULT: '#808080',  // Cinza
          light: '#A9A9A9'
        }
      }
    }
  },
  plugins: []
}
