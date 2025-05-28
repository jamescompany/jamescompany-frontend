
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "rgb(var(--primary) / <alpha-value>)",
        secondary: "rgb(var(--secondary) / <alpha-value>)",
        accent: "rgb(var(--accent) / <alpha-value>)",
      },
      animation: {
        'fade-in': 'fadeIn 0.2s ease-out, slideIn 0.3s ease-out',
        'fade-out': 'fadeOut 0.2s ease-out, slideOut 0.3s ease-out',
      }
    },
  },
  plugins: [],
};