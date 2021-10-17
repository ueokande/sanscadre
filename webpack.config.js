const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const src = path.resolve(__dirname, "src");
const dist = path.resolve(__dirname, "dist");

const mainConfig = {
  name: "main",
  target: "electron15.2-main",
  entry: path.join(src, "main"),
  output: {
    path: path.join(dist, "main"),
    filename: "main.js",
  },

  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        loader: "ts-loader",
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },
};

const rendererConfig = {
  name: "renderer",
  target: "electron15.2-renderer",
  entry: path.join(src, "renderer"),
  output: {
    path: path.join(dist, "renderer"),
    filename: "renderer.js",
  },

  module: {
    rules: [
      {
        test: [/\.ts$/, /\.tsx$/],
        exclude: /node_modules/,
        loader: "ts-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },

  resolve: {
    extensions: [".js", ".jsx", ".ts", ".tsx"],
    modules: [path.join(__dirname, "src"), "node_modules"],
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "renderer.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, "renderer", "index.html"),
      filename: "renderer.html",
    }),
  ],
};

module.exports = [mainConfig, rendererConfig];
