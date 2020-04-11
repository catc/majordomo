import { useEffect, useState, useCallback, useMemo } from 'react'
import { store, ScriptsMap } from '@common/utils/scripts'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'

/*
	react wrapper around store
*/

export default function useScripts() {
	const [isInitialFetching, setIsInitialFetching] = useState(true)
	const [scriptsMap, setScriptsMap] = useState<ScriptsMap>({})

	const fetch = useCallback(async () => {
		setScriptsMap(store.scripts)
	}, [setScriptsMap])

	// fetch scripts and subscribe to store
	useEffect(() => {
		fetch()
		setIsInitialFetching(false)

		// subscribe
		return store.subscribe(fetch)
	}, [fetch])

	const scripts = useMemo(() => orderBy(map(scriptsMap), 'order'), [scriptsMap])

	return {
		isInitialFetching,
		scripts,
	}
}
