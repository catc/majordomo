raw = window.prompt('what height?')

height = parseInt(raw, 10)

if (isNaN(height)){
	height = 700
}

if (!isNaN(height)) {
	[...document.querySelectorAll('.CodeMirror')].forEach(el => {
		el.style.height = height + 'px'
	})
}
