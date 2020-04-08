const { resolve, sep } = require('path')
const { join } = require('path')

const HtmlWebpackPlugin = require('html-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');

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
			'@common': join(root, 'src/common'),
			'@popup': join(root, 'src/popup'),
			'@options': join(root, 'src/options'),
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
				exclude: [/node_modules/],
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
			// specific to monaco editor
			{
				test: /\.css$/,
				use: ['style-loader', 'css-loader'],
				include: [/node_modules/]
			},
			{
				test: /\.ttf$/,
				use: ['file-loader']
			},
		],
	},

	plugins: [
		new HtmlWebpackPlugin({
			template: join(root, 'src/options/index.html'),
			filename: 'options.html',
			chunks: ['options', 'monaco']
		}),
		new HtmlWebpackPlugin({
			template: join(root, 'src/popup/index.html'),
			filename: 'popup.html',
			chunks: ['popup']
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
		new MonacoWebpackPlugin({
			// https://github.com/microsoft/monaco-editor-webpack-plugin#options
			languages: ['javascript', 'typescript'],
			features: ['!	inPlaceReplace', '!gotoLine', '!gotoSymbol', '!gotoLine']
		})
	],

	optimization: {
		splitChunks: {
			cacheGroups: {
				monaco: {
					test: /node_modules\/monaco/,
					chunks: 'initial',
					name: 'monaco',
					priority: 5
				}
			},
		},
	},
}

module.exports = config
