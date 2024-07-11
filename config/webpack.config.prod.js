/* eslint-disable import/no-extraneous-dependencies */

const { merge } = require("webpack-merge");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const webpackConfig = require("../webpack.config");

module.exports = merge(webpackConfig, {
    mode: "production",

    devtool: false,

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
            }),

            new CssMinimizerPlugin(),
        ]
    },

    plugins: [

    ],
})