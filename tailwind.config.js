// tailwind.config.js

module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      animation: {
        orbit: 'orbit var(--duration) linear infinite',
        'reverse-orbit': 'reverse-orbit var(--duration) linear infinite',
        'counter-orbit': 'counter-orbit var(--duration) linear infinite',
        gradient: 'gradient 15s ease infinite',
      },
      keyframes: {
        orbit: {
          '0%': {
            transform: 'rotate(0deg) translateY(var(--radius)) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(360deg) translateY(var(--radius)) rotate(0deg)',
          },
        },
        'reverse-orbit': {
          '0%': {
            transform: 'rotate(0deg) translateY(var(--radius)) rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(-360deg) translateY(var(--radius)) rotate(0deg)',
          },
        },
        'counter-orbit': {
          '0%': {
            transform: 'rotate(0deg)',
          },
          '100%': {
            transform: 'rotate(-360deg)',
          },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      backgroundImage: {
        'custom-gradient': 'linear-gradient(to right, #932c3f, #8e2848, #882550, #7f2559, #752760, #6f2866, #672b6c, #5e2d72, #572f7a, #4d3182, #3f358b, #293893, #132125)',
      },
    },
  },
  plugins: [],
};
