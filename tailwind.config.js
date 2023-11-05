/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "lightskyblue-sunsu": "#A7CFFF",
        "skyblue-sunsu": "#4299EC",
        "blue-sunsu": "#0073C2",
        "lightgray-sunsu": "#D9D9D9",
        "gray-sunsu": "#667788",
        "darkgray-sunsu": "#292D32",
        "red-sunsu": "#EC6A5E",
        "gradient-from-sunsu": "rgba(255, 255, 255, 0.0)",
        "gradient-to-sunsu": "rgba(0, 0, 0, 0.67)",
      },
    },
    screens: {
      sm: { max: "576px" },
      // => @media (max-width: 576px) { ... }
      xs: { max: "412px" },
      // => @media (max-width: 412px) { ... }
    },
  },
  plugins: [],
};
