/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    extend: {
      colors: {
        'ios': {
          'primary': '#007AFF',
          'secondary': '#5856D6',
          'success': '#34C759',
          'warning': '#FF9500',
          'danger': '#FF3B30',
          'gray': {
            50: '#F5F5F5',
            100: '#EBEBEB',
            200: '#D6D6D6',
            300: '#C2C2C2',
            400: '#ADADAD',
            500: '#999999',
            600: '#858585',
            700: '#707070',
            800: '#5C5C5C',
            900: '#474747',
          },
          'background': '#F2F2F7',
          'groupedBackground': '#FFFFFF',
          'separator': '#C6C6C8',
        }
      },
      borderRadius: {
        'ios': '10px',
        'ios-lg': '14px',
        'ios-xl': '18px',
      },
    },
  },
  plugins: [],
}