
import React from 'react';
import './style.css';
import ReactDOM from 'react-dom/client';
import App from './App';
import { setup } from 'twind';
import * as colors from 'twind/colors';
import 'twind/shim';
import ErrorBoundary from './components/ErrorBoundary';

// Initialize Twind with the "Version 3: Academic Luxury" Palette
setup({
  theme: {
    colors: {
      ...colors,
      primary: '#2C2C2C', // Deep Charcoal
      secondary: '#334155', // Muted Navy
      bg: '#FAF9F6',      // Warm Ivory
      accent: '#C5A065',  // Subtle Gold
      paper: '#FFFFFF',
      slate: colors.slate,
    },
    fontFamily: {
      sans: ['Outfit', 'sans-serif'],
      serif: ['Playfair Display', 'serif'],
    },
    animation: {
      'editorial-fade': 'editorialFade 1.5s ease-out forwards',
      'float': 'float 6s ease-in-out infinite',
    },
    keyframes: {
      editorialFade: {
        '0%': { opacity: '0', transform: 'translateY(10px)' },
        '100%': { opacity: '1', transform: 'translateY(0)' },
      },
      float: {
        '0%, 100%': { transform: 'translateY(0)' },
        '50%': { transform: 'translateY(-10px)' },
      }
    },
    boxShadow: {
      'academic': '0 20px 50px -12px rgba(44, 44, 44, 0.12)',
      'gold': '0 10px 30px -5px rgba(197, 160, 101, 0.2)',
    },
    letterSpacing: {
      'tightest': '-0.05em',
      'superwide': '0.5em',
    }
  },
} as any);

const mountApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical Error: Root element not found");
    return;
  }

  try {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
      <React.StrictMode>
        <ErrorBoundary>
          <App />
        </ErrorBoundary>
      </React.StrictMode>
    );
    console.log("App mounted successfully");
  } catch (error) {
    console.error("Critical Error during mounting:", error);
  }
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mountApp);
} else {
  mountApp();
}
// Updated for git commit
