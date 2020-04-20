const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
	mode: 'development',
	devServer: {
		historyApiFallback: {
			disableDotRule: true
		}
	},
	entry: './src/index',
	output: {
		path: path.resolve(__dirname, 'build'),
		publicPath: '/',
		filename: 'bundle.js'
	},
	module: {
		rules: [
			{
				test: /\.js$/,
				exclude: /node_modules/,
				use: [ 'babel-loader' ]
			},
			{
				test: /\.s[ac]ss$/i,
				use: [ 'style-loader', 'css-loader', 'sass-loader' ]
			}
		]
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: './public/index.html'
		}),
		new webpack.DefinePlugin({
			PRODUCTION_API: JSON.stringify('https://octopus-bn-backend-staging.herokuapp.com/api/v1/')
		}),
		new webpack.DefinePlugin({
			DEVELOPMENT_API: JSON.stringify('http://localhost:3000/api/v1/')
		})
	]
};
