import { openOptionsPage, QUERY_TYPE } from '@common/utils/link'
import migrate from './migrate'
import { setup } from '@common/utils/scripts'
import AutoRun from './autorun-scripts'
import { dev_reloadOnPageRefresh } from './_dev/utils'

chrome.runtime.onInstalled.addListener(async ({ reason }) => {
	await setup()

	// migrate scripts
	if (reason === 'install' || reason === 'update') {
		await migrate()
	}

	if (reason === 'install') {
		openOptionsPage(QUERY_TYPE.intro)
	}

	// setup autorun scripts
	new AutoRun()

	// FOR DEV TESTING
	// dev_reloadOnPageRefresh
})
