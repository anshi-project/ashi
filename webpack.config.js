'use strict';

const webpack = require("webpack");

module.exports = {
  context: __dirname + "/public/js/registration",
  entry: {
    main: "./index.js",
  },
  output: {
    path: __dirname + "/public/dist",
    filename: "registration.js",
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
