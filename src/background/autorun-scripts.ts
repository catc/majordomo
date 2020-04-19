import { Store, EventType } from '@common/utils/scripts'
import map from 'lodash/map'
import pickBy from 'lodash/pickBy'
import flatten from 'lodash/flatten'
import { log } from './log'

type DisposeType = { fn: () => any; eventType: EventType }

export type MESSAGE_TYPES = { type: 'REFRESH_SCRIPTS' }

export default class AutoRun {
	private _toClean: DisposeType[] = []
	private store: Store

	constructor(store: Store) {
		this.store = store

		this.addEventListeners()
		this._subscribeToUpdates()
	}

	private addEventListeners() {
		const store = this.store

		// get all scripts with autorun enabled
		const scripts = map(store.scripts).filter(s => s.autorun)

		// add listeners
		const cleanFunctionArrays = scripts
			.map(script => {
				if (script.on != null) {
					if (!Array.isArray(script.filters)) {
						log(`Script "${script.name}" does not have valid filters`)
						return null
					}
					const filters = {
						url: script.filters,
					}

					const events = Object.keys(pickBy(script.on, val => val))

					// for each event, add a listener and return event name and function
					const cleanupFunctions = events.map((e: string) => {
						const eventType = e as EventType
						const fn = (
							e: chrome.webNavigation.WebNavigationFramedCallbackDetails,
						) => {
							if (e.frameId === 0) {
								chrome.tabs.executeScript({
									code: script.code,
								})
							}
						}

						chrome.webNavigation[eventType].addListener(fn as any, filters)
						return { fn, eventType }
					})

					return cleanupFunctions
				}
				return null
			})
			.filter((x): x is DisposeType[] => x != null)

		this._toClean = flatten(cleanFunctionArrays)

		const len = this._toClean.length
		log(`🤵 Added ${len} listener${len === 1 ? '' : 's'}`, 'green_bold')
	}

	private _cleanup() {
		this._toClean.forEach(({ eventType, fn }) => {
			chrome.webNavigation[eventType].removeListener(fn)
		})
		this._toClean = []
	}

	async _refresh() {
		// remove old event listeners
		this._cleanup()

		/*
			force store to update scripts, this is required
			since background has it's own store
		*/
		await this.store.refresh()

		// add event listeners
		this.addEventListeners()
	}

	private _subscribeToUpdates() {
		chrome.runtime.onMessage.addListener((msg: MESSAGE_TYPES) => {
			if (msg.type === 'REFRESH_SCRIPTS') {
				this._refresh()
			} else {
				console.error('unhandled message ::', msg)
			}
		})
	}
}
