import { useEffect, useState, useCallback, useMemo, useRef } from 'react'
import { setup, store, ScriptsMap } from '@common/utils/storage'
import map from 'lodash/map'
import orderBy from 'lodash/orderBy'

/*
	light wrapper around store
*/

export default function useScripts() {
	const [isInitialFetching, setIsInitialFetching] = useState(true)
	const [scriptsMap, setScriptsMap] = useState<ScriptsMap>({})

	const fetch = useCallback(async () => {
		await setup()
		setScriptsMap(store.scripts)
		setIsInitialFetching(false)
	}, [])

	useEffect(() => {
		// initial fetch
		fetch()

		// subscribe
		store.register(fetch)
	}, [fetch])

	const scripts = useMemo(() => orderBy(map(scriptsMap), 'order'), [scriptsMap])

	return {
		isInitialFetching,
		scripts,
	}
}
