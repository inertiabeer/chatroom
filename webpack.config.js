const path = require("path");
const htmlWP = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin=require("extract-text-webpack-plugin");
module.exports = {
    devtool:"source-map",
    entry: "./src/script/main.js",
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "js/bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback:"style-loader",
                use:"css-loader"
            })
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
        new UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new ExtractTextPlugin("css/main.css"),
        new webpack.DefinePlugin({
            "process.env": {
                NODE_ENV: JSON.stringify("production")
            }
        })

    ]
};