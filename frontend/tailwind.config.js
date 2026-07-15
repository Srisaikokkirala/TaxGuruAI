/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#070a13', // Deep slate navy
          900: '#0f172a', // Slate 900
          850: '#1e293b', // Slate 800
          800: '#334155', // Slate 700
          700: '#475569', // Slate 600
        },
        accent: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
        },
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(59, 130, 246, 0.12), 0 12px 40px rgba(0, 0, 0, 0.25)',
      },
      backgroundImage: {
        'hero-grid':
          'radial-gradient(circle at top, rgba(37,99,235,0.12), transparent 45%), linear-gradient(180deg, #070a13 0%, #0f172a 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
