import { Script } from './scripts'

export function runScript(script: Script) {
	chrome.tabs.executeScript(null, { code: script.code }, () => {
		if (chrome.runtime.lastError) {
			window.alert(`Error executing script:\n\n${chrome.runtime.lastError.message}`)
			console.error(
				`Error :: ${chrome.runtime.lastError.message}`,
				chrome.runtime.lastError,
			)
		} else {
			console.log(`Done executing "${script.name}"`)
		}
	})
}
