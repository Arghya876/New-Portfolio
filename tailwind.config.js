/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          bg: '#030014',
          card: 'rgba(11, 7, 32, 0.7)',
          accent: '#1f1545',
          border: 'rgba(255, 255, 255, 0.08)',
        },
        cyber: {
          blue: '#00f0ff',
          purple: '#bd00ff',
          pink: '#ff0055',
          green: '#39ff14',
          yellow: '#ffe600',
        }
      },
      fontFamily: {
        sans: ['Space Grotesk', 'Inter', 'sans-serif'],
      },
      animation: {
        'glow-pulse': 'glowPulse 3s infinite alternate',
        'float': 'float 6s ease-in-out infinite',
        'spin-slow': 'spin 12s linear infinite',
      },
      keyframes: {
        glowPulse: {
          '0%': { boxShadow: '0 0 5px rgba(189, 0, 255, 0.2)' },
          '100%': { boxShadow: '0 0 25px rgba(189, 0, 255, 0.7)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-15px)' },
        }
      }
    },
  },
  plugins: [],
}
