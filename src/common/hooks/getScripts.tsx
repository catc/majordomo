import { useEffect, useState, useCallback } from 'react'
import { Script } from '@common/types/scripts'
import { getScripts, isScript } from '@common/utils/storage'

export default function useScripts() {
	const [isInitialFetching, setIsInitialFetching] = useState(true)
	const [scripts, setScripts] = useState<Script[]>([])

	const fetch = useCallback(async () => {
		const scripts = await getScripts()
		setScripts(scripts)
		// setScripts([]) // FOR TESTING

		setIsInitialFetching(false)
	}, [])

	useEffect(() => {
		type Changes = { [key: string]: chrome.storage.StorageChange }
		const handleChanges = (changes: Changes) => {
			/*
				TODO
				- if old value is undefined then refetch
				- else update individual item?
			*/
			console.log('changes are', changes) // FOR TESTING
			const scriptsHaveUpdated = !!Object.keys(changes).find((key) => isScript(key))
			if (scriptsHaveUpdated) {
				fetch()
			}
		}
		chrome.storage.onChanged.addListener(handleChanges)

		return () => {
			chrome.storage.onChanged.removeListener(handleChanges)
		}
	}, [fetch])

	useEffect(() => {
		fetch()
	}, [fetch])

	return {
		scripts,
		isInitialFetching,
	}
}
