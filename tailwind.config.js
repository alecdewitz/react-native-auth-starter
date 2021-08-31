const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Poppins', ...defaultTheme.fontFamily.sans],
      },
      animation: {
        pings: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        wiggle: 'wiggle 2s ease-in-out infinite',
        wave: 'wave 5s infinite',
        scale: 'scale 1.7s infinite',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-5deg)' },
          '50%': { transform: 'rotate(5deg)' },
        },
        scale: {
          '0%, 100%': { transform: 'scale(1.3)' },
          '50%': { transform: 'scale(1.2)' },
        },
        wave: {
          '0%': { transform: 'rotate(0.0deg)' },
          '10%': { transform: 'rotate(14.0deg)' },
          '20%': { transform: 'rotate(-8.0deg)' },
          '30%': { transform: 'rotate(14.0deg)' },
          '40%': { transform: 'rotate(-4.0deg)' },
          '50%': { transform: 'rotate(10.0deg)' },
          '60%': { transform: 'rotate(0.0deg)' },
          '70%': { transform: 'rotate(0.0deg)' },
          '80%': { transform: 'rotate(0.0deg)' },
          '90%': { transform: 'rotate(0.0deg)' },
          '100%': { transform: 'rotate(0.0deg)' },
        },
      },
      spacing: {
        200: '50rem',
      },
      colors: {
        good: '#00BA88',
        warning: '#064979',
        unknown: '#424E57',
        messageOwn: '#218aff',
      },
      fontSize: {
        xxs: '0.65rem',
      },
      maxWidth: {
        '3/4': '75%',
      },
    },
  },
  variants: {
    animation: ['motion-safe', 'motion-reduce'],
    extend: {
      opacity: ['active', 'disabled'],
      borderStyle: ['hover'],
    },
  },
  plugins: [],
};
