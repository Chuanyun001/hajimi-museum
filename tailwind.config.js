/** @type {import('tailwindcss').Config} */

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    container: {
      center: true,
    },
    extend: {
      colors: {
        'vscode-bg': '#1e1e1e',
        'vscode-text': '#d4d4d4',
        'vscode-comment': '#6a9955',
        'vscode-string': '#ce9178',
        'vscode-keyword': '#569cd6',
        'vscode-error': '#f44747',
        'vscode-line-number': '#858585',
        'vscode-selection': '#264f78',
        'vscode-border': '#3c3c3c',
      },
      fontFamily: {
        'mono': ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'typing': 'typing 3.5s steps(40, end)',
        'breath': 'breath 4s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        breath: {
          '0%, 100%': { transform: 'scale(1)' },
          '50%': { transform: 'scale(1.05)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 5px rgba(86, 156, 214, 0.5)' },
          '50%': { boxShadow: '0 0 20px rgba(86, 156, 214, 0.8)' },
        },
      },
    },
  },
  plugins: [],
};