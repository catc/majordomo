import { useEffect, useState, useCallback } from 'react'
import { store, Script } from '@common/utils/scripts'

/*
	react wrapper around store
*/

export default function useScripts() {
	const [isInitialFetching, setIsInitialFetching] = useState(true)
	const [scripts, setScripts] = useState<Script[]>([])

	const fetch = useCallback(async () => {
		const map = store.scripts
		const s = store.order.map(id => map[id] || new Error(`script not found ${id}`))
		setScripts(s)
	}, [])

	// fetch scripts and subscribe to store
	useEffect(() => {
		fetch()
		setIsInitialFetching(false)

		// subscribe
		return store.subscribe(fetch)
	}, [fetch])

	return {
		isInitialFetching,
		scripts,
	}
}
