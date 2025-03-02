import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        // Primary Colors
        primary: {
          DEFAULT: '#354534',
          light: '#5A7059',
          dark: '#1C2B1C',
        },

        // Secondary Colors
        secondary: {
          DEFAULT: '#E9E9E2',
          dark: '#D0D0C5',
          light: '#F5F5F0',
        },

        // Accent Colors
        accent: {
          DEFAULT: '#AB9978',
          light: '#C5B79C',
          dark: '#8A7A5E',
        },

        // Functional Colors
        success: '#4A6D4A',
        error: '#963A2F',
        warning: '#D89E57',
        info: '#7C96AC',

        // Neutral Shades
        neutral: {
          50: '#F8F8F5',
          100: '#F0F0ED',
          200: '#E8E8E3',
          300: '#D7D7CF',
          400: '#BEBEB3',
          500: '#9E9E8E',
          600: '#7A7A6B',
          700: '#5A5A4E',
          800: '#3D3D34',
          900: '#21211D',
        },
      },
    },
  },
  plugins: [],
} satisfies Config;
