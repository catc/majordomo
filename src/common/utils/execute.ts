import { ScriptV1 } from '@common/types/scripts'

export function runScript(script: ScriptV1) {
	chrome.tabs.executeScript(null, { code: script.code }, () => {
		if (chrome.runtime.lastError) {
			window.alert('Error executing script :: ' + chrome.runtime.lastError.message)
			console.error(
				`Error :: ${chrome.runtime.lastError.message}`,
				chrome.runtime.lastError,
			)
		} else {
			console.log(`Done executing "${script.name}"`)
		}
	})
}
