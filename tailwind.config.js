/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/pages/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'zen-bg': '#F7FAF8',
        'zen-bg-alt': '#F0FDF4', // Lighter green for alternative backgrounds
        'zen-card-bg': '#FDFDFD',
        'zen-green-dark': '#14532D', // Darker green for primary text
        'zen-green-progress': '#86EFAC',
        'zen-text-primary': '#1F2937',
        'zen-text-secondary': '#6B7280',
        'zen-nav-active': '#10B981', // Active nav link color
        'zen-nav-inactive': '#6B7280',
        'zen-accent': '#A7F3D0', // Light green accent
        'zen-accent-bg': '#ECFDF5', // Very light green accent background
        'zen-button': '#10B981', // Primary button color (Emerald 500)
        'zen-button-hover': '#059669', // Darker green for hover (Emerald 600)
        'zen-warning': '#FBBF24', // Yellow for budget warning
        'zen-danger': '#F87171', // Red for budget overage
      },
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
      },
      borderRadius: {
        'xl': '1rem',
        '2xl': '1.5rem',
      }
    }
  },
  plugins: [],
};
