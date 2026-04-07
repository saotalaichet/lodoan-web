import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'hsl(0 75% 38%)',
          foreground: '#ffffff',
        },
        accent: {
          DEFAULT: 'hsl(25 90% 55%)',
        },
      },
    },
  },
  plugins: [],
};

export default config;