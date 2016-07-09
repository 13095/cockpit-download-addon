const path = require('path')
const fs = require('fs')
const webpack = require('webpack')
const template = require('lodash/template')
const pkg = require('./package.json')

const ENV = process.env.NODE_ENV || 'development'
const banner = template(fs.readFileSync('banner', 'utf-8'))(pkg)

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.join(__dirname),
    filename: 'cockpit-download-addon.user.js',
    publicPath: '/'
  },
  plugins: ([
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(ENV) })
  ]).concat(ENV === 'production' ? [
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: { screw_ie8: true, warnings: false }
    }),
    new webpack.BannerPlugin(banner, { raw: true })
  ] : []),
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel?cacheDirectory'
      }
    ]
  },
  stats: { colors: true },
  devtool: ENV !== 'production' && 'inline-source-map'
}
