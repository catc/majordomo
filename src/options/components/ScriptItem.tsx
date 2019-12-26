import React, { useMemo } from 'react'
import { Script } from '@common/types/scripts'
import { formatDate } from '@common/utils/date'

type Props = {
	script: Script
	index: number
}

const BASE_DELAY = 0.02

/*
    DONE lastModified: number;
    DONE name: string;
    DONE color: string;
    code: string;
    TODO description: string;
    TODO fav: boolean;
*/

/*
	icons:

	plus
	delete
	edit
	star?

	close
*/

export default function ScriptItem({ script, index }: Props) {
	const date = useMemo(() => formatDate(script.lastModified), [script.lastModified])

	const color = script.color !== '#ffffff' ? script.color : ''
	return (
		<li
			className="script-item"
			style={{ borderLeftColor: color, animationDelay: BASE_DELAY * index + 's' }}
		>
			<span className="script-item__name">{script.name}</span>
			<span className="script-item__date">{date}</span>
		</li>
	)
}
