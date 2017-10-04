const webpack = require("webpack");
const path = require('path');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://127.0.0.1:8080',
    './src/index.ts'
  ],
  devtool: 'inline-source-map',
  devServer: {
    host: "127.0.0.1",
    publicPath: '/',
    contentBase: "./dist/",
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ 'style-loader', 'css-loader' ],
        exclude: /node_modules/
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
      extensions: [ ".ts", ".js" ]
    },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  }
};
