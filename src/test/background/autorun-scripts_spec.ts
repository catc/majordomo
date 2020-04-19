import Autorun from '@background/autorun-scripts'
import { SUPPORTED_EVENTS, Store } from '@common/utils/scripts'
import { generateScript } from '../mocks'

const script1 = generateScript(undefined, {
	autorun: true,
	on: { onDOMContentLoaded: true },
	filters: [{ urlMatches: 'foo' }],
})
const script2 = generateScript(undefined, {
	autorun: true,
	on: { onHistoryStateUpdated: true, onErrorOccurred: true },
	filters: [{ pathContains: 'hub', urlPrefix: 'git' }],
})
const script3 = generateScript(undefined, {
	autorun: false,
	on: { onTabReplaced: true },
})

global.storage.scripts = {
	[script1.id]: script1,
	[script2.id]: script2,
	[script3.id]: script3,
}

describe('autorun-scripts', () => {
	const addListenerMock = jest.fn()
	const removeListenerMock = jest.fn()
	global.chrome.webNavigation = {}
	SUPPORTED_EVENTS.forEach(event => {
		global.chrome.webNavigation[event] = {
			addListener: addListenerMock.bind(null, event),
			removeListener: removeListenerMock.bind(null, event),
		}
	})

	global.chrome.runtime = {
		onMessage: { addListener: jest.fn() },
	}

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('setups', async () => {
		const store = new Store()
		await store.ready
		const autorun = new Autorun(store)

		// first argument was is the bound event type
		expect(addListenerMock).toHaveBeenCalledWith(
			'onDOMContentLoaded',
			expect.any(Function),
			expect.objectContaining({ url: script1.filters }),
		)
		expect(addListenerMock).toHaveBeenCalledWith(
			'onHistoryStateUpdated',
			expect.any(Function),
			expect.objectContaining({ url: script2.filters }),
		)
		expect(addListenerMock).toHaveBeenCalledWith(
			'onErrorOccurred',
			expect.any(Function),
			expect.objectContaining({ url: script2.filters }),
		)
		expect(addListenerMock).not.toHaveBeenCalledWith(
			'onTabReplaced',
			expect.any(Function),
			expect.any(Object),
		)

		// clean functions are correct
		const toClean = addListenerMock.mock.calls.map(mockCall => ({
			eventType: mockCall[0],
			fn: mockCall[1],
		}))

		// @ts-ignore
		expect(autorun._toClean).toHaveLength(3)
		// @ts-ignore
		expect(autorun._toClean).toEqual(expect.objectContaining(toClean))

		// subscribes to script updates
		expect(global.chrome.runtime.onMessage.addListener).toHaveBeenCalled()
	})

	it('handles script updates correctly', async () => {
		const store = new Store()
		await store.ready
		const autorun = new Autorun(store)

		const messageHandler =
			global.chrome.runtime.onMessage.addListener.mock.calls[0][0]

		// add listener to store when refresh scripts is triggered
		const scriptRefreshSpy = jest.spyOn(store, 'refresh')
		const autorunAddListenersSpy = jest.spyOn(autorun, 'addEventListeners')

		// get all added listeners to verify they're cleaned later
		const toClean = addListenerMock.mock.calls.map(mockCall => ({
			eventType: mockCall[0],
			fn: mockCall[1],
		}))

		// trigger the refresh
		messageHandler({ type: 'REFRESH_SCRIPTS' })

		// ensure everything is cleaned
		toClean.forEach(({ fn, eventType }) => {
			expect(removeListenerMock).toHaveBeenCalledWith(eventType, fn)
		})

		// await for everything to resolve
		await new Promise(setImmediate)

		// store should have been called to refresh scripts
		expect(scriptRefreshSpy).toHaveBeenCalledTimes(1)

		// autorun should add new listeners
		expect(autorunAddListenersSpy).toHaveBeenCalledTimes(1)
	})
})
