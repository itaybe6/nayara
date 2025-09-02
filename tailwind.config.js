/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primaryRose: '#F1C5D6',
        lavender: '#CBB8FF',
        ink: '#111827',
        mutedInk: '#6B7280',
        bg: '#FFFFFF',
        bgAlt: '#F8FAFC',
        success: '#10B981',
        warning: '#F59E0B',
        danger: '#EF4444',
      },
      fontFamily: {
        inter: ['Inter-Regular'],
        interBold: ['Inter-Bold'],
        assistant: ['Assistant-Regular'],
        assistantBold: ['Assistant-Bold'],
      },
      spacing: {
        '12': '12px',
        '16': '16px',
        '20': '20px',
        '24': '24px',
      },
    },
  },
  plugins: [],
};