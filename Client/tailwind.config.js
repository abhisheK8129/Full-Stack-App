/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"], // important for shadcn/ui dark mode
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
    "./components/**/*.{js,jsx}",
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
