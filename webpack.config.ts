import * as webpack from "webpack"
import * as path from "path"

const config: webpack.Configuration = {
  entry: [
    "webpack-dev-server/client?http://127.0.0.1:8080",
    "./src/index.ts"
  ],
  devtool: "inline-source-map",
  devServer: {
    host: "127.0.0.1",
    publicPath: "/",
    contentBase: "./dist/",
    hot: true
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.EnvironmentPlugin(['LOOKUPURL']),
    new webpack.EnvironmentPlugin(['ADVANCEDURL']),
    new webpack.EnvironmentPlugin(['QUOTEURL'])
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ],
        exclude: /node_modules/
      },
      {
        test: /\.ts$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
      extensions: [ ".ts", ".js" ]
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  }
}

export default config
