const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackMd5Hash = require("webpack-md5-hash");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CompressionPlugin = require("compression-webpack-plugin");
const path = require("path");
const webpack = require("webpack");
const WasmPackPlugin = require("@wasm-tool/wasm-pack-plugin");

const NODE_ENV =
    process.env.NODE_ENV === "development" ? "development" : "production";
// const IS_PROD = NODE_ENV === "production";
const IS_PROD = false;
const DIST_DIR = path.resolve(path.join(__dirname, "dist"));
const SRC_DIR = path.resolve(path.join(__dirname, "src"));
const STATIC_DIR = path.resolve(path.join(__dirname, "static"));
const TARGET_DIR = path.resolve(path.join(__dirname, "build"));
const MOCK = true;

console.log("PRODUCTION?", IS_PROD, NODE_ENV);

module.exports = {
    mode: IS_PROD ? "production" : "development",
    entry: {
        index: path.join(SRC_DIR, "index.js"),
    },
    output: {
        path: DIST_DIR,
        filename: "[name].js",
        publicPath: "/",
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                commons: {
                    test: /[\\/]node_modules[\\/]/,
                    name: "vendor",
                    chunks: "all",
                },
            },
        },
    },
    performance: {
        hints: false,
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: IS_PROD
                    ? [
                          "style-loader",
                          MiniCssExtractPlugin.loader,
                          "css-loader",
                          "postcss-loader",
                      ]
                    : ["style-loader", "css-loader", "postcss-loader"],
            },
            {
                test: /\.pug$/,
                use: "pug-loader",
            },
        ],
    },
    plugins: [
        new WasmPackPlugin({
            crateDirectory: __dirname,
        }),
        ...(MOCK
            ? [
                  new HtmlWebpackPlugin({
                      template: path.join(SRC_DIR, "pug", "index.pug"),
                      filename: "index.html",
                  }),
              ]
            : [
                  new HtmlWebpackPlugin({
                      template: path.join(SRC_DIR, "pug", "index.pug"),
                      filename: "index.html",
                  }),
              ]),
        ...(IS_PROD
            ? [
                  new MiniCssExtractPlugin({
                      filename: "index.css",
                  }),
                  new WebpackMd5Hash(),
                  new CompressionPlugin({
                      test: /\.(html|css|js|wasm)$/,
                  }),
              ]
            : [new webpack.HotModuleReplacementPlugin()]),
    ],
    devServer: {
        https: true,
        historyApiFallback: true,
        hot: true,
    },
};
