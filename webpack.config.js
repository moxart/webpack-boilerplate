const path = require("path");
const fs = require("fs");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
const {CleanWebpackPlugin} = require("clean-webpack-plugin");

const env = require("./config/env");

module.exports = {
    entry: {
        app: path.resolve(env.paths.source, "js", "app.js"),
    },
    output: {
        filename: "[name].js",
        path: env.paths.output,
    },
    module: {
        rules: [
            {
                test: /\.((c|sa|sc)ss)$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader", "sass-loader"],
            },
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: ["babel-loader"],
            },
            {
                test: /\.(jpe?g|png|gif|svg)$/i,
                type: "asset",
                generator: {
                    filename: "images/[name].[hash].[ext]",
                }
            },
            {
                test: /\.(eot|ttf|woff|woff2)$/,
                type: "asset",
                generator: {
                    filename: "fonts/[name].[hash].[ext]",
                }
            }
        ]
    },

    optimization: {
        minimizer: [
            "...",

            new ImageMinimizerPlugin({
                minimizer: {
                    implementation: ImageMinimizerPlugin.imageminMinify,
                    options: {
                        // Lossless optimization with custom option
                        // Feel free to experiment with options for better result for you

                        plugins: [
                            ["gifsicle", { interlaced: true }],
                            ["jpegtran", { progressive: true }],
                            ["optipng", { optimizationLevel: 5 }],
                            // Svgo configuration here https://github.com/svg/svgo#configuration

                            [
                                "svgo",
                                {
                                    plugins: [
                                        {
                                            name: "preset-default",
                                        },
                                    ],
                                },
                            ],
                        ],
                    },
                },
            }),
        ],
    },

    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
        }),

        new CleanWebpackPlugin({
            verbose: true,
            cleanOnceBeforeBuildPatterns: ["**/*", "!stats.json"],
        }),

        new HtmlWebpackPlugin({
            inject: true,
            hash: false,
            filename: "index.html",
            template: path.resolve(env.paths.source, "index.html"),
            favicon: path.resolve(env.paths.source, "images", "favicon.ico"),
        }),

        new CopyPlugin({
            patterns: [
                {
                    from: path.resolve(env.paths.source, "images"),
                    to: path.resolve(env.paths.output, "images"),
                    toType: "dir",
                }
            ]
        })
    ],

    target: "web",
};
