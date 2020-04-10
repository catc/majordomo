import migrate_v1 from '../migrate'
import { createID } from '@common/utils/storage_v1'
import { setup, store, newScript } from '@common/utils/storage'

const v2Script1 = {
	id: 'aa',
	name: 'this is aa',
}
const v2Script2 = {
	id: 'aa',
	name: 'this is aa',
}

// aka chrome.storage.sync.get(null)
let storage: any = {
	scripts: {
		[v2Script1.id]: v2Script1,
		[v2Script2.id]: v2Script2,
	},
}

const oldScript1 = {
	id: createID() + '1',
	name: 'old script #1',
	description: 'an old script',
	code: 'console.log("ok")',
	color: 'red',
	lastModified: Date.now(),
}

const oldScript2 = {
	id: createID() + '2',
	name: 'old script #2',
	description: 'another old script',
	code: 'console.log("ok 2")',
	color: '#dbdbdb',
	lastModified: Date.now(),
}

// add scripts to storage
storage[oldScript1.id] = oldScript1
storage[oldScript2.id] = oldScript2

it('migrate_v1', async () => {
	jest.spyOn(chrome.storage.sync, 'get').mockImplementation((key: any, cb: any) => {
		if (!key) {
			return cb(storage)
		}
		return cb(storage[key])
	})

	jest.spyOn(chrome.storage.sync, 'set').mockImplementation((data: any, cb: any) => {
		storage = { ...storage, ...data }
		cb()
	})

	const remove = jest
		.spyOn(chrome.storage.sync, 'remove')
		.mockImplementation((keys: any, cb: any) => {
			if (Array.isArray(keys)) {
				keys.forEach(key => delete storage[key])
			} else {
				delete storage[keys]
			}
			cb()
		})

	// setup store and start migration
	await setup()
	const storeSaveMock = jest.spyOn(store!, 'saveScripts')
	await migrate_v1()

	// store save was called with correct scripts to add
	expect(storeSaveMock).toHaveBeenCalledWith([
		newScript(oldScript1),
		newScript(oldScript2),
	])

	// chrome storage api called remove with old keys
	expect(remove).toHaveBeenCalledWith(
		[oldScript1.id, oldScript2.id],
		expect.any(Function),
	)

	// shouldnt contain old scripts
	expect(storage).not.toHaveProperty(oldScript1.id)
	expect(storage).not.toHaveProperty(oldScript2.id)

	// new scripts object should contain old + new script keys
	const expectedKeys = [v2Script1.id, v2Script2.id, oldScript1.id, oldScript2.id]
	expectedKeys.forEach(key => {
		expect(storage.scripts).toHaveProperty(key)
	})

	// contains old and new scripts
	expect(storage.scripts[oldScript1.id]).toMatchObject(newScript(oldScript1))
	expect(storage.scripts[oldScript2.id]).toMatchObject(newScript(oldScript2))
	expect(storage.scripts[v2Script1.id]).toMatchObject(v2Script1)
	expect(storage.scripts[v2Script2.id]).toMatchObject(v2Script2)
})
