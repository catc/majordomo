import { useState, useCallback } from 'react'

export default function useToggle(initial: boolean): [boolean, () => void] {
	const [value, setVal] = useState(initial)

	const toggle = useCallback(() => setVal(val => !val), [])

	return [value, toggle]
}
