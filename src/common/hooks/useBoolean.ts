import { useState, useCallback } from 'react'

export default function useBooleanState(initial: boolean) {
	const [value, setVal] = useState(initial)
	const setTrue = useCallback(() => {
		setVal(true)
	}, [])
	const setFalse = useCallback(() => {
		setVal(false)
	}, [])

	return {
		value,
		setTrue,
		setFalse,
	}
}
