'use strict';

const webpack = require("webpack");

module.exports = {
  context: __dirname + "/server/public/dist",
  entry: {
    main: "./main.new.js",
  },
  output: {
    path: __dirname + "/server/public/dist",
    filename: "[name].js",
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
