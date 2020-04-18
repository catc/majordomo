import { jsToCode, codeToJS, validate } from '@options/components/form/parseFilters'

describe('jsToCode', () => {
	it('returns code string if filters are null', () => {
		const code = jsToCode(null)
		expect(typeof code).toEqual('string')
		expect(code.length > 0).toEqual(true)
	})
	it('returns code to string', () => {
		const js = [{ urlContains: 'github' }]
		const code = jsToCode(js)
		expect(code).toContain('github')
	})
})

describe('codeToJS', () => {
	it('converts stringified code to objects', () => {
		const original = [{ urlContains: 'github' }]
		const js = codeToJS(JSON.stringify(original))
		expect(js).toEqual(original)
	})

	it('handles comments', () => {
		const code = `[
			// this is a comment
			{ urlContains: 'github' }
		]
		`
		const js = codeToJS(code)
		expect(js).toEqual([{ urlContains: 'github' }])
	})
})

describe('validate', () => {
	it('catches incorrect string types', () => {
		const cases = [
			[{ urlMatches: ['git'] }],
			[{ urlMatches: 500 }],
			[{ urlMatches: 'git', urlContains: 500 }],
		]
		cases.forEach(c => {
			const err = validate(c)
			expect(err).toContain('a string')
		})
	})

	it('catches incorrect ports', () => {
		const cases = [
			[{ ports: ['5000'] }],
			[{ ports: [33, '5000'] }],
			[{ ports: [[200, '500']] }],
		]
		cases.forEach(c => {
			const err = validate(c)
			expect(err).toContain('"ports"')
		})
	})

	it('catches incorrect scheme types', () => {
		const cases = [
			[{ schemes: [123] }],
			[{ schemes: ['ab', '123', 33] }],
			[{ schemes: null }],
			[{ schemes: { a: 'aa' } }],
		]
		cases.forEach(c => {
			const err = validate(c)
			expect(err).toContain('"schemes"')
		})
	})

	it('catches other invalid errors', () => {
		const cases = [
			// ...
			[{}],
			[{}, {}],
			[{ foo: 'random key' }],
		]
		cases.forEach(c => {
			const err = validate(c)
			expect(err).toEqual(expect.any(String))
		})
	})

	it('returns null if object is valid', () => {
		const cases = [
			[{ urlContains: 'git' }],
			[{ urlContains: 'git' }, { urlContains: 'overflow' }],
			[{ urlContains: 'git', hostPrefix: 'something' }],
			[{ schemes: ['magnet'] }],
			[{ schemes: ['magnet', 'maps'] }],
			[{ ports: [14] }],
			[{ ports: [14, 15] }],
			[{ ports: [14, 15, [200, 300]] }],
			[{ ports: [14, 15, [200, 300], 90] }],
		]
		cases.forEach(c => {
			const err = validate(c)
			expect(err).toEqual(null)
		})
	})
})
