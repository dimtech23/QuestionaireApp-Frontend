/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Add your custom color
        gray: {
          700: '#333333',
        },
      },
    },
  },
  plugins: [],
};
