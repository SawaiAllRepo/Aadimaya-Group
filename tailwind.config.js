/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50: "#f2f8ee",
          100: "#e3f0d9",
          500: "#5d9632",
          600: "#4d8128",
          700: "#3e6c21",
          900: "#0d2417"
        }
      }
    }
  },
  plugins: []
};