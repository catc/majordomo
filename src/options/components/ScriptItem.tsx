import React, { useMemo, useCallback } from 'react'
import { Script } from '@common/types/scripts'
import { formatDate } from '@common/utils/date'
import { SetStatusActionProps, STATUS } from '@options/hooks/state'

type Props = {
	script: Script
	index: number
	setStatus: (p: SetStatusActionProps) => void
}

export default function ScriptItem({ script, setStatus }: Props) {
	const date = useMemo(() => formatDate(script.lastModified), [script.lastModified])

	const edit = useCallback(() => setStatus({ status: STATUS.EDIT, script: script }), [
		script,
		setStatus,
	])

	const color = script.color !== '#ffffff' ? script.color : ''
	return (
		<li
			className="script-item"
			style={{
				borderLeftColor: color,
				//  animationDelay: BASE_DELAY * index + 's'
			}}
			onClick={edit}
		>
			<span className="script-item__name">{script.name}</span>
			<span className="script-item__date">{date}</span>
		</li>
	)
}
