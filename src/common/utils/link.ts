type Props = string | 'new'

export function openOptionsPage(type?: Props) {
	if (type) {
		if (type === 'new') {
			const url = chrome.extension.getURL(`options.html?status=new`)
			window.open(url)
			return
		} else if (type) {
			const url = chrome.extension.getURL(`options.html?edit=${type}`)
			window.open(url)
			return
		}
	}
	chrome.runtime.openOptionsPage()
}
