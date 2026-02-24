/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0fbd49',
        'primary-dark': '#0A2E18',
        'gold-accent': '#D4AF37',
        'accent-gold': '#C5A065',
        'background-light': '#f8fcf9',
        'background-dark': '#051109',
        'surface-light': '#ffffff',
        'surface-dark': '#0d2115',
        'forest-dark': '#0d1b12',
        'forest-light': '#1a3322',
        'luxury-green': '#1a3c2e',
        'muted-gold': '#c5b358',
        secondary: '#102216',
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
        body: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.25rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
};
