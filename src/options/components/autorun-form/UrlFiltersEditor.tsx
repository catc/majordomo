import React, { useEffect, useRef } from 'react'
import { editor } from 'monaco-editor/esm/vs/editor/editor.api'
import { useForm, useField } from 'react-final-form'
import { jsToCode, codeToJS } from './parseFilters'

import theme from '../../monaco-themes/devtools'
// @ts-ignore
editor.defineTheme('chrome-devtools', theme)

const PLACEHOLDER = `[
	// { urlContains: 'github' }
{ foo: 'this is foo'},
	{foo: 'this is better'}
]
`

/*
	TODO
	- make monaco reusable
*/

/*
	TODO
	- add disabled state
	- add validation
		- check before setting
	- format
	- sticker header + footer
*/

export default function UrlFiltersEditor() {
	const {
		meta: { initial },
	} = useField('filters', { subscription: { initial: true } })
	const { change } = useForm()
	const editorRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		if (editorRef.current) {
			// const initialValue = initial ? JSON.stringify(initial) : PLACEHOLDER
			const e = editor.create(editorRef.current, {
				// value: initial || PLACEHOLDER,
				// value: PLACEHOLDER,
				// value: initialValue,
				value: jsToCode(initial),
				language: 'javascript',
				theme: 'chrome-devtools',
				formatOnPaste: true,
				minimap: {
					enabled: false,
				},
			})
			e?.getModel()?.updateOptions({
				insertSpaces: false,
			})

			// poor mans 'onLoad'
			const didScrollChangeDisposable = e.onDidScrollChange(_ => {
				didScrollChangeDisposable.dispose()
				setTimeout(() => {
					e.getAction('editor.action.formatDocument').run()
				}, 150)
			})

			const getCode = () => codeToJS(e?.getModel()?.getValue())

			// set field initial (if it has nothing, set placeholder)
			change('filters', getCode())
			const blur = e.onDidBlurEditorText(() => {
				// const code = e?.getModel()?.getValue() || ''
				const code = getCode()
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
			<div
				ref={editorRef}
				style={{ height: 260, width: '100%', border: '1px solid red' }}
			></div>
		</div>
	)
}
