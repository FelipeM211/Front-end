tailwind.config = {
  theme: {
    extend: {
      keyframes: {
        fade: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wiggle: {
            '0%, 100%': { transform: 'rotate(-3deg)' },
            '50%': { transform: 'rotate(3deg)' },
          
        },
        loader: {
            '0%': { transform: 'rotate(-360deg)' },

        }
      },
      animation: {
        fade: 'fade 1s ease-in-out infinite',
        wiggle: 'wiggle 0.5s ease-in-out infinite',
        loader: 'loader 0.7s ease-in-out infinite'
      },
    }
  }
}