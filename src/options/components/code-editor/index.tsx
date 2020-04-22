import React, { useEffect, useRef } from 'react'
import { useForm, useField } from 'react-final-form'
import MonacoEditor from '../form/MonacoEditor'
import { editor } from 'monaco-editor'

const PLACEHOLDER = `// script content
const foo = 'this is foo';
console.log('this script will execute', foo);
`

export default function ScriptCodeEditor() {
	const {
		meta: { initial },
	} = useField('code', { subscription: { initial: true } })
	const { change } = useForm()

	const editorRef = useRef<editor.IStandaloneCodeEditor>(null)
	const { current: initialValue } = useRef(initial || PLACEHOLDER)

	useEffect(() => {
		if (editorRef.current) {
			const { current: e } = editorRef

			// // set field initial (if it has nothing, set placeholder)
			change('code', e?.getModel()?.getValue() || '')
			const blur = e.onDidBlurEditorText(() => {
				const code = e?.getModel()?.getValue() || ''
				change('code', code)
			})

			return () => {
				blur.dispose()
			}
		}
	}, [change, editorRef, initial])

	return (
		<div className="monaco-editor-wrapper">
			<MonacoEditor editorRef={editorRef} initialValue={initialValue} />
		</div>
	)
}
