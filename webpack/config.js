const { resolve, sep } = require('path')
const { join } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const root = resolve(__dirname, '../')

const config = {
	mode: process.env.NODE_ENV || 'development',

	entry: {
		background: join(root, '/src/background/index.ts'),
		popup: join(root, '/src/popup/index.tsx'),
		options: join(root, '/src/options/index.tsx'),
	},
	output: {
		path: join(root, 'build'),
		filename: '[name].bundle.js',
	},

	resolve: {
		extensions: ['.ts', '.tsx', '.js', '.jsx'],
		alias: {
			'@popup': join(root, 'src/popup'),
			'@background': join(root, 'src/background'),
		},
	},

	module: {
		rules: [
			{
				test: /\.(j|t)sx?$/,
				exclude: [/node_modules/],
				use: {
					loader: 'babel-loader',
					options: {
						cacheDirectory: true,
					},
				},
			},
			{
				// overwritten in build script with extract-text-plugin
				test: /\.(s?)css$/,
				loaders: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							ident: 'postcss',
							plugins: [require('autoprefixer')()],
						},
					},
					'sass-loader',
				],
			},
		],
	},
	plugins: [
		new HtmlWebpackPlugin({
			template: join(root, 'src/options/index.html'),
			filename: 'options.html',
			chunks: ['options', 'lib'],
		}),
		new HtmlWebpackPlugin({
			template: join(root, 'src/popup/index.html'),
			filename: 'popup.html',
			chunks: ['popup', 'lib', 'styles'],
		}),
		new CopyWebpackPlugin([
			// copy manifest.json
			{
				from: join(root, 'src', 'manifest.json'),
				transform: (content, path) => {
					return Buffer.from(
						JSON.stringify(
							{
								description: process.env.npm_package_description,
								version: process.env.npm_package_version,
								...JSON.parse(content.toString()),
							},
							null,
							4,
						),
					)
				},
			},
			// copy images
			{
				from: join(root, 'src/images/*'),
				transformPath: (targetPath) => {
					return join(...targetPath.split(sep).slice(-2))
				},
			},
		]),
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				// vendor bundle
				// TODO - split monaco stuff into separate chunk only for options page
				vendor: {
					test: /node_modules/,
					chunks: 'initial',
					name: 'lib',
					enforce: true,
				},
			},
		},
	},
}

module.exports = config
