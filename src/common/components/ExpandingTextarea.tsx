import React, { useEffect, useRef, useCallback } from 'react'
import { FieldInputProps } from 'react-final-form'

type Props = FieldInputProps<string, HTMLElement>

function resize(el: HTMLTextAreaElement) {
	const offset = el.offsetHeight - el.clientHeight
	el.style.height = 'auto'
	el.style.height = el.scrollHeight + offset + 'px'
}

export default function ExpandingTextArea(props: Props) {
	const el = useRef<HTMLTextAreaElement | null>(null)

	const update = useCallback(() => {
		resize(el.current!)
	}, [])

	useEffect(() => {
		if (el.current) {
			update()
		}
	}, [update])

	return <textarea {...props} rows={1} className="textarea" ref={el} onInput={update} />
}
