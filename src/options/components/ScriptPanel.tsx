import React from 'react'
import useAppContext from '@options/hooks/context'
import { STATUS } from '@options/hooks/state'
import NewScript from './NewScript'

type Props = {
	// status: STATUS
}

/*
	Title
	Tag color
	Fav
	Description
	Id
	Code
*/

export default function ScriptPanel({}: Props) {
	const { editorStatus } = useAppContext()

	let component = null
	if (editorStatus === STATUS.NEW) {
		component = <NewScript />
	}

	return (
		<div className="script-editor">
			{/* status: {editorStatus} */}
			{component}
		</div>
	)
}
