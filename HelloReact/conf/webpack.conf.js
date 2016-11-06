const webpack = require('webpack');
const conf = require('./gulp.conf');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');
const pkg = require('../package.json');

module.exports = {
  module: {
    preLoaders: [
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loader: 'tslint'
      }
    ],

    loaders: [
      {
        test: /.json$/,
        loaders: [
          'json'
        ]
      },
      {
        test: /\.(css|less)$/,
        /* loaders: [
          'style',
          'css',
          'less',
          'postcss'
        ] */
        loaders: ExtractTextPlugin.extract({
          fallbackLoader: 'style',
          loader: 'css?minimize!less!postcss'
        })
      },
      {
        test: /\.tsx$/,
        exclude: /node_modules/,
        loaders: [
          'react-hot',
          'ts'
        ]
      }
    ]
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src('index.html')
    }),

    new ExtractTextPlugin({filename: 'css/[name].css', allChunks: true}),
    new webpack.optimize.CommonsChunkPlugin({names: ['vendor', 'hot']}),

    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: () => [autoprefixer],
  debug: true,
  devtool: 'source-map',
  output: {
    path: path.join(process.cwd(), conf.paths.tmp),
    filename: '[name].js'
  },
  resolve: {
    extensions: [
      '',
      '.webpack.js',
      '.web.js',
      '.js',
      '.ts',
      '.tsx'
    ]
  },
  entry: {
    hot: ['webpack/hot/dev-server', 'webpack-hot-middleware/client'],
    app: `./${conf.path.src('index')}`,
    vendor: Object.keys(pkg.dependencies)
  },
  ts: {
    configFileName: 'tsconfig.json'
  },
  tslint: {
    configuration: require('../tslint.json')
  }
};
