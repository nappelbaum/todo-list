/** @type {import('tailwindcss').Config} */
// const defaultTheme = require('tailwindcss/defaultTheme')

import defaultTheme from 'tailwindcss/defaultTheme'

export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        body: ['Montserrat']
      }
    },
    screens: {
      xs: '400px',
      ...defaultTheme.screens
    }
  },
  plugins: ['@tailwindcss/forms']
}
