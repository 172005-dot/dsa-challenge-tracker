/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkBg: '#08090c',
        darkCard: '#10121b',
        darkBorder: '#1e2230',
        brandPurple: '#8b5cf6',
        brandPink: '#ec4899',
        brandBlue: '#3b82f6',
        brandCyan: '#06b6d4',
      },
      fontFamily: {
        sans: ['Inter', 'Outfit', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
