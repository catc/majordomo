import { ScriptV1 } from '@common/types/scripts'
import orderBy from 'lodash/orderBy'

/*
	DEPRECATED - scripts v1
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

export function saveScript(script: ScriptV1) {
	set(script.id, script)
}

export function removeScript(id: string) {
	chrome.storage.sync.remove(id)
}

export function getScripts() {
	return new Promise<ScriptV1[]>(res => {
		chrome.storage.sync.get(null, function(data) {
			const scripts: ScriptV1[] = Object.keys(data)
				.map((key: string) => (isScript(key) ? data[key] : null))
				.filter(Boolean)

			const sorted = orderBy(scripts, ['fav', 'lastModified'], ['desc', 'desc'])

			res(sorted)
		})
	})
}

export function toggleFavourite(script: ScriptV1) {
	script.fav = !script.fav
	saveScript(script)
}
