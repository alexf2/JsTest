'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",

    entry: {
        home:  "./home",
        about: "./about",
        common: "./common"
    },

    output: {
        path: __dirname + "/dist",
        filename: "[name].js",
        library: "[name]"
    },

    devtool: "source-map",

    plugins: [
        new webpack.NoErrorsPlugin(),
        new webpack.DefinePlugin({NODE_ENV: JSON.stringify(NODE_ENV), USER: JSON.stringify(process.env.USER)}),
        new webpack.optimize.CommonsChunkPlugin({name: "common", minChunks: 2})                         
    ],

    resolve: {
    modulesDirectories: ['node_modules'],
    extensions:         ['', '.js']
  },

  resolveLoader: {
    modulesDirectories: ['node_modules'],
    moduleTemplates:    ['*-loader', '*'],
    extensions:         ['', '.js']
  },

  module: {

    loaders: [{
      test:   /\.js$/,
      exclude: /(node_modules|bower_components)/,
      loader: 'babel',

      query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
    }]

  }
}

if (NODE_ENV == 'production') {
  module.exports.plugins.push(
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          // don't show unreachable variables etc
          warnings:     false,
          drop_console: true,
          unsafe:       true
        }
      })
  );
}
