import React, { createContext, useContext, useEffect, useState } from 'react'

import useAppState from '@common/hooks/state'
import { STATUS, Permissions } from '@common/types/state'
import { setup } from '@common/utils/scripts'

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

	// only start app after store has loaded
	const [hasLoaded, setHasLoaded] = useState(false)
	useEffect(() => {
		const init = async () => {
			await setup()
			setHasLoaded(true)
		}
		init()
	}, [])

	if (!hasLoaded) {
		return null
	}

	return <AppStateContext.Provider value={state}>{children}</AppStateContext.Provider>
}

export default function useStateContext() {
	return useContext(AppStateContext)
}
