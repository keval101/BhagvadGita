module.exports = {
  future: {
    purgeLayersByDefault: true,
  },
  purge: {
    enabled: true,
    content: [
      './src/**/*.html',
      './src/**/*.ts',
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        gray: {
          400: '#DCDBDB',
          500: '#A7A6A6',
        }
      },
      screens: {
        '2xl-max': {'max': '1600px'},
        // => @media (max-width: 1600px) { ... }
  
        'xl-max': {'max': '1280px'},
        // => @media (max-width: 1280px) { ... }
  
        'lg-max': {'max': '1024px'},
        // => @media (max-width: 1024px) { ... }
  
        'md-max': {'max': '768px'},
        // => @media (max-width: 768px) { ... }
  
        'sm-max': {'max': '640px'},
        // => @media (max-width: 640px) { ... }
      }
    },
  },
  future: {
    removeDeprecatedGapUtilities: true,
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
