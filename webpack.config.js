//This page only understands the old JS

const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  watch: true,
  entry: {
    main: "./src/client/js/main.js",
    videoPlayer: "./src/client/js/videoPlayer.js",
    recorder: "./src/client/js/recorder.js",
  },
  mode: "development",
  output: {
    filename: "js/[name].js", //webpack variable [name] from entry object key..
    path: path.resolve(__dirname, "assets"),
    clean: true,
  },
  plugins: [new MiniCssExtractPlugin({ filename: "css/styles.css" })],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [["@babel/preset-env", { targets: "defaults" }]],
          },
        },
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
    ],
  },
};
