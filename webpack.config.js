'use strict';

const webpack = require("webpack");

module.exports = {
  context: __dirname + "/server/public/dist/",
  entry: {
    main: "./main.new.js",
  },
  output: {
    path: __dirname + "/server/public/dist",
    filename: "[name].js",
  },
};
