import { Script } from '@common/types/scripts'
import keyBy from 'lodash/keyBy'

/*
	TODO - error handling
*/

type ScriptsMap = { [id: string]: Script }

const SCRIPTS_KEY = 'scripts'

export let store: NonNullable<Store>

export class Store {
	ready: Promise<void>
	scripts: ScriptsMap = {}

	constructor() {
		this.ready = this._fetchScripts().then(scripts => {
			this.scripts = scripts
		})
	}

	_fetchScripts() {
		return new Promise<ScriptsMap>(res => {
			chrome.storage.sync.get(SCRIPTS_KEY, (data = {}) => {
				res(data as ScriptsMap)
			})
		})
	}

	async saveScript(script: Script) {
		this.scripts[script.id] = script
		await this._save()
	}

	async saveScripts(scripts: Script[]) {
		const obj = keyBy(scripts, 'id')
		this.scripts = { ...this.scripts, ...obj }
		await this._save()
	}

	async _save() {
		await save(SCRIPTS_KEY, this.scripts)
	}

	refresh() {
		return this._fetchScripts().then(scripts => {
			this.scripts = scripts
		})
	}
}

export async function setup() {
	store = new Store()
	await store.ready
}

const defaults = {
	name: '',
	color: '#fff',
	code: '',
	description: '',
	filters: {},
	on: {},
	order: 999,
}

export function newScript(data: Partial<Script>): Script {
	return {
		...defaults,
		lastModified: Date.now(),
		id: String(Date.now()),
		...data,
	}
}

export function remove(key: string | string[]) {
	return new Promise(res => {
		chrome.storage.sync.remove(key, res)
	})
}

export function save(key: string, data: any) {
	return new Promise(res => {
		chrome.storage.sync.set({ [key]: data }, res)
	})
}
