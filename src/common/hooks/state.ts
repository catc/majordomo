import { useReducer, useCallback } from 'react'
import { StateFromObject } from '@common/types/utils'
import { Script } from '@common/types/scripts'
import { STATUS, Permissions } from '@common/types/state'

export const initialState = {
	editorStatus: STATUS.NONE,
	currentScript: null,
	permissions: {} as Permissions,
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

export default function useAppState(perms: Permissions) {
	const [state, dispatch] = useReducer(stateReducer, null, () => ({
		...initialState,
		permissions: perms,
	}))
	const { editorStatus, currentScript, permissions } = state

	const setStatus = useCallback(
		(payload: SetStatusActionProps) => dispatch({ type: 'SET_STATUS', ...payload }),
		[],
	)

	return {
		editorStatus,
		setStatus,
		currentScript,
		permissions,
	}
}
