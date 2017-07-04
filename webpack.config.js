var path = require('path');
var htmlWP = require('html-webpack-plugin');
var webpack = require('webpack');
module.exports = {
	entry: './src/script/main.js',
	output: {
		path: path.join(__dirname + '/dist'),
		filename: 'js/bundle.js'
	},
	module: {
		rules: [{
			test: /\.css$/,
			use: [
				'style-loader',
				'css-loader'
			]
		},
		{
			test:/\.(png|svg|jpg|gif)$/,
			use:[
			'file-loader'
			]

		},
		{
			test:/\.js$/,
			use:[
			'babel-loader'
			],
			exclude: path.join(__dirname + '/node_modules'),
			include: path.join(__dirname + '/src')

		}],
	},
	plugins: [
		new htmlWP({
			filename: 'index.html',
			template: 'index.html',
			minify: {
				collapseWhitespace: false,
				removeComments: true
			}
		}),
		new webpack.LoaderOptionsPlugin({
			options: {
				postcss: [require('autoprefixer')({
					browsers: ['last 5 versions']
				})]
			}
		})

	]
}