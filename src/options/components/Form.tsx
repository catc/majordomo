import React, { useEffect } from 'react'

import TopBar from './top-bar/index'
import CodeEditor from './code-editor/index'
import FormActions from './form-actions/index'
import { useFormState } from 'react-final-form'

interface Props {
	close: () => void
}

export default function Form({ close }: Props) {
	const { pristine } = useFormState({ subscription: { pristine: true } })

	useEffect(() => {
		if (!pristine) {
			const handler = (e: BeforeUnloadEvent) => {
				e.preventDefault()
				e.returnValue = ''
			}
			window.addEventListener('beforeunload', handler, false)
			return () => window.removeEventListener('beforeunload', handler, false)
		}
	}, [pristine])

	return (
		<>
			<TopBar close={close} />
			<CodeEditor />
			<FormActions />
		</>
	)
}
