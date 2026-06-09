/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Space Grotesk", "sans-serif"],
        display: ["Archivo", "sans-serif"],
      },
      colors: {
        ink: {
          DEFAULT: "#0b1120",
          950: "#0b1120",
          900: "#0f172a",
          800: "#1e293b",
          700: "#334155",
        },
        accent: {
          DEFAULT: "#009efa",
          light: "#4abdff",
          dark: "#0072c6",
        },
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
      },
      backgroundImage: {
        "cgi-Mouse":
          "url('https://cdna.artstation.com/p/assets/images/images/055/823/870/large/gerald-jove-color1.jpg?1667838826')",
        "cgi-Phasmo1":
          "url('https://cdnb.artstation.com/p/assets/images/images/049/233/301/large/gerald-jove-0012.jpg?1652023091')",
        "cgi-Demons":
          'url("https://cdna.artstation.com/p/assets/images/images/063/660/922/large/gerald-jove-photo-2.jpg?1686063435")',
        "cgi-Massager":
          'url("https://cdnb.artstation.com/p/assets/images/images/056/627/037/large/gerald-jove-product-1.jpg?1669727403")',
        "programming-Forex":
          'url("https://geraldjove.github.io/website-developer-portfolio/static/media/forex.66055487fe27f6a27c47.JPG");',
        "programming-Ecommerce": "url('../assets//img/prime-sneaks.png');",
      },
    },
  },
  plugins: [],
};
