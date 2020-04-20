import React, { useMemo } from 'react'
import { formatDate } from '@common/utils/date'
import { Script } from '@common/utils/scripts'

import Zap from '@common/components/icons/Zap'
import Info from '@common/components/icons/Info'
import useToggle from '@common/hooks/useToggle'

interface Props {
	script: Script
	canToggleDescription: boolean
}

export default function LeftBar({ script, canToggleDescription }: Props) {
	const [displayDescription, toggleDescription] = useToggle(false)
	const date = useMemo(() => formatDate(script.lastModified), [script.lastModified])

	return (
		<>
			<span className="script-item__name">
				{script.autorun && <Zap />}
				{script.name}
			</span>
			<span className="script-item__date">
				{date}

				{canToggleDescription && script.description && (
					<button
						className="script-item__toggle-description"
						onClick={toggleDescription}
					>
						<Info />
					</button>
				)}
			</span>

			{displayDescription && (
				<div className="script-item__description">{script.description}</div>
			)}
		</>
	)
}
