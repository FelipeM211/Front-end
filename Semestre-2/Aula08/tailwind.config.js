tailwind.config = {
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wiggle: {
          '0%': { transform: 'rotate(-360deg)' },
        },
      },
      animation: {
        fade: 'fade 1s ease-in-out infinite',
        wiggle: 'wiggle 1s ease-in-out infinite',
      },
    }
  }
}