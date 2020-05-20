const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const common = require('./common')

const BUILD_PATH = path.resolve(__dirname, '../build')

module.exports = merge(common, {
  mode: 'development',
  entry: [
    'react-hot-loader/patch',
    './src/index.tsx'
  ],
  output: {
    path: BUILD_PATH,
    filename: 'bundle.js',
  },
  module: {
    rules: [
      {
        test: /\.(j|t)sx?$/,
        exclude: /node_modules/,
        use: ['source-map-loader'],
        enforce: 'pre'
      }
    ]
  },
  devtool: 'inline-source-map',
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new BundleAnalyzerPlugin()
  ],
  devServer: {
    historyApiFallback: true,
    contentBase: BUILD_PATH
  },
  watch: true
})
