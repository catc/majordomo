global.storage = {} as any

global.chrome = {
	storage: {
		sync: {
			get: jest.fn((key, cb) => {
				if (!key) {
					return cb(global.storage)
				}
				if (Array.isArray(key)) {
					const data: { [key: string]: any } = {}
					key.forEach(k => {
						data[k] = global.storage[k]
					})
					return cb(data)
				}
				return cb({ [key]: global.storage[key] })
			}),
			set: jest.fn((data, cb) => {
				global.storage = Object.assign(global.storage, data)
				cb()
			}),
			remove: jest.fn((keys, cb) => {
				if (Array.isArray(keys)) {
					keys.forEach(key => delete global.storage[key])
				} else {
					delete global.storage[keys]
				}
				cb()
			}),
		},
	},
}
