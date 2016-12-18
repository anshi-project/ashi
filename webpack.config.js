'use strict';

const webpack = require("webpack");

module.exports = {
  context: __dirname + "/public/js",
  entry: {
    main: "./main.new.js",
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "scorecard.main.js",
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
