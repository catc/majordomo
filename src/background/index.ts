// TODO - on install open options page

chrome.runtime.onInstalled.addListener(function() {
	console.log('started!', new Date())

	chrome.management.getSelf(({ installType }) => {
		if (installType === 'development') {
			// dev_reloadOnPageRefresh()
		}
	})
	// dev_openOptions()
})

/*
	TODO
	- remove "tabs" permission from manifest
*/

// eslint-disable-next-line
function dev_openOptions(){
	chrome.runtime.openOptionsPage()
}

// eslint-disable-next-line
function dev_reloadOnPageRefresh() {
	chrome.tabs.onUpdated.addListener((tabID, changeInfo = {}) => {
		const pageLoaded = changeInfo.status && changeInfo.status === 'complete'
		// requires "tabs" permission
		chrome.tabs.get(tabID, (tab) => {
			if (!tab.url?.match('domo=true') && pageLoaded) {
				console.log('refreshing!')
				chrome.runtime.reload()
			}
		})
	})
}
