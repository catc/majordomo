import React, { useMemo, useCallback } from 'react'
import { Script } from '@common/types/scripts'
import { formatDate } from '@common/utils/date'
import { SetStatusActionProps } from '@common/hooks/state'
import { STATUS } from '@common/types/state'
import AwardIcon from '@common/components/icons/Award'
import { toggleFavourite } from '@common/utils/storage'

type Props = {
	script: Script
	index: number
	setStatus: (p: SetStatusActionProps) => void
}

/*
	TODO
	- add 'execute' button
	- add 'toggle description' button
	- remove shadow on popup page
*/

export default function ScriptItem({ script, setStatus }: Props) {
	const date = useMemo(() => formatDate(script.lastModified), [script.lastModified])

	const edit = useCallback(() => setStatus({ status: STATUS.EDIT, script: script }), [
		script,
		setStatus,
	])

	const favourite = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.stopPropagation()
		toggleFavourite(script)
	}

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
			<div className="script-item__left">
				<span className="script-item__name">{script.name}</span>
				<span className="script-item__date">{date}</span>
			</div>
			<div className="script-item__right">
				<button
					type="button"
					onClick={favourite}
					className={`no-outline script-item__fav ${
						script.fav ? 'selected' : ''
					}`}
				>
					<AwardIcon />
				</button>
			</div>
		</li>
	)
}
