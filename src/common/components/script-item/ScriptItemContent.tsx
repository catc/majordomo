import React, { useCallback } from 'react'
import { SetStatusActionProps } from '@common/hooks/state'
import { STATUS, Permissions } from '@common/types/state'
import { Script } from '@common/utils/scripts'

import ExecuteButton from './ExecuteButton'
import LeftBar from './LeftBar'

type Props = {
	script: Script
	setStatus: (p: SetStatusActionProps) => void
	permissions: Permissions
}

const isWhiteColor = (color: string) => color.slice(0, 4).toLowerCase() === '#fff'

export default function ScriptItemContent({ script, setStatus, permissions }: Props) {
	const { canToggleDescription, canExecute, canEditScript } = permissions

	const handleItemClick = useCallback(() => {
		canEditScript ? setStatus({ status: STATUS.EDIT, script: script }) : ''
	}, [canEditScript, script, setStatus])

	return (
		<div
			className={`script-item ${canEditScript ? 'editable' : ''}`}
			style={{ borderLeftColor: !isWhiteColor(script.color) ? script.color : '' }}
			onClick={handleItemClick}
			data-testid="script-content"
		>
			<div className="script-item__left">
				<LeftBar script={script} canToggleDescription={canToggleDescription} />
			</div>

			<div className="script-item__right">
				{canExecute && <ExecuteButton script={script} />}
			</div>
		</div>
	)
}
