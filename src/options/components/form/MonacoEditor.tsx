import React, { useEffect, useRef, RefObject } from 'react'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'

import theme from '../../monaco-themes/devtools'
// @ts-ignore
editor.defineTheme('chrome-devtools', theme)

interface Props {
	initialValue?: string
	editorRef: RefObject<editor.IStandaloneCodeEditor>
}

export default function MonacoEditor({ editorRef, initialValue }: Props) {
	const ref = useRef<HTMLDivElement>(null)
	const didInit = useRef(false)

	useEffect(() => {
		if (ref.current) {
			didInit.current = true

			const e = editor.create(ref.current, {
				value: initialValue || '',
				language: 'javascript',
				theme: 'chrome-devtools',
				formatOnPaste: true,
				minimap: {
					enabled: false,
				},
			})

			// use tabs
			e?.getModel()?.updateOptions({
				insertSpaces: false,
			})

			editorRef.current = e

			return () => {
				e?.dispose()
			}
		}
	}, [ref, initialValue, editorRef])

	return <div ref={ref} style={{ height: '100%', width: '100%' }} />
}
