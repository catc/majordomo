const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

const config = require('./config')
const zip = require('./zip')

config.mode = 'production'

// regular css
config.module.rules[1] = {
	test: /\.(s?)css$/,
	exclude: [/node_modules/],
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

// monaco
config.module.rules[2] = {
	test: /\.css$/,
	include: [/node_modules/],
	loaders: [
		{
			loader: MiniCssExtractPlugin.loader,
			options: {},
		},
		'css-loader',
	],
}
config.plugins.push(
	new MiniCssExtractPlugin({
		filename: '[name].css',
		chunkFilename: '[id].css',
	}),
	new CleanWebpackPlugin(),
)

const { handleErrors, wrapInColor } = require('./common')

webpack(config, async (err, stats) => {
	handleErrors(err, stats)
	await zip()
	wrapInColor('green', 'Done')
})
