/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#2d5649", // Màu xanh chủ đạo của chúng ta
        dark: "#18191c",
      },
    },
  },
  plugins: [],
};
