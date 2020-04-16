import { Script, Store, setup, store } from '@common/utils/scripts'

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
		const { get, store } = await mock({ scripts: data })

		expect(get).toBeCalledWith('scripts', expect.any(Function))
		expect(store.scripts).toMatchObject(data)
	})

	it('correctly saves a new script', async () => {
		const data = scriptsMock()
		const { set, store, reactSubscribeHandler } = await mock({ scripts: data })

		const script = { id: 'cc', name: 'this is c' } as Script
		await store.saveScript(script)

		const fin = {
			...data,
			[script.id]: script,
		}

		expect(store.scripts).toMatchObject(fin)
		expect(set).toHaveBeenCalledWith(
			expect.objectContaining({
				scripts: fin,
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

		const fin = {
			bb: data.bb,
			aa: script,
		}

		expect(store.scripts).toMatchObject(fin)
		expect(set).toHaveBeenCalledWith(
			expect.objectContaining({
				scripts: fin,
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

		const fin = {
			...data,
			[scripts[0].id]: scripts[0],
			[scripts[1].id]: scripts[1],
		}

		expect(store.scripts).toMatchObject(fin)
		expect(set).toHaveBeenCalledWith(
			expect.objectContaining({ scripts: fin }),
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
