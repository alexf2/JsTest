'use strict';

let webpack = require('webpack');
let ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require('path');
const rimraf = require('rimraf');

module.exports = {
  context: path.resolve(__dirname, "frontend"),
  entry:   {
    main: ['./main']
  },
  output:  {
    path:       __dirname + '/public',
    publicPath: '/',
    filename:   '[name].js'
  },

  module: {

    loaders: [{
      test:   /\.js$/,
      include: __dirname + '/frontend',
      loader: "babel-loader",

      query: {
                presets: ['es2015'],
                plugins: ['transform-runtime']
            }
    }, 
    
    {
      test:   /\.jade$/,
      loader: "jade"
    }, 
    
    {
      test:   /\.styl$/,
      loader: ExtractTextPlugin.extract('style', 'css!stylus?resolve url')
    }, 
    
    {
      test:   /\.(png|jpg|svg|ttf|eot|woff|woff2)$/,
      loader: 'file?name=[name].[ext]?[hash]'
    }]
  },

  plugins: [
    //{apply: (compiler) => {rimraf.sync(compiler.options.output.path);} },
    new ExtractTextPlugin('[name].css', {allChunks: true, disable: process.env.NODE_ENV=='development'})
    //new webpack.HotModuleReplacementPlugin()
  ],

  devServer: {
    host: 'localhost', // default
    port: 8080, // default

    contentBase: path.resolve(__dirname, "backend"), //static content
    //hot: true

    /*proxy: [
      {
        path: '**', //https://github.com/chimurai/http-proxy-middleware#context-matching
        target: 'http://localhost:3000'
      }      
    ]*/
  }
};
