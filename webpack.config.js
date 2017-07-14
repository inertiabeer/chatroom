const path = require("path");
const htmlWP = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
module.exports = {
    entry: "./src/script/main.js",
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "js/bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: [
                "style-loader",
                "css-loader"
            ]
        },
        {
            test:/\.(png|svg|jpg|gif)$/,
            use:[
                "file-loader"
            ]

        },
        {
            test:/\.js$/,
            use:[
                "babel-loader"
            ],
            exclude: path.join(__dirname + "/node_modules"),
            include: path.join(__dirname + "/src")

        }],
    },
    plugins: [
        new htmlWP({
            filename: "index.html",
            template: "index.html",
            minify: {
                collapseWhitespace: false,
                removeComments: true
            }
        }),
        new webpack.LoaderOptionsPlugin({
            options: {
                postcss: [require("autoprefixer")({
                    browsers: ["last 5 versions"]
                })]
            }
        }),
        // new UglifyJsPlugin({
        //     compress: {
        //         warnings: false
        //     }
        // }),
        // new webpack.DefinePlugin({
        //     "process.env": {
        //         NODE_ENV: JSON.stringify("production")
        //     }
        // })

    ]
};