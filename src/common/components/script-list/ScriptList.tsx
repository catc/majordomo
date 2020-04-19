import React from 'react'
import ScriptItemContent from '../script-item/ScriptItemContent'
import ScriptListWrapper from './ScriptListWrapper'
import { ScriptListProps } from './types'

export default function ScriptList({
	scripts,
	bindInView,
	permissions,
	setStatus,
}: ScriptListProps) {
	return (
		<ScriptListWrapper bindInView={bindInView}>
			{scripts.map(s => (
				<li key={s.id}>
					<ScriptItemContent
						script={s}
						setStatus={setStatus}
						permissions={permissions}
					/>
				</li>
			))}
		</ScriptListWrapper>
	)
}
