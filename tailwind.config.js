/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        primary: {
          50: '#e6f2ff',
          100: '#cce4ff',
          200: '#99caff',
          300: '#66afff',
          400: '#3395ff',
          500: '#0077ED', // Primary color
          600: '#0061cc',
          700: '#004799',
          800: '#002e66',
          900: '#001733',
        },
        secondary: {
          50: '#e9f9ef',
          100: '#d3f3df',
          200: '#a7e7bf',
          300: '#7bdb9f',
          400: '#4fcf7f',
          500: '#34C759', // Secondary color
          600: '#2ba94b',
          700: '#207f38',
          800: '#165426',
          900: '#0b2a13',
        },
        accent: {
          50: '#fff8e6',
          100: '#fff1cc',
          200: '#ffe499',
          300: '#ffd666',
          400: '#ffc833',
          500: '#FF9500', // Accent color
          600: '#cc7a00',
          700: '#995c00',
          800: '#663d00',
          900: '#331f00',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      boxShadow: {
        glass: '0 4px 30px rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};