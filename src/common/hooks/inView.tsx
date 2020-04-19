import { useState, useRef, useEffect, RefObject } from 'react'

export type InViewRefBind = { ref: RefObject<any> }

export default function useInView(
	initialVal = false,
	opts: IntersectionObserverInit = {},
): [boolean, InViewRefBind] {
	const [isInView, setIsInView] = useState(initialVal)

	const ref = useRef<HTMLElement>()

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

	return [isInView, { ref } as InViewRefBind]
}
