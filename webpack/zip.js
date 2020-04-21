const { resolve } = require('path');
const fs = require('fs');
const archiver = require('archiver');

const root = resolve(__dirname, '../')
const INPUT = resolve(root, 'build')
const OUTPUT = resolve(root, 'zip')

module.exports = function (){
	const manifest = require('../build/manifest.json')

	const filename = `${manifest.name}_v${manifest.version}.zip`.toLowerCase()
	const file = resolve(OUTPUT, filename)

	const archive = archiver('zip', {
		zlib: { level: 9 }
	});

	const stream = fs.createWriteStream(file);

	return new Promise((res, rej) => {
		archive
			.directory(INPUT, false)
			.on('error', err => rej(err))
			.pipe(stream);

		stream.on('close', res);
		archive.finalize();
	});
}
