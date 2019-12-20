const webpack = require('webpack')
const config = require('./config')
const { handleErrors, wrapInColor } = require('./common')

config.devtool = 'source-map'

const compiler = webpack(config)

compiler.watch({}, (err, stats) => {
	wrapInColor('green', 'compiling...')
	handleErrors(err, stats)
})
