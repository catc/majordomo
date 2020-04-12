export function dev_openOptions() {
	chrome.runtime.openOptionsPage()
}

export function dev_reloadOnPageRefresh() {
	chrome.tabs.onUpdated.addListener((tabID, changeInfo = {}) => {
		const pageLoaded = changeInfo.status && changeInfo.status === 'complete'
		// requires "tabs" permission
		chrome.tabs.get(tabID, tab => {
			if (!tab.url?.match('domo=true') && pageLoaded) {
				console.log('refreshing!')
				chrome.runtime.reload()
			}
		})
	})
}
