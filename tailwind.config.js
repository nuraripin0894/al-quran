/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        uthman: ["uthman", "uthman-taha"],
        uthmanBold: ["uthman-bold"],
        uthmanScript: ["uthman-script"],
        nazanin: ["nazanin"],
      },
    },
  },
  plugins: [],
};
