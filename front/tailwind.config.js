/** @type {import('tailwindcss').Config} */
import keepPreset from "keep-react/preset";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/keep-react/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [keepPreset],
  theme: {

    extend: {

      colors: {
        primario: 'var(--primary-color)',
        secundario: 'var(--secondary-color)',
        bordeInput: '#E4E4E4',
        terceario: '#0079E9',
        textTabla : '#272626'
      },

      fontFamily: {
        montserrat:['Montserrat'],
      },





    },
  },
  plugins: [],
}

