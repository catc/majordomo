import { save } from './storage'
import keyBy from 'lodash/keyBy'
import { MESSAGE_TYPES } from '@background/autorun-scripts'
import { UrlFilter } from '@common/types/url-filters'

/*
	TODO - error handling
*/

export const SUPPORTED_EVENTS = [
	// https://developer.chrome.com/extensions/webNavigation
	'onDOMContentLoaded',
	'onCompleted',
	'onBeforeNavigate',
	'onCommitted',
	'onErrorOccurred',
	'onCreatedNavigationTarget',
	'onReferenceFragmentUpdated',
	'onTabReplaced',
	'onHistoryStateUpdated',
] as const

type ElementType<T extends ReadonlyArray<unknown>> = T extends ReadonlyArray<
	infer ElementType
>
	? ElementType
	: never

export type EventType = keyof Pick<
	typeof chrome.webNavigation,
	ElementType<typeof SUPPORTED_EVENTS>
>

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
	filters: UrlFilter[]
	on: {
		[key in EventType]?: boolean
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
		this.ready = this._fetchScripts()
	}

	private _fetchScripts() {
		return new Promise<void>(res => {
			chrome.storage.sync.get(SCRIPTS_KEY, (data = {}) => {
				const scripts: ScriptsMap = data[SCRIPTS_KEY] || {}
				this.scripts = scripts
				res()
			})
		})
	}

	async saveScript(script: Script, shouldTriggerAutorunRefresh?: boolean) {
		if (!script.id) {
			throw new Error('script has no id ')
		}
		this.scripts[script.id] = script
		await this._save()

		if (shouldTriggerAutorunRefresh) {
			this._triggerAutorunRefresh()
		}
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

	private async _save() {
		// save to chrome store
		await save(SCRIPTS_KEY, this.scripts)

		// create new object (so can set state in react)
		this.scripts = Object.assign({}, this.scripts)

		// alert subscribers
		this._publish()
	}

	// alerts all store subscribers that the scripts have updated
	private _publish() {
		this._subs.forEach(sub => sub())
	}

	refresh() {
		return this._fetchScripts()
	}

	// send message to background to refresh autorun scripts
	private _triggerAutorunRefresh() {
		const msg: MESSAGE_TYPES = { type: 'REFRESH_SCRIPTS' }
		chrome.runtime.sendMessage(msg)
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
	filters: [],
	on: {},
	autorun: false,
	order: 999,
})

export const genID = () => `script_${Date.now()}`
