import { nextui } from '@nextui-org/theme';

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {},
  },
  darkMode: 'class',
  darkMode: 'class',
  plugins: [
    require('tailwindcss-animated'),
    nextui({
      themes: {
        'orange-dark': {
          extend: 'dark',
          colors: {
            background: '#101010',
            foreground: '#d4d4d8',
            primary: {
              50: '#fff8eb',
              100: '#feeac7',
              200: '#fdd28a',
              300: '#fcbb4d',
              400: '#fbab24',
              500: '#f59e0b',
              600: '#d98b06',
              700: '#b47409',
              800: '#92610e',
              900: '#78510f',
              950: '#452c03',
              DEFAULT: '#f59e0b',
              foreground: '#fff',
            },
            danger: {
              DEFAULT: '#e11d48',
              foreground: '#fff',
            },
            focus: '#d98b06',
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
        'orange-light': {
          extend: 'light',
          colors: {
            background: '#fbf9f3',
            foreground: '#000',
            primary: {
              950: '#fff8eb',
              900: '#feeac7',
              800: '#fdd28a',
              700: '#fcbb4d',
              600: '#fbab24',
              500: '#f59e0b',
              400: '#d98b06',
              300: '#b47409',
              200: '#92610e',
              100: '#78510f',
              50: '#452c03',
              DEFAULT: '#f59e0b',
              foreground: '#fff',
            },
            danger: {
              DEFAULT: '#e11d48',
              foreground: '#fff',
            },
            focus: '#d98b06',
          },
          layout: {
            disabledOpacity: '0.3',
            radius: {
              small: '4px',
              medium: '6px',
              large: '8px',
            },
            borderWidth: {
              small: '1px',
              medium: '2px',
              large: '3px',
            },
          },
        },
      },
    }),
  ],
};
