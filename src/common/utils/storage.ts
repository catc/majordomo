export function remove(key: string | string[]) {
	return new Promise(res => {
		chrome.storage.sync.remove(key, res)
	})
}

export function save(key: string, data: any) {
	return new Promise(res => {
		chrome.storage.sync.set({ [key]: data }, res)
	})
}
