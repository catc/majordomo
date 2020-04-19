import { Script, Store, setup, store, getOrder } from '@common/utils/scripts'

const scriptsMock = () => ({
	aa: {
		id: 'aa',
		name: 'this is a',
	},
	bb: {
		id: 'bb',
		name: 'this is b',
	},
})

async function mock(storage: any) {
	global.storage = storage
	const get = jest.spyOn(chrome.storage.sync, 'get')
	const set = jest.spyOn(chrome.storage.sync, 'set')
	const reactSubscribeHandler = jest.fn()

	const store = new Store()
	await store.ready

	// assume react subscribes to store
	store.subscribe(reactSubscribeHandler)

	return { get, set, store, reactSubscribeHandler }
}

describe('storage', () => {
	const sendMessageMock = jest.fn()
	global.chrome.runtime = { sendMessage: sendMessageMock }

	beforeEach(() => {
		jest.clearAllMocks()
	})

	it('correctly fetches scripts', async () => {
		const data = scriptsMock()
		const scriptOrder = ['aa', 'bb', 'cc'] // cc doesn't existed and is removed
		const { get, store } = await mock({ scripts: data, script_order: scriptOrder })

		expect(get).toBeCalledWith(['scripts', 'script_order'], expect.any(Function))
		expect(store.scripts).toMatchObject(data)
		expect(store.order).toEqual(['aa', 'bb'])
	})

	it('correctly saves a new script', async () => {
		const data = scriptsMock()
		const { set, store, reactSubscribeHandler } = await mock({ scripts: data })

		const script = { id: 'cc', name: 'this is c' } as Script
		await store.saveScript(script)

		const scriptsFin = {
			...data,
			[script.id]: script,
		}
		const orderFin = ['aa', 'bb', 'cc']

		expect(store.scripts).toMatchObject(scriptsFin)
		expect(store.order).toEqual(orderFin)
		expect(set).toHaveBeenCalledWith(
			expect.objectContaining({
				scripts: scriptsFin,
				script_order: orderFin,
			}),
			expect.any(Function),
		)

		// should notify react
		expect(reactSubscribeHandler).toHaveBeenCalledTimes(1)

		// shouldnt refresh scripts if not told to
		expect(sendMessageMock).not.toHaveBeenCalled()
	})

	it('correctly updates scripts', async () => {
		const data = scriptsMock()
		const { set, store, reactSubscribeHandler } = await mock({ scripts: data })

		const script = { id: 'aa', name: 'new value!' } as Script
		await store.saveScript(script)

		const scriptsFin = {
			bb: data.bb,
			aa: script,
		}
		const orderFin = ['aa', 'bb']

		expect(store.scripts).toMatchObject(scriptsFin)
		expect(store.order).toEqual(orderFin)
		expect(set).toHaveBeenCalledWith(
			expect.objectContaining({
				scripts: scriptsFin,
				script_order: orderFin,
			}),
			expect.any(Function),
		)

		// should notify react
		expect(reactSubscribeHandler).toHaveBeenCalledTimes(1)

		// shouldnt refresh scripts if not told to
		expect(sendMessageMock).not.toHaveBeenCalled()
	})

	it('correctly saves multiple new scripts', async () => {
		const data = scriptsMock()
		const { set, store } = await mock({ scripts: data })

		const scripts = [
			{ id: 'cc', name: 'this is c' } as Script,
			{ id: 'dd', name: 'this is d' } as Script,
		]
		await store.saveScripts(scripts)

		const scriptsFin = {
			...data,
			[scripts[0].id]: scripts[0],
			[scripts[1].id]: scripts[1],
		}
		const orderFin = ['aa', 'bb', 'cc', 'dd']

		expect(store.scripts).toMatchObject(scriptsFin)
		expect(store.order).toEqual(orderFin)
		expect(set).toHaveBeenCalledWith(
			expect.objectContaining({
				scripts: scriptsFin,
				script_order: orderFin,
			}),
			expect.any(Function),
		)
	})

	it('can trigger autorun-scripts message', async () => {
		const data = scriptsMock()
		const { store, reactSubscribeHandler } = await mock({ scripts: data })

		const script = { id: 'aa', name: 'new value!' } as Script
		await store.saveScript(script, true)

		// background script should be notified about changes
		expect(sendMessageMock).toHaveBeenCalledWith({ type: 'REFRESH_SCRIPTS' })

		// should notify react
		expect(reactSubscribeHandler).toHaveBeenCalledTimes(1)
	})
})

it('setup', async () => {
	expect(store).toBeUndefined()
	await setup()
	expect(store).not.toBeUndefined()
	expect(store).toBeInstanceOf(Store)
})

describe('getOrder', () => {
	it('correctly returns an array of script ids', () => {
		const scripts = {
			a: {} as Script,
			b: {} as Script,
			c: {} as Script,
		}
		const raworder = ['a', 'b', 'c']
		expect(getOrder(scripts, raworder)).toEqual(['a', 'b', 'c'])
	})
	it('correctly dedupes array ids', () => {
		const scripts = {
			a: {} as Script,
			b: {} as Script,
			c: {} as Script,
		}
		const raworder = ['a', 'b', 'c', 'a', 'a', 'c']
		expect(getOrder(scripts, raworder)).toEqual(['a', 'b', 'c'])
	})
	it('correctly adds any missing ids', () => {
		const scripts = {
			c: {} as Script,
			a: {} as Script,
			b: {} as Script,
		}
		const raworder = ['a', 'b']
		expect(getOrder(scripts, raworder)).toEqual(['a', 'b', 'c'])
	})
	it('correctly removes any non script ids', () => {
		const scripts = {
			a: {} as Script,
			b: {} as Script,
		}
		const raworder = ['a', 'b', 'c', 'a']
		expect(getOrder(scripts, raworder)).toEqual(['a', 'b'])
	})
	it('correctly adds any missing and dedupes ids', () => {
		const scripts = {
			a: {} as Script,
			b: {} as Script,
			c: {} as Script,
		}
		const raworder = ['a', 'b', 'a', 'bb', 'd', 'a']
		expect(getOrder(scripts, raworder)).toEqual(['a', 'b', 'c'])
	})
})
