import { save } from './storage'
import keyBy from 'lodash/keyBy'
import { MESSAGE_TYPES } from '@background/autorun-scripts'
import { UrlFilter } from '@common/types/url-filters'
import uniq from 'lodash/uniq'

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

export type Script = {
	id: string
	lastModified: number
	name: string
	color: string
	code: string
	description: string
	autorun: boolean
	filters: UrlFilter[]
	on: {
		[key in EventType]?: boolean
	}
}

export type ScriptsMap = { [id: string]: Script }

type StoreSubscriber = () => void

const SCRIPTS_KEY = 'scripts'
export const SCRIPT_ORDER_KEY = 'script_order'

export let store: NonNullable<Store>

export function getOrder(scripts: ScriptsMap, raworder: string[] = []) {
	return uniq([...raworder, ...Object.keys(scripts)]).filter(id => scripts[id] != null)
}

export class Store {
	ready: Promise<void>
	scripts: ScriptsMap = {}
	order: string[] = []
	private _subs: Set<StoreSubscriber> = new Set()

	constructor() {
		this.ready = this._fetchScripts(true)
	}

	private _fetchScripts(fetchOrder = false) {
		return new Promise<void>(res => {
			const keys = [SCRIPTS_KEY]
			if (fetchOrder) keys.push(SCRIPT_ORDER_KEY)

			chrome.storage.sync.get(keys, (data = {}) => {
				const scripts: ScriptsMap = data[SCRIPTS_KEY] || {}
				this.scripts = scripts
				if (fetchOrder) {
					this.order = getOrder(scripts, data[SCRIPT_ORDER_KEY])
				}
				res()
			})
		})
	}

	async saveScript(script: Script, shouldTriggerAutorunRefresh?: boolean) {
		if (!script.id) {
			throw new Error('script has no id ')
		}
		this.scripts[script.id] = script
		await this._save(shouldTriggerAutorunRefresh)
	}

	async updateOrder(start: number, end: number) {
		const o = this.order
		const [item] = o.splice(start, 1)
		o.splice(end, 0, item)
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
		const ind = this.order.findIndex(a => a === script.id)
		this.order.splice(ind, 1)
		await this._save()
	}

	subscribe(sub: StoreSubscriber) {
		this._subs.add(sub)
		return () => {
			this._subs.delete(sub)
		}
	}

	private async _save(alertBackgroundScript?: boolean) {
		// create new object/array (to trigger change in react after publishing)
		this.scripts = Object.assign({}, this.scripts)
		this.order = getOrder(this.scripts, this.order)

		// alert subscribers
		this._publishToReact()

		// save to chrome store
		await save({
			[SCRIPTS_KEY]: this.scripts,
			[SCRIPT_ORDER_KEY]: this.order,
		})

		// notify background process that scripts have changed
		if (alertBackgroundScript) {
			const msg: MESSAGE_TYPES = { type: 'REFRESH_SCRIPTS' }
			chrome.runtime.sendMessage(msg)
		}
	}

	// publishes event to all react subscribers that scripts have updated
	private _publishToReact() {
		this._subs.forEach(sub => sub())
	}

	refresh() {
		return this._fetchScripts()
	}
}

const isTestEnv = process.env.NODE_ENV === 'test'

// should only be called once per app
export async function setup() {
	if (store != null && !isTestEnv) {
		throw new Error('Re-initializing state')
	}

	store = new Store()
	await store.ready
	return store
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
