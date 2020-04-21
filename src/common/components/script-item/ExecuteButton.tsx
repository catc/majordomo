import React, { useEffect, useState, useCallback } from 'react'
import { runScript } from '@common/utils/execute'
import { Script } from '@common/utils/scripts'
import PlayCircle from '@common/components/icons/PlayCircle'
import CheckCircle from '@common/components/icons/CheckCircle'

interface Props {
	script: Script
}

export default function ExecuteButton({ script }: Props) {
	const [displaySuccess, setDisplaySuccess] = useState(false)

	const click = useCallback(() => {
		setDisplaySuccess(true)
		runScript(script)
	}, [script])

	useEffect(() => {
		if (displaySuccess) {
			const timer = setTimeout(() => {
				setDisplaySuccess(false)
			}, 1200)
			return () => clearTimeout(timer)
		}
	}, [displaySuccess])

	return (
		<button
			type="button"
			className="script-item__execute-btn"
			onClick={click}
			data-testid="execute"
		>
			<CheckCircle
				className={`script-item__execute-success ${
					displaySuccess ? 'active' : ''
				}`}
			/>
			<PlayCircle className="script-item__execute-run" />
		</button>
	)
}
