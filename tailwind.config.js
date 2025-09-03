/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f3f0ff',
          100: '#e8e0ff',
          500: '#5B3FF9',
          600: '#4f35e8',
          700: '#3d2bc4',
        },
        secondary: {
          500: '#7C3AED',
          600: '#6d28d9',
        },
        accent: {
          500: '#F59E0B',
          600: '#d97706',
        },
        success: {
          500: '#10B981',
          600: '#059669',
        },
        warning: {
          500: '#F59E0B',
          600: '#d97706',
        },
        error: {
          500: '#EF4444',
          600: '#dc2626',
        },
        info: {
          500: '#3B82F6',
          600: '#2563eb',
        }
      },
      fontFamily: {
        'display': ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        'body': ['Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 8px rgba(0, 0, 0, 0.1)',
        'card-hover': '0 8px 16px rgba(0, 0, 0, 0.15)',
      }
    },
  },
  plugins: [],
}