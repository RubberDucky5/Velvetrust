const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const { CleanPlugin } = require("webpack");

module.exports = {
    entry: './res/src/js/main.js',
    mode: 'none',
    plugins: [
        new HTMLWebpackPlugin({
          title: 'VR | Velvet Rust',
        }),
    ],
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'bundle.js',
        clean: true,
    },
    module: {
        rules: [
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader'
            ]
          }
        ]
    }
};