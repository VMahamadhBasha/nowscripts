/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        now: {
          primary: '#00C08B',
          background: '#020617',
          card: '#111827',
          accent: '#14B8A6',
          text: '#f8fafc',
          muted: '#64748b'
        }
      }
    },
  },
  plugins: [],
}
