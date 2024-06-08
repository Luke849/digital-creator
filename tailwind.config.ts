import type { Config } from "tailwindcss"

const config = {
  darkMode: ["class"],
  content: [
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './app/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        'primary-blue': '#0047FF',
      },
      dropShadow: {
        "sm-primary": "0 0 2px #0047FF",
        "md-primary": "0 0 4px #0047FF",
      },
      boxShadow: {
        "md-white": '0 4px 6px -1px rgb(255 255 255 / 0.1), 0 2px 4px -2px rgb(255 255 255 / 0.1)',
        'inner-white': 'inset 0 2px 4px 0 rgb(255 255 255 / 0.05)',
      },
      keyframes: {
        "fadeIn": {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        "fadeOut": {
          '0%': { opacity: '1' },
          '100%': { opacity: '0' },
        },
        "slideInFromTop": {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        "slideInFromBottom": {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "fadeIn": 'fadeIn 1s ease-in-out',
        "fadeOut": 'fadeOut 300ms ease-in-out',
        "slideInFromTop": 'slideInFromTop 1s ease-in-out',
        "slideInFromBottom": 'slideInFromBottom 1s ease-in-out',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config

export default config