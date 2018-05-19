const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");

module.exports = {
  mode: "none",
  entry: {
    app: "./src/app.js"
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: {
          presets: ["env"]
        }
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "./src/index.html",
      inject: "head"
    }),
    // have to be after HtmlWebpackPlugin
    new ScriptExtHtmlWebpackPlugin({
      defaultAttribute: "defer"
    })
  ]
}
