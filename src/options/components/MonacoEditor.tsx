import React, { useEffect, useRef } from 'react'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'

import theme from '../themes/devtools'
// @ts-ignore
editor.defineTheme('devtools', theme)

const PLACEHOLDER = `// script content
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
			const e = editor.create(editorRef.current, {
				value: initialValue,
				language: 'javascript',
				theme: 'devtools',
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

	return <div ref={editorRef} style={{ height: '100%', width: '100%' }}></div>
}
