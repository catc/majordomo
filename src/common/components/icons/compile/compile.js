const { readdirSync, writeFileSync, readFile } = require('fs')
const { resolve } = require('path')
const { camelCase, upperFirst } = require('lodash')
const SVGO = require('svgo')

const INPUT_DIR = resolve(__dirname, '../raw')
const OUTPUT_DIR = resolve(__dirname, '../')

const svgo = _genConfig({
	removeColors: true,
})

async function run() {
	const icons = readdirSync(INPUT_DIR)
		.filter((f) => f.match(/\.svg$/))
		.map(optimize)

	await Promise.all(icons)
	return icons.length
}

run()
	.then((total) => {
		console.log(`Completed ${total} icons`)
	})
	.catch((err) => {
		console.error('ERROR :: ', err)
	})

// ---------------

async function optimize(filename) {
	const filepath = resolve(INPUT_DIR, filename)
	const file = await read(filepath)
	const { data } = await svgo.optimize(file)

	const name = upperFirst(camelCase(filename.replace('.svg', '')))

	const format = template(name, data)

	save(name, format)
}

function save(name, data) {
	const file = resolve(OUTPUT_DIR, name) + '.tsx'

	writeFileSync(file, data)
}

function _genConfig(opts = {}) {
	const plugins = [
		{
			removeTitle: true,
		},
		{
			removeViewBox: false,
		},
	]
	if (opts.removeColors) {
		plugins.push({
			removeAttrs: {
				attrs: '*:(fill|stroke)',
			},
		})
	}
	return new SVGO({
		plugins: plugins,
	})
}

function template(name, data) {
	return `import React from 'react'

type Props = {
	className?: string
}

export default function ${name}Icon({ className }: Props){
	return ${data}
}
`.replace(/<svg/, '<svg className={className}')
}

/************
	Helpers
*************/

function read(filepath) {
	return new Promise((resolve, reject) => {
		readFile(filepath, { encoding: 'utf-8' }, (err, data) => {
			if (err) {
				return reject(err)
			}
			resolve(data)
		})
	})
}
