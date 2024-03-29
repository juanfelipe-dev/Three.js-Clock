const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

const meta = {
  title: "Three.js Clock",
  desc: "A 3D analog clock made entirely in Three.js 🕰",
  image:
    "https://repository-images.githubusercontent.com/304176239/13cf3b00-0e9b-11eb-88d0-630cebf776f7",
  url: "https://townofdon.github.io/three-js-clock/",
};

module.exports = {
  mode: "development",
  entry: {
    app: "./src/index.js",
  },
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|svg|jpg|gif)$/,
        include: path.resolve(__dirname, "src"),
        use: ["file-loader"],
      },
      {
        test: /\.tsx?$/,
        use: [
          {
            loader: "ts-loader",
            options: {
              transpileOnly: true,
            },
          },
        ],
        include: path.resolve(__dirname, "src"),
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new CleanWebpackPlugin({ cleanStaleWebpackAssets: false }),
    new HtmlWebpackPlugin({
      title: "Three.js Clock",
      meta: {
        description: { name: "description", content: meta.desc },
        "og:title": {
          property: "og:title",
          content: meta.title,
        },
        "og:description": { property: "og:description", content: meta.desc },
        "og:type": { property: "og:type", content: "website" },
        "og:url": { property: "og:url", content: meta.url },
        "og:image": { property: "og:image", content: meta.image },
        "twitter:card": {
          name: "twitter:card",
          content: "summary_large_image",
        },
        "twitter:title": { name: "twitter:title", content: meta.title },
        "twitter:description": {
          name: "twitter:description",
          content: meta.desc,
        },
        "twitter:image": { name: "twitter:image", content: meta.image },
      },
    }),
  ],
  output: {
    filename: "[name]_bundle.js",
    path: path.resolve(__dirname, "build"),
    publicPath: "/three-js-clock/",
  },
};