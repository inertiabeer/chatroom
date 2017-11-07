const path = require("path");
const htmlWP = require("html-webpack-plugin");
const webpack = require("webpack");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const OpenBrowerPlugin=require("open-browser-webpack-plugin");
module.exports = {
    devtool: "source-map",
    entry: "./src/script/main.js",
    output: {
        path: path.join(__dirname + "/dist"),
        filename: "js/bundle.js"
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader"]
            })
        },
        {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        }, {
            test: /\.scss$/,
            use: ExtractTextPlugin.extract({
                fallback: "style-loader",
                use: ["css-loader", "sass-loader"]
            })
        },
        {
            test: /\.(png|svg|jpg|gif|eot|ttf|woff)$/,
            use: [
                {loader:"file-loader",
                    options:{
                        name:"../fonts/[name].[ext]"
                    }
                }
            ]

        },
        {
            test: /\.js$/,
            use: [
                "babel-loader"
            ],
            include: path.join(__dirname + "/src")

        }
        ],
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
        }),
        new OpenBrowerPlugin({url:"http://localhost"})

    ]
};