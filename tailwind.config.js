/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{ts,tsx,js,jsx}','./index.html'],
  theme: {
    extend: {
      colors: {
        academic: {
          50: '#f8fbff',
          100: '#e6f0fb',
          200: '#cbdff4',
          300: '#a6c5ea',
          400: '#83a9e0',
          500: '#5d88c9',
          600: '#3d6b9e',
          700: '#284f82',
          800: '#214066',
          900: '#1b2a4f',
        },
        gold: {
          50: '#fffaf0',
          100: '#fff0d2',
          200: '#fbd89a',
          300: '#f2c15f',
          400: '#e5a21e',
          500: '#c48b00',
          600: '#a07a00',
          700: '#865b00',
          800: '#6b4800',
          900: '#3f2b00',
        },
        ivory: {
          50: '#fffef9',
          100: '#fff9e6',
          200: '#fff0cc',
          300: '#ffe8b3',
          400: '#ffd98a',
          500: '#f5d08a',
          600: '#d6b26b',
          700: '#a98a2f',
          800: '#8a6a1f',
          900: '#5b4a14',
        },
      },
    },
  },
  plugins: [],
}
// Updated for git commit
