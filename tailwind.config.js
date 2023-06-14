/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ], darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        fancy: ['Original Surfer']
      }
    },

  },
  plugins: [require("daisyui")],
}

