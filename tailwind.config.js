/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        border: 'var(--color-border)', // gray-500
        input: 'var(--color-input)', // white
        ring: 'var(--color-ring)', // blue-800
        background: 'var(--color-background)', // white
        foreground: 'var(--color-foreground)', // black
        primary: {
          DEFAULT: 'var(--color-primary)', // gray-400
          foreground: 'var(--color-primary-foreground)', // black
        },
        secondary: {
          DEFAULT: 'var(--color-secondary)', // gray-500
          foreground: 'var(--color-secondary-foreground)', // white
        },
        destructive: {
          DEFAULT: 'var(--color-destructive)', // red-500
          foreground: 'var(--color-destructive-foreground)', // white
        },
        muted: {
          DEFAULT: 'var(--color-muted)', // gray-500
          foreground: 'var(--color-muted-foreground)', // gray-700
        },
        accent: {
          DEFAULT: 'var(--color-accent)', // blue-800
          foreground: 'var(--color-accent-foreground)', // white
        },
        popover: {
          DEFAULT: 'var(--color-popover)', // gray-400
          foreground: 'var(--color-popover-foreground)', // black
        },
        card: {
          DEFAULT: 'var(--color-card)', // gray-300
          foreground: 'var(--color-card-foreground)', // black
        },
        success: {
          DEFAULT: 'var(--color-success)', // green-600
          foreground: 'var(--color-success-foreground)', // white
        },
        warning: {
          DEFAULT: 'var(--color-warning)', // orange-500
          foreground: 'var(--color-warning-foreground)', // black
        },
        error: {
          DEFAULT: 'var(--color-error)', // red-500
          foreground: 'var(--color-error-foreground)', // white
        },
        // Windows 98 Specific Colors
        surface: 'var(--color-surface)', // gray-300
        'text-primary': 'var(--color-text-primary)', // black
        'text-secondary': 'var(--color-text-secondary)', // gray-700
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        'heading': ['Courier New', 'Courier Prime', 'monospace'],
        'body': ['Courier Prime', 'Courier New', 'monospace'],
        'caption': ['Source Code Pro', 'monospace'],
        'data': ['JetBrains Mono', 'monospace'],
        'mono': ['JetBrains Mono', 'Source Code Pro', 'Courier Prime', 'monospace'],
      },
      animation: {
        'button-press': 'buttonPress 150ms ease-out',
        'fade-in': 'fadeIn 300ms ease-out',
      },
      keyframes: {
        buttonPress: {
          '0%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(1px)' },
          '100%': { transform: 'translateY(0px)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      boxShadow: {
        'inset-win98': 'inset 1px 1px 2px rgba(0,0,0,0.1)',
        'ridge': '2px 2px 4px rgba(0,0,0,0.1), inset -1px -1px 2px rgba(0,0,0,0.1)',
        'sunken': 'inset 2px 2px 4px rgba(0,0,0,0.2)',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
  ],
}