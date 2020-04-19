import React, { useCallback } from 'react'
import {
	DragDropContext,
	Droppable,
	Draggable,
	DroppableProvided,
	DroppableStateSnapshot,
	DraggableStateSnapshot,
	DraggableProvided,
} from 'react-beautiful-dnd'
import { store } from '@common/utils/scripts'
import ScriptItemContent from '../script-item/ScriptItemContent'

import ScriptListWrapper from './ScriptListWrapper'
import { ScriptListProps } from './types'

export default function ScriptListWithDrag({
	scripts,
	bindInView,
	permissions,
	setStatus,
}: ScriptListProps) {
	const dragend = useCallback(({ source, destination }) => {
		store.updateOrder(source.index, destination.index)
	}, [])

	return (
		<DragDropContext onDragEnd={dragend}>
			<Droppable droppableId="droppable">
				{(provided: DroppableProvided, _: DroppableStateSnapshot) => (
					<ScriptListWrapper provided={provided} bindInView={bindInView}>
						{scripts.map((s, i) => (
							<Draggable key={s.id} draggableId={s.id} index={i}>
								{(
									provided: DraggableProvided,
									_: DraggableStateSnapshot,
								) => (
									<li
										className="script-item__wrapper"
										ref={provided.innerRef}
										{...provided.draggableProps}
										{...provided.dragHandleProps}
									>
										<ScriptItemContent
											script={s}
											setStatus={setStatus}
											permissions={permissions}
										/>
									</li>
								)}
							</Draggable>
						))}
						{provided.placeholder}
					</ScriptListWrapper>
				)}
			</Droppable>
		</DragDropContext>
	)
}
