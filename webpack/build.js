const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = require('./config')

config.mode = 'production'
config.module.rules[1] = {
	test: /\.(s?)css$/,
	loaders: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {},
		},
		'css-loader',
		{
			loader: 'postcss-loader',
			options: {
				ident: 'postcss',
				plugins: [require('autoprefixer')(), require('cssnano')()],
			},
		},
		'sass-loader',
	],
}
config.plugins.push(
	new MiniCssExtractPlugin({
		filename: 'style.css',
	}),
	new CleanWebpackPlugin(),
)

const { handleErrors } = require('./common')

webpack(config, handleErrors)
