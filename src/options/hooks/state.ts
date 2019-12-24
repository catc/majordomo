import { useReducer, useCallback } from 'react'
import { StateFromObject } from '@common/types/utils'

export enum STATUS {
	NONE = 'none',
	NEW = 'new',
	VIEW = 'view',
	EDIT = 'edit',
}

export const initialState = {
	editorStatus: STATUS.NONE,
	// editorStatus: STATUS.NEW, // FOR TESTING
	// error: null,
}

// export type State = StateFromObject<typeof initialState, { error: null | string }>
export type State = StateFromObject<typeof initialState>
type ActionType<A, T> = A extends { type: T } ? Omit<A, 'type'> : never

type Action =
	| { type: 'SET_STATUS'; status: STATUS.NONE | STATUS.NEW }
	| { type: 'SET_STATUS'; status: STATUS.VIEW | STATUS.EDIT; data: string }
// | { type: 'SET_ERROR'; error: string }

function stateReducer(state: State, action: Action) {
	switch (action.type) {
		case 'SET_STATUS':
			return { ...state, editorStatus: action.status }
		// case 'SET_ERROR':
		// 	return { ...state, error: 'kokk' }
		default:
			throw new Error('unsupported action')
	}
}

export type SetStatusActionProps = ActionType<Action, 'SET_STATUS'>

export default function useAppState() {
	const [state, dispatch] = useReducer(stateReducer, initialState)
	const { editorStatus } = state

	const setStatus = useCallback(
		(payload: SetStatusActionProps) => dispatch({ type: 'SET_STATUS', ...payload }),
		[],
	)

	// const setError = useCallback(
	// 	(payload: ActionType<Action, 'SET_ERROR'>) =>
	// 		dispatch({ type: 'SET_ERROR', ...payload }),
	// 	[],
	// )

	// const setStatusNew = useCallback(() => setStatus({ status: STATUS.NEW }), [setStatus])
	// setStatus({ status: STATUS.EDIT, data: 'zz', foo: 'afa' }) // should throw error
	// setStatus({ status: STATUS.NEW, data: 'zz' }) // should throw error
	// setStatus({ status: STATUS.EDIT }) // should throw error
	// setStatus({ status: STATUS.NEW }) // should be good
	// setStatus({ status: STATUS.EDIT, data: 'zz' }) // should be good

	// setError({ error: 123 }) // should throw error
	// setError({ error: 'something' }) // is correct

	return {
		editorStatus,
		setStatus,
	}
}
