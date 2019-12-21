const SCRIPT_KEY = 'script_'
const SCRIPT_ID_REGEX = new RegExp('^' + SCRIPT_KEY)

type Script = {
	id: string
	name: string
	lastModified: number
	code: string
}

type callback = () => void
const noop = () => {}

const set = (key: string, data: any, cb: callback = noop) => {
	chrome.storage.sync.set({ [key]: data }, cb)
}

const get = (val) => {}

export function setScript(code: string) {
	const id = SCRIPT_KEY + Date.now()
	const script: Script = {
		id,
		name: 'some_temp_name ' + new Date(),
		lastModified: Date.now(),
		code,
	}
	set(id, script)
}

export function removeScript(id: string) {
	chrome.storage.sync.remove(id)
}

export function getScripts() {
	return new Promise<Script[]>((res) => {
		chrome.storage.sync.get(null, function(data) {
			console.log('all data is', data)

			const scripts: Script[] = Object.keys(data)
				.map((key: string) => {
					return SCRIPT_ID_REGEX.test(key) ? data[key] : null
				})
				.filter(Boolean)

			res(scripts)
		})
	})
}

// unused - can remove?
export function getScriptsByID(id: string) {
	// get
}
