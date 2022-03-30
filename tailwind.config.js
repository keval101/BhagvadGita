module.exports = {
  purge: {
    enabled: process.env.NODE_ENV === 'production',
    content: [
      './src/**/*.html',
      './src/**/*.ts',
      './src/**/*.scss'
    ]
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
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
  variants: {
    extend: {},
  },
  plugins: [],
}
