import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: ["./pages/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1600px",
        "3xl": "1900px",
      },
    },
    extend: {
      fontFamily: {
        serif: ["Libre Baskerville", "Georgia", "serif"],
        sans: ["Inter", "system-ui", "sans-serif"],
        ui: ["Source Sans 3", "system-ui", "sans-serif"],
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        /* Premium Design System Colors */
        oxford: "hsl(var(--oxford-blue))",
        teal: "hsl(var(--academic-teal))",
        gold: "hsl(var(--antique-gold))",
        "bg-alt": "hsl(var(--bg-alt))",
        "text-muted": "hsl(var(--text-muted))",
        charcoal: "hsl(var(--text-primary))",
      },
      borderRadius: {
        none: "0",
        sm: "0px",
        DEFAULT: "2px",
        md: "4px",
        lg: "6px",
        xl: "12px",
        full: "9999px",
      },
      keyframes: {
        "academic-reveal": {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "section-entry": {
          "0%": { opacity: "0", transform: "scale(0.98)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        "underline-grow": {
          "0%": { backgroundSize: "0% 2px" },
          "100%": { backgroundSize: "100% 2px" },
        },
      },
      animation: {
        "academic-reveal": "academic-reveal 0.9s cubic-bezier(0.22, 1, 0.36, 1) forwards",
        "section-entry": "section-entry 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
