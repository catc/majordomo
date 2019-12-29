css = `
	.css-truncate.css-truncate-target {
		max-width: 100% !important;
	}
`

s = document.createElement('style');
s.type = 'text/css'
document.head.appendChild(s)

s.appendChild(document.createTextNode(css))
