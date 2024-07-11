/* eslint-disable import/no-extraneous-dependencies */

const { merge } = require("webpack-merge");

const webpackConfig = require("../webpack.config");
const env = require("./env");

module.exports = merge(webpackConfig, {
    mode: "development",
    devtool: "inline-source-map",

    devServer: {
        static: {
            directory: env.paths.output,
            publicPath: "/",
            watch: true,
        },
        client: {
            overlay: true,
        },
        open: true,
        compress: true,
        hot: false,
        ...env.server,
    },

    plugins: [

    ],
})