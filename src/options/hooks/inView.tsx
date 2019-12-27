import { useState, useRef, useEffect } from 'react'

export default function useInView(
	initialVal = false,
	opts: IntersectionObserverInit = {},
) {
	const [isInView, setIsInView] = useState(initialVal)

	const ref = useRef<any>(null)

	const { current: observer } = useRef(
		new window.IntersectionObserver(([entry]) => {
			setIsInView(entry.isIntersecting)
		}, opts),
	)

	useEffect(() => {
		if (ref && ref.current) {
			observer.observe(ref.current)
		}
		return () => observer.disconnect()
	}, [observer])

	return [isInView, { ref } as any]
}
