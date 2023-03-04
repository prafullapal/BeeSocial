const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const CURRENT_WORKING_DIR = process.cwd();

const buildDirectory = "/dist";

module.exports = {
  mode: "development",
  entry: "./client/main.js",
  output: {
    path: path.join(CURRENT_WORKING_DIR, buildDirectory),
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
            // Add the following two options to include polyfills correctly
            // and avoid the "@babel/polyfill" deprecation warning
            useBuiltIns: "usage",
            corejs: { version: 3 },
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|woff|jpg|woff2|eot|ttf|svg)$/,
        use: {
          loader: "file-loader",
        },
      },
    ],
  },
  resolve: {
    extensions: ["*", ".js", ".jsx"],
  },
  devServer: {
    port: 3000,
    open: true,
    historyApiFallback: true,
    proxy: {
      "/api": {
        target: "http://localhost:3000",
        router: () => "http://localhost:8080",
        secure: false,
        changeOrigin: true,
      },
    },
  },
  plugins: [
    new CleanWebpackPlugin({ cleanAfterEveryBuildPatterns: [buildDirectory] }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      favicon: "./public/favicon.ico",
      publicPath: "/",
    }),
  ],
};
