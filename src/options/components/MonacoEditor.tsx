import React, { useEffect, useRef } from 'react'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'

import theme from '../theme'
// @ts-ignore
editor.defineTheme('monokai', theme)

const PLACEHOLDER = `// add content
const foo = 'this is foo';
console.log('this script will execute', foo);
`

export type MonacoEditorType = null | editor.IStandaloneCodeEditor
type MonacoEditorRef = React.MutableRefObject<MonacoEditorType>

type Props = {
	initialValue?: string
	monacoRef: MonacoEditorRef
}

export default function MonacoEditor({ initialValue = PLACEHOLDER, monacoRef }: Props) {
	const editorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (editorRef.current) {
			const el = editorRef.current

			el.style.height =
				window.innerHeight - el.getBoundingClientRect().top - 80 + 'px'

			const e = editor.create(el, {
				value: initialValue,
				language: 'javascript',
				theme: 'monokai',
				minimap: {
					enabled: false,
				},
			})
			e?.getModel()?.updateOptions({
				insertSpaces: false,
			})

			monacoRef.current = e

			return () => e?.dispose()
		}
	}, [editorRef, initialValue, monacoRef])

	return <div ref={editorRef}></div>
}
