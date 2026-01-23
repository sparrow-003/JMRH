
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setup } from 'twind';
import * as colors from 'twind/colors';

// Initialize Twind with the "Version 2: Scholarly Navy & Amber" Palette
setup({
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#0F172A', // Deep Navy (Slate 950)
        bg: '#F8FAFC',      // Crisp Slate (Slate 50)
        accent: '#B45309',  // Academic Amber (Amber 700)
        paper: '#FFFFFF',
        slate: {
          50: '#F8F9FA',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
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
