/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'nodefy-blue': '#0047FF',
        'teal': '#0D7377',
        'coral': '#E8654A',
      },
    },
  },
  plugins: [],
}
