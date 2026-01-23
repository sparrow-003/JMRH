
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setup } from 'twind';
import * as colors from 'twind/colors';

// Initialize Twind with the "Ivory Scholar: Prestige Edition" Palette
setup({
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#1A1A1A', // Deep Charcoal (Ink)
        bg: '#FDFBF7',      // Warm Ivory (Paper)
        accent: '#B08D57',  // Antique Gold
        paper: '#FFFFFF',
        slate: {
          50: '#F8F9FA',
          100: '#E9ECEF',
          400: '#94A3B8',
          700: '#334155',
          900: '#1A1A1A',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Playfair Display', 'serif'],
      },
      letterSpacing: {
        'tightest': '-0.05em',
        'superwide': '0.5em',
      }
    },
  },
});

import 'twind/shim';

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
