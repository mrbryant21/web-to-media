/**
 * Tailwind v4 uses @theme tokens in CSS for design primitives.
 * Keep config minimal; plugins/safelist can go here if needed.
 */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Quicksand', 'system-ui', 'sans-serif'],
        display: ['"Playfair Display"', 'serif'],
      },
    },
  },
  plugins: [],
};
