import { openOptionsPage } from '@common/utils/link'

chrome.runtime.onInstalled.addListener(({ reason }) => {
	if (reason === 'install') {
		openOptionsPage('intro')
	}
})
