type Props = string | 'new' | 'intro'

export function openOptionsPage(type?: Props) {
	if (type) {
		let url = ''
		switch (type) {
			case 'intro':
				url = chrome.extension.getURL(`options.html?status=intro`)
				break
			case 'new':
				url = chrome.extension.getURL(`options.html?status=new`)
				break
			default:
				url = chrome.extension.getURL(`options.html?edit=${type}`)
		}
		chrome.tabs.create({ url })
		return
	}
	chrome.runtime.openOptionsPage()
}
