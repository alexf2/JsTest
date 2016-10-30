'use strict'

const NODE_ENV = process.env.NODE_ENV || 'development';
const webpack = require('webpack');

module.exports = {
    context: __dirname + "/src",

    entry: "./home.js",

    output: {
        path: __dirname + "/dist",
        filename: "build.js",
        library: "home"
    },

    devtool: "source-map",

    plugins: [
        new webpack.DefinePlugin({NODE_ENV: JSON.stringify(NODE_ENV)})        
    ]
}
