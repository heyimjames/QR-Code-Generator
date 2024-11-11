/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ios': {
          'primary': '#007AFF', // iOS blue
          'secondary': '#5856D6', // iOS purple
          'success': '#34C759', // iOS green
          'warning': '#FF9500', // iOS orange
          'danger': '#FF3B30', // iOS red
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
          'background': '#F2F2F7', // iOS light gray background
          'groupedBackground': '#FFFFFF', // iOS grouped table view background
          'separator': '#C6C6C8', // iOS separator color
        }
      },
      borderRadius: {
        'ios': '10px', // iOS standard corner radius
        'ios-lg': '14px', // iOS large corner radius
        'ios-xl': '18px', // iOS extra large corner radius
      },
    },
  },
  plugins: [],
}