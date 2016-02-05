const path = require('path'),
  webpack = require('webpack'),
  ExtractTextPlugin = require('extract-text-webpack-plugin'),
  HtmlWebpackPlugin = require('html-webpack-plugin');

const source = path.join(__dirname, 'src');
const jsAndJsx = /\.jsx?$/;

module.exports = {
  entry: {
    app: ['./src/index.js', './src/styles.less'],
    vendor: [
      'babel-polyfill',
      'ramda'
    ]
  },
  output: {
    path: './build/',
    pathInfo: true,
    publicPath: './',
    filename: '[name].js'
  },
  debug: true,
  devtool: 'source-map',
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
    new ExtractTextPlugin('app.min.css'),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false,
        screw_ie8: true
      }
    }),
    new HtmlWebpackPlugin({
      template: 'src/index.tpl.html',
      inject: 'body',
      filename: 'index.html'
    })
  ],
  module: {
    loaders: [
      {
        test: jsAndJsx,
        include: [source, path.join(__dirname, 'node_modules/buildingBlocks')],
        loader: 'babel-loader',
        plugins: ['transform-runtime'],
        query: {
          presets: ['es2015']
        }
      },
      {
        test: /\.less$/,
        loader: ExtractTextPlugin.extract('style-loader', 'css-loader!less-loader')
      }
    ]
  }
};