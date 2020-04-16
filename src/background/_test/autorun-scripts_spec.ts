import Autorun from '../autorun-scripts'
import { store, setup, SUPPORTED_EVENTS } from '@common/utils/scripts'
import { generateScript } from '@common/_test/mocks'

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
		await setup()

		const autorun = new Autorun()

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
		await setup()
		const autorun = new Autorun()

		const messageHandler =
			global.chrome.runtime.onMessage.addListener.mock.calls[0][0]

		// add listener to store when refresh scripts is triggered
		const scriptRefreshSpy = jest.spyOn(store, 'refresh')

		const toClean = addListenerMock.mock.calls.map(mockCall => ({
			eventType: mockCall[0],
			fn: mockCall[1],
		}))

		const autorunAddListenersSpy = jest.spyOn(autorun, 'addEventListeners')

		// trigger the refresh
		messageHandler({ type: 'REFRESH_SCRIPTS' })

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
