import React from 'react'
import '../css/components/add-new-script-prompt.scss'

import PrimaryButton from './PrimaryButton'

type Props = {
	onClick: () => void
}

export default function AddNewScriptPrompt({ onClick }: Props) {
	return (
		<div className="add-new-script-prompt">
			You have no scripts
			<br />
			<PrimaryButton onClick={onClick}>Add new script</PrimaryButton>
		</div>
	)
}
