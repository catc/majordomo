import React, { useEffect, useRef } from 'react'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import { useForm, useField } from 'react-final-form'

import theme from '../../monaco-themes/devtools'
// @ts-ignore
editor.defineTheme('chrome-devtools', theme)

const PLACEHOLDER = `// script content
const foo = 'this is foo';
console.log('this script will execute', foo);
`

export default function MonacoEditor() {
	const {
		meta: { initial },
	} = useField('code', { subscription: { initial: true } })
	const { change } = useForm()
	const editorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (editorRef.current) {
			const e = editor.create(editorRef.current, {
				value: initial || PLACEHOLDER,
				language: 'javascript',
				theme: 'chrome-devtools',
				minimap: {
					enabled: false,
				},
			})
			e?.getModel()?.updateOptions({
				insertSpaces: false,
			})

			// set field initial (if it has nothing, set placeholder)
			change('code', e?.getModel()?.getValue() || '')
			const blur = e.onDidBlurEditorText(() => {
				const code = e?.getModel()?.getValue() || ''
				change('code', code)
			})

			return () => {
				blur.dispose()
				e?.dispose()
			}
		}
	}, [change, editorRef, initial])

	return (
		<div className="monaco-editor-wrapper">
			<div ref={editorRef} style={{ height: '100%', width: '100%' }}></div>
		</div>
	)
}
