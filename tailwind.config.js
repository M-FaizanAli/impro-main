module.exports = {
  content: ['./src/**/*.{html,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          orange: '#ff7b00',
          'orange-light': '#ff9e3d',
          'orange-lighter': '#ffe0b2',
        },
        dark: {
          blue: '#00334d',
          'medium-blue': '#005f73',
        },
        light: {
          blue: '#0ea5e9',
        },
        text: {
          dark: '#0f2532',
          medium: '#355a64',
          light: '#4b5b6a',
        },
        bg: {
          white: '#ffffff',
          light: '#f8f9fa',
          lighter: '#f7fbfd',
        },
        border: {
          light: '#e6eef2',
        },
      },
      fontFamily: {
        sans: ['Poppins', 'Arial', 'Helvetica', 'sans-serif'],
      },
      fontSize: {
        h1: 'clamp(2rem, 5vw, 3.5rem)',
        h2: 'clamp(1.75rem, 4vw, 2.2rem)',
        h3: '1.25rem',
      },
      spacing: {
        'header-height': '72px',
        'topbar-height': '48px',
        'mobile-header-total': '120px',
      },
      boxShadow: {
        sm: '0 2px 8px rgba(0, 0, 0, 0.08)',
        md: '0 4px 16px rgba(0, 0, 0, 0.1)',
        lg: '0 8px 24px rgba(0, 0, 0, 0.12)',
      },
      animation: {
        'gradient-shift': 'gradientShift 8s ease infinite',
        'bounce-down': 'bounce 2s infinite',
        'fade-in-down': 'fadeInDown 0.8s ease',
        'fade-in-up': 'fadeInUp 1s ease',
        float: 'float 6s ease-in-out infinite',
      },
      keyframes: {
        gradientShift: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '0.8' },
        },
        fadeInDown: {
          from: { opacity: '0', transform: 'translateY(-20px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        fadeInUp: {
          from: { opacity: '0', transform: 'translateY(30px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(-50px, -50px) scale(1.1)' },
        },
      },
    },
  },
  plugins: [],
};
