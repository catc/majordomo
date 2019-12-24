import React, { createContext, useContext } from 'react'

import useAppState, {
	initialState as AppInitialState,
	SetStatusActionProps,
} from './state'

import { StateFromObject } from '@common/types/utils'

const initialState = {
	editorStatus: AppInitialState.editorStatus,
	setStatus: () => null,
}

type State = StateFromObject<
	typeof initialState,
	{
		setStatus: (p: SetStatusActionProps) => void
	}
>

const AppStateContext = createContext<State>(initialState)

export function Provider({ children }: { children: React.ReactNode }) {
	const { editorStatus, setStatus } = useAppState()

	const value = {
		editorStatus,
		setStatus,
	}
	return <AppStateContext.Provider value={value}>{children}</AppStateContext.Provider>
}

export default function useStateContext() {
	return useContext(AppStateContext)
}
