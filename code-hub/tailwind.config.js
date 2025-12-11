
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts,scss,css}"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#c8102e',
        'primary-dark': '#a20e25',
        'background-light': '#f5f5f5',
        'background-dark': '#1A1A1A',
        'card-light': '#ffffff',
        'card-dark': '#2a2a2a',
        'text-light-primary': '#1A1A1A',
        'text-dark-primary': '#ffffff',
        'text-light-secondary': '#333333',
        'text-dark-secondary': '#C4C4C4',
        'border-light': '#e0e0e0',
        'border-dark': '#444444',
        success: '#07885b',
        danger: '#e75608'
      },
      fontFamily: {
        display: ['Manrope', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}
