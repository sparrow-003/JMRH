
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setup } from 'twind';
import * as colors from 'twind/colors';

// Initialize Twind with the "Version 3: Academic Luxury" Palette
setup({
  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#2C2C2C', // Deep Charcoal
        secondary: '#334155', // Muted Navy
        bg: '#FAF9F6',      // Warm Ivory
        accent: '#C5A065',  // Subtle Gold
        paper: '#FFFFFF',
        slate: {
          50: '#F8F9FA',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Outfit', 'sans-serif'],
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
