export function remove(key: string | string[]) {
	return new Promise(res => {
		chrome.storage.sync.remove(key, res)
	})
}

export function save(data: { [key: string]: any }) {
	return new Promise(res => {
		chrome.storage.sync.set(data, res)
	})
}
