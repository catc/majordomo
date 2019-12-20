chrome.runtime.onInstalled.addListener(function() {
	console.log('started!', new Date())

	chrome.storage.sync.set({ someKey: 'some val' }, function() {
		console.log('done setting')
	})

	chrome.management.getSelf(({ installType }) => {
		if (installType === 'development') {
			reloadOnPageRefresh()
		}
	})
})

function reloadOnPageRefresh() {
	chrome.tabs.onUpdated.addListener((_, changeInfo = {}) => {
		console.log('created', new Date(), changeInfo)
		if (changeInfo.status && changeInfo.status === 'complete') {
			console.log('refresh', 1, new Date())
			chrome.runtime.reload()
		}
	})
}
