const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;


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

if (process.env.BUNDLE_ANALYZER) {
	config.plugins.push(new BundleAnalyzerPlugin())
	config.profile = true;
}

const { handleErrors, wrapInColor } = require('./common')

const package = require('../package.json')
const manifest = require('../src/manifest.json')


if (package.version !== manifest.version){
	wrapInColor('red', `ERROR: manifest.json and package.json versions don't match`)
} else {
	webpack(config, async (err, stats) => {
		handleErrors(err, stats)
		await zip()
		wrapInColor('green', 'Done')
	})
}
