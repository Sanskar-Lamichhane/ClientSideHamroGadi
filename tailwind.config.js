/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7E33E0",
        "primary-light": "#EEEFFB",
        secondary: "#FB2E86",
        customBlue: "#D9E8FE",
        navColor: "#f9e9de",
      },
      screens: {
        gm: "200px",
        sm: "600px",
        md: "768px",
        lg: "992px",
        xl: "1200px",
        "2xl": "1400px",
      },
      backgroundImage: {
        "banner-2": "url('./src/assets/images/banner2.png')",
        backgroundVehicle: "url('./src/assets/images/jeep.jpg')",
      },
    },
  },
  plugins: [],
};
