import { useReducer, useCallback } from 'react'
import { StateFromObject } from '@common/types/utils'
import { Script } from '@common/types/scripts'

export enum STATUS {
	NONE = 'none',
	NEW = 'new',
	EDIT = 'edit',
}

export const initialState = {
	editorStatus: STATUS.NONE,
	currentScript: null,
	// editorStatus: STATUS.NEW, // FOR TESTING
}

export type State = StateFromObject<
	typeof initialState,
	{
		currentScript: null | Script
	}
>
type ActionType<A, T> = A extends { type: T } ? Omit<A, 'type'> : never

type Action =
	| { type: 'SET_STATUS'; status: STATUS.NONE | STATUS.NEW }
	| { type: 'SET_STATUS'; status: STATUS.EDIT | STATUS.EDIT; script: Script }

function stateReducer(state: State, action: Action) {
	switch (action.type) {
		case 'SET_STATUS':
			return {
				...state,
				editorStatus: action.status,
				currentScript: action.status === STATUS.EDIT ? action.script : null,
			}
		default:
			throw new Error('unsupported action')
	}
}

export type SetStatusActionProps = ActionType<Action, 'SET_STATUS'>

export default function useAppState() {
	const [state, dispatch] = useReducer(stateReducer, initialState)
	const { editorStatus, currentScript } = state

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
		currentScript,
	}
}
