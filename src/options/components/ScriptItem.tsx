import React, { useMemo, useCallback, useState } from 'react'
import '../css/components/script-item.scss'
import { Script } from '@common/types/scripts'
import { formatDate } from '@common/utils/date'
import { SetStatusActionProps } from '@common/hooks/state'
import { STATUS } from '@common/types/state'
import { toggleFavourite } from '@common/utils/storage'

import AwardIcon from '@common/components/icons/Award'
import PlayCircle from '@common/components/icons/PlayCircle'
import ChevronDown from '@common/components/icons/ChevronDown'
import ChevronUp from '@common/components/icons/ChevronUp'

type Props = {
	script: Script
	setStatus: (p: SetStatusActionProps) => void
	canFav: boolean
	canToggleDescription: boolean
	canExecute: boolean
	canEditScript: boolean
}

export default function ScriptItem({
	script,
	setStatus,
	canFav,
	canEditScript,
	canExecute,
	canToggleDescription,
}: Props) {
	const [displayDescription, toggleDescription] = useState(false)
	const date = useMemo(() => formatDate(script.lastModified), [script.lastModified])

	const handleItemClick = useCallback(() => {
		canEditScript ? setStatus({ status: STATUS.EDIT, script: script }) : ''
	}, [canEditScript, script, setStatus])

	const executeScript = useCallback(() => {
		chrome.tabs.executeScript(null, { code: script.code }, () => {
			if (chrome.runtime.lastError) {
				window.alert(
					'Error executing script :: ' + chrome.runtime.lastError.message,
				)
				console.error(
					`Error :: ${chrome.runtime.lastError.message}`,
					chrome.runtime.lastError,
				)
			} else {
				console.log(`Done executing "${script.name}"`)
			}
		})
	}, [script.code, script.name])

	const favourite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		toggleFavourite(script)
	}

	const color = script.color !== '#ffffff' ? script.color : ''
	return (
		<li
			className={`script-item ${canEditScript ? 'editable' : ''}`}
			style={{ borderLeftColor: color }}
			onClick={handleItemClick}
		>
			<div className="script-item__left">
				<span className="script-item__name">
					{!canFav && script.fav && (
						<AwardIcon className="script-item__fav-badge" />
					)}
					{script.name}
				</span>
				<span className="script-item__date">
					{date}

					{canToggleDescription && script.description && (
						<button
							className="script-item__toggle-description"
							onClick={() => toggleDescription(!displayDescription)}
						>
							{displayDescription ? <ChevronUp /> : <ChevronDown />}
						</button>
					)}
				</span>

				{displayDescription && (
					<div className="script-item__description">{script.description}</div>
				)}
			</div>
			<div className="script-item__right">
				{canFav && (
					<button
						type="button"
						onClick={favourite}
						className={`no-outline script-item__fav ${
							script.fav ? 'selected' : ''
						}`}
					>
						<AwardIcon />
					</button>
				)}
				{canExecute && (
					<button
						type="button"
						className="script-item__execute-btn"
						onClick={executeScript}
					>
						<PlayCircle />
					</button>
				)}
			</div>
		</li>
	)
}
