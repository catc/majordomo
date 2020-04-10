import { Script } from '@common/types/scripts'
import keyBy from 'lodash/keyBy'

/*
	TODO - error handling
*/

export type ScriptsMap = { [id: string]: Script }
type StoreSubscriber = () => void

const SCRIPTS_KEY = 'scripts'

export let store: NonNullable<Store>

export class Store {
	ready: Promise<void>
	scripts: ScriptsMap = {}
	private _subs: Set<StoreSubscriber> = new Set()

	constructor() {
		this.ready = this._fetchScripts().then(scripts => {
			this.scripts = scripts
		})
	}

	private _fetchScripts() {
		return new Promise<ScriptsMap>(res => {
			chrome.storage.sync.get(SCRIPTS_KEY, (data = {}) => {
				const scripts: ScriptsMap = data[SCRIPTS_KEY] || {}
				res(scripts)
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
		this._publish()
	}

	async remove(script: Script) {
		delete store.scripts[script.id]
		await this._save()
	}

	// currently unused
	refresh() {
		return this._fetchScripts().then(scripts => {
			this.scripts = scripts
		})
	}

	register(sub: StoreSubscriber) {
		this._subs.add(sub)
		return () => this._subs.delete(sub)
	}

	_publish() {
		this._subs.forEach(sub => sub())
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
