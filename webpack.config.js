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

const rendererScreenConfig = {
  name: "renderer_screen",
  target: "electron15.2-renderer",
  entry: path.join(src, "renderer_screen"),
  output: {
    path: path.join(dist, "renderer"),
    filename: "renderer_screen.js",
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
      filename: "renderer_screen.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, "renderer_screen", "index.html"),
      filename: "renderer_screen.html",
    }),
  ],
};

const rendererControllerConfig = {
  name: "renderer_controller",
  target: "electron15.2-renderer",
  entry: path.join(src, "renderer_controller"),
  output: {
    path: path.join(dist, "renderer"),
    filename: "renderer_controller.js",
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
      filename: "renderer_controller.css",
    }),
    new HtmlWebpackPlugin({
      template: path.join(src, "renderer_controller", "index.html"),
      filename: "renderer_controller.html",
    }),
  ],
};

module.exports = [mainConfig, rendererScreenConfig, rendererControllerConfig];
