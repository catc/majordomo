import { Script } from '@common/types/scripts'

/*
	TODO - error handling
*/

const SCRIPT_KEY = 'script_'
const SCRIPT_ID_REGEX = new RegExp('^' + SCRIPT_KEY)

type callback = () => void
const noop = () => {}

const set = (key: string, data: any, cb: callback = noop) => {
	chrome.storage.sync.set({ [key]: data }, cb)
}

export function isScript(key: string) {
	return SCRIPT_ID_REGEX.test(key)
}

export function createID() {
	return SCRIPT_KEY + Date.now()
}

export function saveScript(script: Script) {
	const id = createID()
	set(id, script)
}

export function removeScript(id: string) {
	chrome.storage.sync.remove(id)
}

export function getScripts() {
	// TODO - add sorting
	return new Promise<Script[]>((res) => {
		chrome.storage.sync.get(null, function(data) {
			const scripts: Script[] = Object.keys(data)
				.map((key: string) => (isScript(key) ? data[key] : null))
				.filter(Boolean)

			res(scripts)
		})
	})
}
