const PLACEHOLDER = `[
	// { urlContains: 'github' }
{ foo: 'this is foo'},
	{foo: 'this is better'}
]
`

export default function parseFilters(code: string) {
	return [
		// ...
	]
}

export function jsToCode(filters: [] | null): string {
	if (!filters || !filters.length) {
		return PLACEHOLDER
	}
	return JSON.stringify(filters, null, 4).replace(/"(\w+)"\s*:/g, '$1:')
}

export function codeToJS(code = '') {
	// eslint-disable-next-line
	return eval(code)
}

/*

chrome.storage.sync.get('scripts', s => {
    const ss = s.scripts

	const a = ss.script_1586330366185.filters
	console.log(a)
})

*/
