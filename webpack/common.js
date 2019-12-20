const COLORS = {
	RED: '\x1b[31m',
	YELLOW: '\x1b[33m',
	GREEN: '\x1b[32m',
	RESET: '\x1b[0m',
}

function handleErrors(err, stats) {
	if (err) {
		console.error(err.stack || err)
		if (err.details) {
			console.error(err.details)
		}
		return
	}

	if (stats.hasErrors()) {
		wrapInColor('red', ':: ERROR ::')
		if (stats.compilation && stats.compilation.errors) {
			console.error(stats.compilation.errors)
		}
	} else if (stats.hasWarnings()) {
		wrapInColor('yellow', ':: WARNING ::')
		if (stats.compilation && stats.compilation.warnings) {
			console.error(stats.compilation.warnings)
		}
	}
}

function selectColor(color) {
	switch (color) {
		case 'red':
			return COLORS.RED
		case 'yellow':
			return COLORS.YELLOW
		case 'green':
			return COLORS.GREEN
		default:
			return COLORS.RESET
	}
}

function wrapInColor(color, string) {
	const c = selectColor(color)
	console.log(`\n${c}${string}${COLORS.RESET}`)
}

module.exports = {
	wrapInColor,
	handleErrors,
}
