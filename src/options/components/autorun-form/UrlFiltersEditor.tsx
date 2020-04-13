import React, { useEffect, useRef } from 'react'
import { useForm, useField } from 'react-final-form'
import { jsToCode, codeToJS } from '../form/parseFilters'
import { editor } from 'monaco-editor'
import MonacoEditor from '../form/MonacoEditor'

type Props = {
	autorunEnabled: boolean
}

export default function UrlFiltersEditor({ autorunEnabled }: Props) {
	const {
		meta: { initial },
	} = useField('filters', { subscription: { initial: true } })
	const { change } = useForm()

	const editorRef = useRef<editor.IStandaloneCodeEditor>(null)

	const { current: initialValue } = useRef(jsToCode(initial))

	useEffect(() => {
		if (editorRef.current) {
			const { current: e } = editorRef

			// poor mans 'onLoad'
			const didScrollChangeDisposable = e.onDidScrollChange(_ => {
				didScrollChangeDisposable.dispose()
				setTimeout(() => {
					e.getAction('editor.action.formatDocument').run()
				}, 250)
			})

			const getCode = () => codeToJS(e?.getModel()?.getValue())

			// set field initial (if it has nothing, set placeholder)
			change('filters', getCode())
			const blur = e.onDidBlurEditorText(() => {
				const code = getCode()
				change('filters', code)
			})

			return () => {
				blur.dispose()
			}
		}
	}, [change])

	useEffect(() => {
		if (editorRef.current) {
			editorRef.current.updateOptions({ readOnly: !autorunEnabled })
		}
	}, [autorunEnabled])

	return <MonacoEditor editorRef={editorRef} initialValue={initialValue} />
}
