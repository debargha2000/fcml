/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#3E2723', // Walnut
        accent: '#B8860B',  // Brass
        background: '#FAF7F2', // Linen
        dark: '#1C1410',    // Ebony
      },
      fontFamily: {
        heading: ['Cormorant Garamond', 'serif'],
        body: ['Montserrat', 'sans-serif'],
        drama: ['Bodoni Moda', 'serif'],
        detail: ['Space Grotesk', 'sans-serif'],
      },
      borderRadius: {
        'premium': '2rem',
      },
      animation: {
        'sheen': 'sheen 3s infinite',
      },
      keyframes: {
        sheen: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        }
      }
    },
  },
  plugins: [],
}
