import { useEffect, useState } from 'react'
import { getScripts } from '@common/utils/storage'
import { Script } from '@common/types/scripts'

export default function useScripts() {
	const [isFetching, setIsFetching] = useState(true)
	const [scripts, setScripts] = useState<Script[]>([])

	async function fetch() {
		const scripts = await getScripts()

		setScripts([]) // FOR TESTING
		// setScripts(scripts)

		setIsFetching(false)
	}

	useEffect(() => {
		fetch()
	}, [])

	return {
		scripts,
		isFetching,
	}
}
