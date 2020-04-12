import { save } from './storage'
import keyBy from 'lodash/keyBy'

/*
	TODO - error handling
*/

export enum EVENT_TYPES {
	// https://developer.chrome.com/extensions/webNavigation
	onDOMContentLoaded = 'onDOMContentLoaded',
	onCompleted = 'onCompleted',
	onBeforeNavigate = 'onBeforeNavigate',
	onCommitted = 'onCommitted',
	onErrorOccurred = 'onErrorOccurred',
	onCreatedNavigationTarget = 'onCreatedNavigationTarget',
	onReferenceFragmentUpdated = 'onReferenceFragmentUpdated',
	onTabReplaced = 'onTabReplaced',
	onHistoryStateUpdated = 'onHistoryStateUpdated',
}

export type ScriptV1 = {
	id: string
	lastModified: number
	name: string
	color: string
	code: string
	description: string
	fav: boolean
}

export type Script = {
	id: string
	lastModified: number
	name: string
	color: string
	code: string
	description: string
	order: number
	autorun: boolean
	filters: {
		/* TODO */
	}
	on: {
		[key in keyof typeof EVENT_TYPES]?: boolean
	}
}

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
		if (!script.id) {
			throw new Error('script has no id ')
		}
		this.scripts[script.id] = script
		await this._save()
	}

	async saveScripts(scripts: Script[]) {
		scripts.map(script => {
			if (!script) {
				throw new Error('script has no id ')
			}
		})
		const obj = keyBy(scripts, 'id')
		this.scripts = { ...this.scripts, ...obj }
		await this._save()
	}

	async remove(script: Script) {
		delete store.scripts[script.id]
		await this._save()
	}

	subscribe(sub: StoreSubscriber) {
		this._subs.add(sub)
		return () => {
			this._subs.delete(sub)
		}
	}

	async _save() {
		await save(SCRIPTS_KEY, this.scripts)

		// create new object (so can set state in react)
		this.scripts = Object.assign({}, this.scripts)

		this._publish()
	}

	_publish() {
		this._subs.forEach(sub => sub())
	}

	// currently unused
	refresh() {
		return this._fetchScripts().then(scripts => {
			this.scripts = scripts
		})
	}
}

// should only be called once per app
export async function setup() {
	if (store != null) {
		throw new Error('Re-initializing state')
	}

	store = new Store()
	await store.ready
}

export const getScriptDefaults = () => ({
	name: '',
	color: '#fff',
	code: '',
	description: '',
	filters: {},
	on: {},
	autorun: false,
	order: 999,
})

export const genID = () => `script_${Date.now()}`
