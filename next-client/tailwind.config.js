/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],

  theme: {
    screens: {
      xs: '200px',
      ss: '620px',
      sm: '768px',
      md: '1060px',
      lg: '1200px',
      xl: '1700px',
    },
    extend: {
      fontFamily: {
        openSans: ['Open Sans', ...defaultTheme.fontFamily.sans],
        montserrat: 'Montserrat',
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'opaque-red': 'rgba(212, 36, 40, 0.05)',
        'active-badge': 'rgba(39, 179, 16, 0.15)',
        submenu: 'rgba(3, 31, 66, 0.05)',
        'class-badge-bg': 'rgba(255, 225, 80, 0.05)',
      },
      boxShadow: {
        summaryBox: '0px 3.76594px 3.77px rgba(196, 196, 196, 0.25)',
        button: '0px 4px 14px rgba(0, 0, 0, 0.15)',
        navbar: '4px 0px 4px rgba(0, 0, 0, 0.05)',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
  },
  plugins: [require('tailwind-scrollbar')],
}
