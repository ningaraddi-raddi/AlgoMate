/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [ "./src/**/*.{js,jsx,ts,tsx}", 
    "./public/index.html"  ],
  theme: {
    extend: {},
  },
  plugins: [],

   theme: {
    extend: {
      keyframes: {
        'stack-enter': {
          '0%': { transform: 'scale(0.8)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        'stack-leave': {
          '0%': { transform: 'scale(1)', opacity: '1' },
          '100%': { transform: 'scale(0.8)', opacity: '0' },
        },
      },
      animation: {
        'stack-enter': 'stack-enter 0.3s forwards',
        'stack-leave': 'stack-leave 0.3s forwards',
      },
    },
  },
}

