const webpack = require('webpack');

module.exports = {
  webpack: {
    configure: (webpackConfig) => {
      // Polyfills para webpack 5
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        "assert": require.resolve("assert/"),
        "buffer": require.resolve("buffer/"),
        "crypto": require.resolve("crypto-browserify"),
        "stream": require.resolve("stream-browserify"),
        "util": require.resolve("util/"),
        "process": require.resolve("process/browser"),
        "path": require.resolve("path-browserify"),
        "os": require.resolve("os-browserify/browser"),
        "fs": false,
        "child_process": false,
        "net": false,
        "tls": false
      };

      // Buscar y remover DefinePlugin existente para evitar conflictos
      webpackConfig.plugins = webpackConfig.plugins.filter(
        plugin => !(plugin instanceof webpack.DefinePlugin)
      );

      // Agregar plugins necesarios con una sola instancia de DefinePlugin
      webpackConfig.plugins = [
        ...webpackConfig.plugins,
        new webpack.ProvidePlugin({
          Buffer: ['buffer', 'Buffer'],
          process: 'process/browser'
        }),
        new webpack.DefinePlugin({
          'process.env': JSON.stringify({
            NODE_ENV: process.env.NODE_ENV,
            REACT_APP_VERSION: process.env.REACT_APP_VERSION || '0.1.0'
          })
        })
      ];

      // Configurar module rules para mejor compatibilidad
      webpackConfig.module.rules.push({
        test: /\.m?js$/,
        resolve: {
          fullySpecified: false
        }
      });

      return webpackConfig;
    }
  },
  devServer: (devServerConfig, { env, paths, proxy, allowedHost }) => {
    // Configuración completa para webpack-dev-server moderna
    return {
      ...devServerConfig,
      // Usar la nueva API setupMiddlewares en lugar de las deprecadas
      setupMiddlewares: (middlewares, devServer) => {
        if (!devServer) {
          throw new Error('webpack-dev-server is not defined');
        }
        
        // Aquí se pueden agregar middlewares personalizados
        return middlewares;
      },
      // Asegurar que las opciones deprecadas no se usen
      onBeforeSetupMiddleware: undefined,
      onAfterSetupMiddleware: undefined,
      // Configuraciones adicionales para suprimir warnings
      client: {
        overlay: {
          errors: true,
          warnings: false
        }
      }
    };
  }
}; 