/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./dist/*.html",
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx, html}",
  ],
  theme: {
    extend: {
      colors: {
        "text-bold": "rgba(255, 255, 255, 0.87)",
        "text-regular": "rgba(255, 255, 255, 0.6)",
        "color-red": "rgba(252, 54, 57, 0.6)",
        "color-blue": "rgb(1, 132, 207)",
        "bg-black": "rgba(0, 0, 0, 0.7)",
        "bg-gray": "rgba(255, 255, 255, 0.1)",
        "bg-light-gray": "rgba(255, 255, 255, 0.08)",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
      },
    },
  },
  plugins: [],
};
