/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          green: "#0EA676", // official accent
          light: "#E8F9F1",
          white: "#FFFFFF",
          gray: "#F6F7F8",
        },
      },
    },
  },
  plugins: [],
}
