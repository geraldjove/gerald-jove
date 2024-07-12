/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        monoton: ["Monoton", "sans-serif"],
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
      },
    },
  },
  plugins: [],
};
