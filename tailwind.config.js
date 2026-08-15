/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: "#081824",
        teal: "#0E3442",
        green: "#18A94A",
        sand: "#C9A37B",
        cream: "#E6D1BA",
        purple: "#7B4B9E",
      },  
    },
  },
  plugins: [],
}