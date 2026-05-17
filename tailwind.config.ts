import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        gold: '#D4A24C',
        dark: '#0B0B0B',
        brown: '#2B1A10',
        coffee: '#4A2C1A',
        olive: '#3A3F1F',
        beige: '#E8DCC3',
        offwhite: '#F5F1E8',
      },
      backgroundColor: {
        gold: '#D4A24C',
      },
      textColor: {
        gold: '#D4A24C',
      },
      borderColor: {
        gold: '#D4A24C',
      },
    },
  },
  plugins: [],
}
export default config
