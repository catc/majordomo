import React from 'react'
import { DroppableProvided } from 'react-beautiful-dnd'
import { InViewRefBind } from '@common/hooks/inView'

interface Props {
	children: React.ReactNode
	provided?: DroppableProvided
	bindInView: InViewRefBind
}

export default function ScriptListWrapper({
	children,
	bindInView,
	provided = {} as DroppableProvided,
}: Props) {
	return (
		<ul
			className="script-list__list"
			ref={provided.innerRef}
			{...provided.droppableProps}
		>
			<li {...bindInView}></li>

			{children}
		</ul>
	)
}
