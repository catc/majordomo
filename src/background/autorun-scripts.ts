import { store, EventType } from '@common/utils/scripts'
import map from 'lodash/map'
import pickBy from 'lodash/pickBy'
import flatten from 'lodash/flatten'

// TEMP FOR TESTING
const filters = {
	url: [{ urlContains: 'git' }],
}

/*
	TODO
	- add tests
	- add proper filter support
*/

type DisposeType = { fn: () => any; eventType: EventType }

export type MESSAGE_TYPES = { type: 'REFRESH_SCRIPTS' }

export default class AutoRun {
	// private queue = []
	// private _reloading = true
	private _toClean: DisposeType[] = []

	constructor() {
		this.addEventListeners()

		this._subscribeToUpdates()
	}

	private addEventListeners() {
		// get all scripts with autorun enabled
		const scripts = map(store.scripts).filter(s => s.autorun)

		// add listeners
		const cleanFunctionArrays = scripts
			.map(script => {
				if (script.on != null) {
					const events = Object.keys(pickBy(script.on, val => val))

					// TODO - add filters

					// for each event, add a listener and return event name and function
					const cleanupFunctions = events.map((e: string) => {
						const eventType = e as EventType
						const fn = () =>
							chrome.tabs.executeScript({
								code: script.code,
							})
						chrome.webNavigation[eventType].addListener(fn, filters)
						return { fn, eventType }
					})

					return cleanupFunctions
				}
				return null
			})
			.filter((x): x is DisposeType[] => x != null)

		this._toClean = flatten(cleanFunctionArrays)

		const len = this._toClean.length
		console.log(`Added ${len} listener${len === 1 ? '' : 's'}`)
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

		// force store to update scripts
		await store.refresh()

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
