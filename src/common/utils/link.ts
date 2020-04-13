export enum QUERY_TYPE {
	new = 'new',
	intro = 'intro',
	edit = 'edit',
}

const STATUS_KEY = 'status'
const EDIT_KEY = 'edit'

export function openOptionsPage(type?: QUERY_TYPE, id?: string) {
	let url = ''
	switch (type) {
		case QUERY_TYPE.new:
			url = chrome.extension.getURL(`options.html?${STATUS_KEY}=${QUERY_TYPE.new}`)
			break
		case QUERY_TYPE.intro:
			url = chrome.extension.getURL(
				`options.html?${STATUS_KEY}=${QUERY_TYPE.intro}`,
			)
			break
		// currently unused
		case QUERY_TYPE.edit:
			url = chrome.extension.getURL(`options.html?${EDIT_KEY}=${id}`)
			break
		default:
			return chrome.runtime.openOptionsPage()
	}
	chrome.tabs.create({ url })
	return
}

export function parseOptionsPageParams(): { type: QUERY_TYPE; id?: string } | null {
	const params = new URLSearchParams(window.location.search)

	if (params.has(STATUS_KEY)) {
		const status = params.get(STATUS_KEY)
		return { type: status === QUERY_TYPE.new ? QUERY_TYPE.new : QUERY_TYPE.intro }
	} else if (params.has(EDIT_KEY)) {
		return { type: QUERY_TYPE.edit, id: params.get(EDIT_KEY)! }
	}

	return null
}
