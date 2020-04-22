import { Script } from '@common/utils/scripts'
import times from 'lodash/times'

const genID = () => `${Math.random()}.${Math.random()}`

export const generateScript = (
	id: string = genID(),
	overrides?: Partial<Script>,
): Script => {
	return {
		id: id,
		name: `script name: ${id}`,
		lastModified: Date.now(),
		color: '#fff',
		description: '',
		autorun: false,
		filters: [],
		code: '',
		on: {},
		...overrides,
	}
}

export const generateScripts = (len: number): any => times(len, () => generateScript())

export const setScriptsToStorage = (scripts: Script[]) => {
	if (!global.storage.scripts) {
		global.storage.scripts = {}
	}
	scripts.forEach(s => {
		// @ts-ignore
		global.storage.scripts[s.id] = s
	})
}
