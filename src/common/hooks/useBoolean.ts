import { useState, useCallback } from 'react'

type Prop = boolean | (() => boolean)

export default function useBooleanState(initial: Prop) {
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
