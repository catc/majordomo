const webpack = require('webpack')
const config = require('./config')

const { handleErrors } = require('./common')

webpack(config, handleErrors)
