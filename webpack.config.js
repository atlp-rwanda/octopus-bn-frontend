const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const Dotenv = require('dotenv-webpack');

module.exports = {
  mode: "development",
  devServer: {
    historyApiFallback: {
      disableDotRule: true,
    },
  },
  entry: "./src/index",
  stats: "errors-only",
  output: {
    path: path.resolve(__dirname, "build"),
    publicPath: "/",
    filename: "bundle.js",
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ["babel-loader"],
      },
      {
        test: /\.s[ac]ss$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.css$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              modules: true,
            },
          },
        ],
        include: /\.module\.css$/,
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
        exclude: /\.module\.css$/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new Dotenv(),
    new webpack.DefinePlugin({
      PRODUCTION_API: JSON.stringify(
        "https://octopus-bn-backend.herokuapp.com/api/v1/"
      ),
    }),
    new webpack.DefinePlugin({
      DEVELOPMENT_API: JSON.stringify("http://localhost:3000/api/v1/"),
    }),
    new MiniCssExtractPlugin(),
  ],
  resolve: {
    alias: {
      "react-router-dom": path.resolve("./node_modules/react-router-dom"),
    },
  },
};
