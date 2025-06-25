module.exports = {
  plugins: [
    [
      'autoprefixer',
      {
        flexbox: 'no-2009',
        // Suprimir warnings específicos
        overrideBrowserslist: [
          '>0.2%',
          'not dead',
          'not op_mini all'
        ],
        // Configuración para evitar warnings
        cascade: false,
        remove: false
      }
    ]
  ]
}; 