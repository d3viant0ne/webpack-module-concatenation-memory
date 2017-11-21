const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const ProgressPlugin = require('webpack/lib/ProgressPlugin');

module.exports = {
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundle.js'
  },
  plugins: [
    new ProgressPlugin(),
    // Ignore `Critical dependency: the request of a dependency is an expression` warnings.
    new webpack.ContextReplacementPlugin(
      /angular(\\|\/)core(\\|\/)esm5/,
      __dirname
    ),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
  ]
};
