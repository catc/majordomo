global.chrome = {
	storage: {
		sync: {
			get: jest.fn((_, cb) => cb('global_setup')),
			set: jest.fn((_, cb) => cb && cb()),
			remove: jest.fn((_, cb) => cb && cb()),
		},
	},
}
