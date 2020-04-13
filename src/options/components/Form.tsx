import React from 'react'

import TopBar from './top-bar/index'
import CodeEditor from './code-editor/index'
import FormActions from './form-actions/index'

interface Props {
	close: () => void
}

export default function Form({ close }: Props) {
	return (
		<>
			<TopBar close={close} />
			<CodeEditor />
			<FormActions />
		</>
	)
}
