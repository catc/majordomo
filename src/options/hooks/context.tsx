import React, { createContext, useContext } from 'react'

import useAppState, { STATUS } from './state'

type State = ReturnType<typeof useAppState>

const AppStateContext = createContext<State>({
	editorStatus: STATUS.NONE,
	setStatus: () => {},
	currentScript: null,
})

export function Provider({ children }: { children: React.ReactNode }) {
	const state = useAppState()

	return <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
}

export default function useStateContext() {
	return useContext(AppStateContext)
}
