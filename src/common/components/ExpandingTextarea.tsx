import React, { useEffect, useRef, useCallback } from 'react'

type Props = {
	name: string
	register: any
}

function resize(el: HTMLTextAreaElement) {
	const offset = el.offsetHeight - el.clientHeight
	el.style.height = 'auto'
	el.style.height = el.scrollHeight + offset + 'px'
}

export default function ExpandingTextArea({ name, register }: Props) {
	const el = useRef<HTMLTextAreaElement | null>(null)

	const update = useCallback(() => {
		resize(el.current!)
	}, [])

	useEffect(() => {
		if (el.current) update()
	}, [update])

	return (
		<textarea
			rows={1}
			className="textarea"
			name={name}
			ref={(ref) => {
				register(ref)
				el.current = ref
			}}
			onInput={update}
		/>
	)
}
