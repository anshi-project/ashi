'use strict';

const webpack = require("webpack");

module.exports = {
  context: __dirname + "/server/public/js/user",
  entry: {
    main: "./index.js",
  },
  output: {
    path: __dirname + "/server/public/dist",
    filename: "user.js",
  },
       module: {
         loaders: [{
             test: /\.js$/,
             exclude: /node_modules/,
             loader: 'babel-loader'
         }]
     },
     plugins: [
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false,
            },
            output: {
                comments: false,
            },
        })
    ]    
};
