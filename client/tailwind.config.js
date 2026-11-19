/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#123B5D',
          navy: '#123B5D',
          dark: '#0c273e'
        },
        secondary: {
          DEFAULT: '#247BA0',
          blue: '#247BA0',
          dark: '#1a5975'
        },
        medical: {
          teal: '#18A999',
          mint: '#E8F7F3',
          dark: '#128275'
        },
        canvas: {
          bg: '#F5F8FC',
          card: '#FFFFFF'
        },
        content: {
          dark: '#172B3A',
          secondary: '#718096'
        },
        status: {
          success: '#16A34A',
          warning: '#F59E0B',
          danger: '#DC2626'
        }
      },
      fontFamily: {
        sans: ['Inter', 'Manrope', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
