import { Store } from '@common/utils/storage'
import { Script } from '@common/types/scripts'

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

	const store = new Store()
	await store.ready
	return { get, set, store }
}

describe('storage', () => {
	it('correctly fetches scripts', async () => {
		const data = scriptsMock()
		const { get, store } = await mock({ scripts: data })

		expect(get).toBeCalledWith('scripts', expect.any(Function))
		expect(store.scripts).toMatchObject(data)
	})

	it('correctly saves a new script', async () => {
		const data = scriptsMock()
		const { set, store } = await mock({ scripts: data })

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
	})

	it('correctly updates scripts', async () => {
		const data = scriptsMock()
		const { set, store } = await mock({ scripts: data })

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
})
