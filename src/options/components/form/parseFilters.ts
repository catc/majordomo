const PLACEHOLDER = `[
	// { urlContains: 'github' }
]
`

type Validator = (key: string, val: any) => null | string

const stringValidator: Validator = (key, val) =>
	typeof val === 'string' ? null : `"${key}" must be a string`

const stringsArrayValidator: Validator = (key, val) =>
	Array.isArray(val) && val.every(scheme => typeof scheme === 'string')
		? null
		: `"${key}" must be an array of strings`

const portsValidator: Validator = (_, val) => {
	const msg = '"ports" must be an array of numbers, or array of array of numbers'
	if (!Array.isArray(val)) {
		return msg
	}
	const isValid = val.every(port => {
		if (Array.isArray(port)) {
			return port.every(rangeItem => typeof rangeItem === 'number')
		}
		return typeof port === 'number'
	})

	if (!isValid) {
		return msg
	}

	return null
}

const schema: { [key: string]: Validator } = {
	urlMatches: stringValidator,
	pathContains: stringValidator,
	hostSuffix: stringValidator,
	hostPrefix: stringValidator,
	hostContains: stringValidator,
	urlContains: stringValidator,
	querySuffix: stringValidator,
	urlPrefix: stringValidator,
	hostEquals: stringValidator,
	urlEquals: stringValidator,
	queryContains: stringValidator,
	pathPrefix: stringValidator,
	pathEquals: stringValidator,
	pathSuffix: stringValidator,
	queryEquals: stringValidator,
	queryPrefix: stringValidator,
	urlSuffix: stringValidator,
	originAndPathMatches: stringValidator,
	schemes: stringsArrayValidator,
	ports: portsValidator,
}

export function jsToCode(filters: object[] | null): string {
	if (!filters || !filters.length) {
		return PLACEHOLDER
	}
	return JSON.stringify(filters, null, 4).replace(/"(\w+)"\s*:/g, '$1:')
}

export function codeToJS(code = '') {
	// eslint-disable-next-line
	return eval(code)
}

export function validate(data: any): string | null {
	if (!Array.isArray(data)) {
		return 'URL filters should be an array'
	}

	// check each filter item
	for (const filterItem of data as any[]) {
		const keys = Object.keys(filterItem)

		if (!keys.length) {
			return `object can not be empty`
		}

		// check keys in each object
		for (const key of keys) {
			const validate = schema[key]
			if (!validate) {
				return `"${key}" is not a valid key`
			}
			const err = validate(key, filterItem[key])
			if (err) {
				return err
			}
		}
	}

	return null
}
