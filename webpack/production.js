const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const common = require('./common')

module.exports = merge(common, {
  mode: 'production',
  entry: ['./src/index.tsx'],
  output: {
    path: path.resolve(__dirname, '../build'),
    filename: '[name].[hash].js'
  },
  plugins: [
    new webpack.optimize.ModuleConcatenationPlugin()
  ],
  optimization: {
    minimize: true,
    runtimeChunk: {
      name: entrypoint => `runtime-${entrypoint.name}`
    },
    splitChunks: {
      automaticNameDelimiter: '-',
      cacheGroups: {
        vendors: {
          test: /node_modules/,
          priority: 10,
          name: 'vendors',
          chunks: 'all',
          enforce: true
        }
      }
    }
  }
})
