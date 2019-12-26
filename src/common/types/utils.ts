/*
	example usage:

	const initialState = {
		foo: 'some val',
		error: null
	}

	type State = StateFromObject<typeof initialState, { error: null | string }>
*/
export type StateFromObject<Obj, Override = {}> = Omit<Obj, keyof Override> & Override

/*
	example usage:

	PartialBy<Script, 'id'>
*/
export type PartialBy<T, K extends keyof T> = Omit<T, K> & Partial<Pick<T, K>>
