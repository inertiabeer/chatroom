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
		loaders: [{
			test: /\.js$/,
			loader: 'babel-loader',
			exclude: path.join(__dirname + '/node_modules'),
			include: path.join(__dirname + '/src'),
			query: {
				presets: ['react','es2015']

			}
		},
		{
			test:/\.css$/,
			loader:'style-loader!css-loader'
		}
		
]
	},
	plugins: [
		new htmlWP({
			template: 'index.html',
			minify: {
				collapseWhitespace: false,
				removeComments: true
			}
		})

	]
}