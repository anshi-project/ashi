module.exports = {
  entry: `${__dirname}/tests.js`,
  output: {
    path: `${__dirname}/public`,
    filename: 'bundle.js'
  },
    devServer: {
    historyApiFallback: true,
    contentBase: './'
  },
  module: {
    preLoaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'eslint-loader'
      },
    ],
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ],
    eslint: {
      configFile: './.eslintrc'
    }
    
  }
}