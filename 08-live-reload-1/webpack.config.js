'use strict';

let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');

module.exports = {
  context: path.resolve(__dirname, "frontend"),
  entry:   {
    main: ["webpack-dev-server/client", './main']
  },
  output:  {
    path:       __dirname + '/public',
    publicPath: '/public/',
    filename:   '[name].js'
  },

  module: {

    loaders: [{
      test:   /\.js$/,
      include: __dirname + '/frontend',
      loader: "babel?presets[]=es2015"
    }, {
      test:   /\.jade$/,
      loader: "jade"
    }, {
      test:   /\.styl$/,
      loader: 'style!css!stylus?resolve url'
    }, {
      test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      loader: 'file?name=[name].[ext]?[hash]'
    }]

  },

  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    host: 'localhost', // default
    port: 8080, // default

    contentBase: path.resolve(__dirname, "backend"), //static content
    hot: true

    /*proxy: [
      {
        path: '**', //https://github.com/chimurai/http-proxy-middleware#context-matching
        target: 'http://localhost:3000'
      }      
    ]*/
  }
};
