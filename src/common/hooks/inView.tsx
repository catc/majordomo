import { useState, useRef, useCallback } from 'react'

// TODO - fix me to use generic HTMLElement
export type InViewRefBind = { ref: (node: any) => void }

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

	// https://medium.com/@teh_builder/ref-objects-inside-useeffect-hooks-eb7c15198780
	const setRef = useCallback(
		node => {
			if (ref.current) {
				// remove old listener
				observer.disconnect()
			}

			if (node) {
				observer.observe(node)
			}

			ref.current = node
		},
		[observer],
	)

	return [isInView, { ref: setRef } as InViewRefBind]
}
