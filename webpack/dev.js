const webpack = require('webpack')
const config = require('./config')
const { handleErrors, wrapInColor } = require('./common')

const compiler = webpack(config)

compiler.watch({}, (err, stats) => {
	wrapInColor('green', 'compiling...')
	handleErrors(err, stats)
})
