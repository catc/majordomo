import React, { createContext, useContext } from 'react'

import useAppState from '@common/hooks/state'
import { STATUS, Permissions } from '@common/types/state'

type State = ReturnType<typeof useAppState>

const AppStateContext = createContext<State>({
	editorStatus: STATUS.NONE,
	setStatus: () => {},
	currentScript: null,
	permissions: {} as Permissions,
})

type Props = {
	children: React.ReactNode
	permissions: Permissions
}

export function Provider({ children, permissions }: Props) {
	const state = useAppState(permissions)

	return <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
}

export default function useStateContext() {
	return useContext(AppStateContext)
}
